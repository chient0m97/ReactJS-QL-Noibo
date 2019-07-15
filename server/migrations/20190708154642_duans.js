
exports.up = function(knex) {
  return knex.schema.createTable('duans', function(table){
      table.increments('dm_duan_id').primary();
      table.string('dm_duan_ten', 50).notNullable();
      table.string('dm_duan_key', 10).notNullable();
      table.integer('ns_id_qtda').notNullable();

      table.foreign('ns_id_qtda').references('ns_id').inTable('nhansu')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('duans')
};
