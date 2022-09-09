

exports.up = function(knex, Promise) {
  return knex.schema.table('reservations', table => {
    table.string('status').notNullable().defaultTo('Booked')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('reservations', table => {
    table.dropColumn('status');
  })
};
