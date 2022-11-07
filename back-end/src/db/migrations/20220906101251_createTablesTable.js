const { table } = require("../connection");

// creating a table to hold our restaurant's tables data

exports.up = function(knex) {
    return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.integer("capacity");
    table.string("table_name");
    table.integer("reservation_id").defaultTo(null);
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("CASCADE");
    table.timestamps(true, true);
})};

// function to drop this table

exports.down = function(knex) {
    return knex.schema.dropTable("tables");
};
