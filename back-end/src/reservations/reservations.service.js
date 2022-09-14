const knex = require("../db/connection");

async function list(date) {
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .whereNot({"status": "finished"})
        .orderBy("reservation_time");
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

async function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((reservations) => reservations[0])
}

async function read(reservation_id) {
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first()
}

async function update(newReservation) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: newReservation.reservation_id})
        .update({status: newReservation.status}, "*")
        .then((x) => x[0]);
}

async function editReservation(editableReservation) {
    return knex("reservations") 
    .select("*")
    .where({reservation_id: editableReservation.reservation_id})
    .update(editableReservation, "*")
    .then((x) => x[0]);
}

module.exports = {
    create,
    list,
    read,
    update,
    search,
    editReservation,
}