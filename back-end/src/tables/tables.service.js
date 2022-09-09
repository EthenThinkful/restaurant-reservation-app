const { table } = require("../db/connection");
const knex = require("../db/connection");
const reservationService = require("../reservations/reservations.service")

async function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

async function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((tables)=> tables[0]);
}

async function read(table_id) {
    return knex("tables")
        .select("*")
        .where({table_id: table_id})
        .first();
}

async function readReservation(reservation_id) {
    return knex("reservations")
        .select("people")
        .where({reservation_id: reservation_id})
        .first();
}

async function update(newTableData) {
    return knex("tables")
        .select("*")
        .where({table_id: newTableData.table_id})
        .update({
            reservation_id: newTableData.reservation_id,
            // status: "occupied"
        }, "*");
}

async function updateReservationStatus(newTableData) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: newTableData.reservation_id})
        .update({           
            status: "seated"
        }, "*");
}

async function destroy(table_id) {
    return knex("tables")
    .select("*")
    .where({table_id: table_id})
    .update({
        reservation_id: null
    })
}

async function finishedStatus(newReservation) {
    return knex("reservations")
    .select("*")
    .where({reservation_id: newReservation.reservation_id})
    .update({
        status: "finished"
    })
}

module.exports = {
    list, 
    create,
    read,
    readReservation,
    update,
    updateReservationStatus,
    finishedStatus,
    delete: destroy,
}