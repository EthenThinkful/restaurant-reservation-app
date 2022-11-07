const knex = require("../db/connection");

// KNEX QUERIES!

// *list function* display all tables ordered by table name.
async function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

// *create function* basic create function.
async function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((tables)=> tables[0]);
}

// *read function* retrieve table by id.
async function read(table_id) {
    return knex("tables")
        .select("*")
        .where({table_id: table_id})
        .first();
}

// checks to see if the reservation contains a "people count"
async function readReservation(reservation_id) {
    return knex("reservations")
        .select("people")
        .where({reservation_id: reservation_id})
        .first();
}

// updates the reservation_id contained within the table's data 
async function update(newTableData) {
    return knex("tables")
        .select("*")
        .where({table_id: newTableData.table_id})
        .update({
            reservation_id: newTableData.reservation_id,
        }, "*");
}

// updates status of a reservation (not a table) to "seated".
async function updateReservationStatus(newTableData) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: newTableData.reservation_id})
        .update({           
            status: "seated"
        }, "*");
}

// *destroy function* "destroy" as in setting a tables reservation id to null.
async function destroy(table_id) {
    return knex("tables")
    .select("*")
    .where({table_id: table_id})
    .update({
        reservation_id: null
    })
}

// works hand in hand with the destroy function to, updating the status to "finished".
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