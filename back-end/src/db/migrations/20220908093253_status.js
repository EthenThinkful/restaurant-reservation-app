

exports.up = function(knex, Promise) {
  return knex.schema.table('reservations', table => {
    table.string('status').notNullable().defaultTo('booked')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reservations', table => {
    table.dropColumn('status');
  })
};
