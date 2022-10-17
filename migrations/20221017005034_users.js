/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", table => {
    // table.increments("id").primary().unsigned();
    table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string("name").notNullable();
    table.string("password").notNullable();
    table.string("username").notNullable().unique();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
