const reservations = require("./00-reservations.json");

// seeds our reservations table with data in the JSON

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() => knex("reservations").insert(reservations));
};
