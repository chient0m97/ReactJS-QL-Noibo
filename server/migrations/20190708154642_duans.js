
exports.up = function(knex) {
  return knex.schema.createTable('duans', function(table){
      table.string('dm_duan_id', 36).unique().primary();
      table.string('dm_duan_ten', 50).notNullable();
      table.string('dm_duan_key', 10).notNullable();
      table.string('ns_id_qtda', 36).notNullable();

      table.foreign('ns_id_qtda').references('ns_id').inTable('nhansu')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('duans')
};
