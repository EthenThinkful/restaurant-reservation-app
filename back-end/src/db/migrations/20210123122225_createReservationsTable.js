// function to create the reservation table in the DB with specified columns

exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("mobile_number");
    table.date("reservation_date");
    table.string("reservation_time");
    table.integer("people");
    table.timestamps(true, true);
 });
}; 

// function to drop this table

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
