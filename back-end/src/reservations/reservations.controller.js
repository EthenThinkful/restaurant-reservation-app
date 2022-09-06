/**
 * List handler for reservation resources
 */

 const service = require("./reservations.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 
 async function list(req, res) {
  const date = req.query.date
  const data = await service.list(date);
  res.json({ data: data });
}
 
 // VALIDATION PIPELINE
 const VALID_PROPERTIES = [
   "first_name",
   "last_name",
   "mobile_number",
   "reservation_date",
   "reservation_time",
   "people",
   "created_at",
   "updated_at",
   "status",
   "reservation_id",
 ];
 
 function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function hasAllFields(...fields) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      fields.forEach((field) => {
        if (!data[field]) {
          const error = new Error(`A '${field}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredFields = hasAllFields(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function dateValidator(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/)) {
    return next({
      status: 400,
      message: `invalid reservation_date`,
    });
  }
  next();
}

function timeValidator(req,res,next) {
  const { data = {} } = req.body;
  if (!data["reservation_time"].match(/[0-9]{2}:[0-9]{2}/)) {
    return next({
      status: 400,
      message: `invalid reservation_time `,
    });
  }
  next();
}

function peopleIsNumber(req, res, next) {
  const { data = {} } = req.body;
  if (typeof data["people"] != "number") {
    return next({
      status: 400,
      message: `"people" field must be a number `,
    });
  }
  next();
}

function notTuesday(req,res,next) {
  const { data = {} } = req.body;
const dateObject = new Date(data["reservation_date"])
  if (dateObject.getDay()=== 1) {
    next({
      status: 400,
      message: `Reservations cannot be made for Tuesday, as the restaurant is closed Tuesdays.`,
    });
}
 next();
}

// getDay returns a num 0-6 where 0 is Monday, 6 is Sunday
//validation check for 1 --> Tuesday


function timeIsAvailable(req,res,next) {
  const { data = {} } = req.body;
  let submittedTime =data["reservation_time"].replace(":", "");
  if (submittedTime<1030 || submittedTime>2130) {
    next({
      status: 400,
      message: "Reservation must be within business hours and at least an hour before close",
    });
  }
  next();
}

function notInThePast(req, res, next) {
  const { data = {} } = req.body;
if (Date.parse(data["reservation_date"]) < Date.now()) {
    next({
      status: 400,
      message: `Reservation must be in the future.`,
    });
}
next();
}
 
 /* validation currently checking if:
     - req has all required fields
     - req has all valid entries of fields
 */
 async function create(req, res, next) {
   const data = await service.create(req.body.data);
   res.status(201).json({ data });
 }
 
 module.exports = {
  list:[asyncErrorBoundary(list)],
  create: [
hasOnlyValidProperties,
hasRequiredFields,
    dateValidator,
    timeValidator,
    peopleIsNumber,
    notTuesday,
    notInThePast,
    timeIsAvailable,
    asyncErrorBoundary(create),
  ],
 };
