
exports.up = function(knex) {
  return knex.schema.createTable('diabans', function(table){
      table.string('dm_db_id').unique().primary();
      table.string('dm_db_ten', 50).notNullable();
      table.string('dm_db_id_cha', 50);
      table.string('dm_db_cap', 50).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('diabans')
};
