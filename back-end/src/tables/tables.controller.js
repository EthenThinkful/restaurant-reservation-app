const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json({ data: data });
}

async function create(req, res, next) {
  const table = req.body.data;
  const data = await service.create(table);
  res.status(201).json({ data });
}

// VALIDATION PIPELINE
const VALID_PROPERTIES = [
  "capacity",
  "table_name",
  "is_free",
  "created_at",
  "updated_at",
  "table_id",
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
    console.log(data);
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

const hasRequiredFields = hasAllFields("capacity", "table_name");

function capacityIsNumber(req, res, next) {
  const { data = {} } = req.body;
  if (typeof data["capacity"] != "number" || data["capacity"] < 1) {
    return next({
      status: 400,
      message: `"capacity" field must be a number `,
    });
  }
  next();
}

async function sufficientCapacity(req, res, next) {
  const { data = {} } = req.body;
  const tableId = req.params.table_id;
  const table = await service.read(tableId);

  const reservationId = data.reservation_id;
  const reservation = await reservationsService.read(reservationId);
  if (!reservation) {
    return next({
      status: 404,
      message: `${reservationId}`,
    });
  }

  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: "capacity",
    });
  }
  next();
}

function nameLengthValidator(req, res, next) {
  const { data } = req.body;
  if (data["table_name"].length < 2) {
    return next({
      status: 400,
      message: `table_name must be at least 2 characters`,
    });
  }
  next();
}

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: table.table_id,
  };
  const data = await service.update(updatedTable);
  res.json({ data: updatedTable });
}

async function updateValidation(req, res, next) {
  if (!req.body || !req.body.data || !req.body.data.reservation_id) {
    return next({
      status: 400,
      message: "reservation_id",
    });
  }
  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasOnlyValidProperties,
    hasRequiredFields,
    capacityIsNumber,
    nameLengthValidator,
    asyncErrorBoundary(create),
  ],
  update: [updateValidation, asyncErrorBoundary(sufficientCapacity), asyncErrorBoundary(update)],
};
