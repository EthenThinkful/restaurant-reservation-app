const tables = require("./01-tables.json");

// seeds our tables table with data in the JSON

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(() => knex("tables").insert(tables));
};
