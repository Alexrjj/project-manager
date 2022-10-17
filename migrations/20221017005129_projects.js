/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("projects", table => {
    // table.increments("id").primary().unsigned();
    knex.raw("SET datestyle = dmy;\n");
    table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string("title").notNullable();
    table.bigint("zip_code").notNullable();
    table.string("cost").notNullable();
    table.boolean("done").notNullable().defaultTo(false);
    table.timestamp("deadline").notNullable();
    table
      .string("username")
      .references("username")
      .inTable("users")
      .onDelete("CASCADE");
    
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("projects");
  
};
