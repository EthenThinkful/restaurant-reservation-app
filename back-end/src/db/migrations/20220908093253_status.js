// adds a status column to our reservations table

exports.up = function(knex, Promise) {
  return knex.schema.table('reservations', table => {
    table.string('status').notNullable().defaultTo('Booked')
  })
};

// funciton to drop this column from the table

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('reservations', table => {
    table.dropColumn('status');
  })
};
