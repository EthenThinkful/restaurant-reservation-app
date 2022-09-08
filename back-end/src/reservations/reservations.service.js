const knex = require("../db/connection");

async function list(date) {
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .orderBy("reservation_time");
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
        .update(newReservation);
}

module.exports = {
    create,
    list,
    read,
    update,
}