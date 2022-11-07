/* Most of these functions rely on knex queries in "./reservations.service".
 asyncErrorBoundary() created for safe guarding all async functions, specifically within this controller file. */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 
/* ATTENTION: The "THEE" keyword (as shown at start of line 16) is used to indicate the major/main functions that are being exported */

/* Major/main export functions: 
1.) list,
2.) create,
3.) read, 
4.) update, 
5.) editReservation */

 // *THEE list function* display reservations based on mobile number or date.
 async function list(req, res) {
  if (req.query.mobile_number) {
    const data = await service.search(req.query.mobile_number);
    res.json({ data });
  } else {
    const data = await service.list(req.query.date);
    res.json({ data });
  }
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
 
// *MIDDLEWARE* makes sure reservation only contains valid properties (used with "create" and "editReservation" functions).
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

// *HELPER FUNCTION* Created to be used ONLY with "hasRequiredFields" (line 67)
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

// *MIDDLEWARE* Verifies required fields (used with "create" and "editReservation" functions). 
const hasRequiredFields = hasAllFields(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

// *MIDDLEWARE* Validates date (used with "create" and "editReservation" functions).
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

// *MIDDLEWARE* Checks to see if a reservation exists (used with "read", "update", and "editReservation" functions).
function reservationExists(req, res, next) {
  service.read(req.params.reservation_id)
  .then((reservation) => {
  if (reservation) {
   res.locals.reservation = reservation
   return next()
  }
  next({status: 404, message: `Reservation ID of ${req.params.reservation_id} cannot be found.`})
}).catch(next) 
}

// *THEE read function* Basic read function
function read(req, res) {
   const {reservation: data} = res.locals; // res.locals stored on line 94
   res.json({data})
}

// *MIDDLEWARE* timeValidator (used with "create" and "editReservation" functions).
function timeValidator(req,res,next) {
  const { data = {} } = req.body;
  if (!data["reservation_time"].match(/[0-9]{2}:[0-9]{2}/)) {
    return next({
      status: 400,
      message: `invalid reservation_time `,
    });e
  }
  next();
}

// *MIDDLEWARE* checks if people field is a number (used with "create" and "editReservation" functions).
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

// *MIDDLEWARE* when creating a reservation, makes sure reservation is not made on a Tuesday (used with "create" and "editReservation" functions).
function notTuesday(req,res,next) {
const { data = {} } = req.body;
const dateObject = new Date(data["reservation_date"])
  if (dateObject.getUTCDay() === 2) {
    next({
      status: 400,
      message: `Reservations cannot be made for Tuesday, as the restaurant is closed Tuesdays.`,
    });
}
 next();
}

// *MIDDLEWARE* used when creating a reservation, makes sure reservation is not made after hours (used with "create" function).
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

// *MIDDLEWARE* makes sure reservation is made at a future time (used with "create" function).
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
 
// *THEE create function* creates a new reservation.
 async function create(req, res, next) {
   const data = await service.create(req.body.data);
   res.status(201).json({ data });
 }

// *MIDDLEWARE* Makes sure status is set to "Free" (used with "create" function).
 function statusValidator(req, res, next) {
  const { data = {} } = req.body;
  if (data["status"] === "seated") {
    next ({
      status: 400,
      message: `seated`
    })
  } else if (data["status"] === "finished") {
    next ({
      status: 400,
      message: `finished`
    })
  }
  next();
 }

 // *MIDDLEWARE* Makes sure status is not "unknown" (used with "update" function).
 function unknownStatus(req, res, next) {
  const { data = {} } = req.body;
  if (data["status"] === "unknown") {
    return next ({
      status: 400,
      message: `unknown status`
    })
  } 
  next();
 }

 // *MIDDLEWARE* Cannot update a reservation is status is set to "finished" (used with "update" function).
 function isValueFinished(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    return next ({
      status: 400,
      message: `a finished reservation cannot be updated`
    })
  }
  next();
 }

 // *THEE update function* updates an existing reservation
 async function update(req, res, next) {
  const newReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(newReservation);
  res.status(200).json({ data: newReservation });
}

// *THEE editReservation function* edits an existing reservation
async function editReservation(req, res, next) {
  const editableReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.editReservation(editableReservation);
  res.json({data})
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
    statusValidator,
    asyncErrorBoundary(create),
  ],
  read:[reservationExists, asyncErrorBoundary(read)],
  update: [reservationExists, unknownStatus, isValueFinished, asyncErrorBoundary(update)],
  editReservation: [
    reservationExists,
    hasOnlyValidProperties,
    hasRequiredFields,
    notTuesday,
    dateValidator,
    timeValidator,
    peopleIsNumber,
    asyncErrorBoundary(editReservation)],
 };
