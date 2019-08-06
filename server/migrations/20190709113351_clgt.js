
exports.up = function(knex) {
    return knex.schema
    .createTable('clgt', function (table) {
        table.increments('id').primary();
        table.string('pagetitle', 255);
        table.string('footerpage', 255);
        table.string('logintitle', 255);
        table.string('backgroundcolor', 20);
     })
};

exports.down = function(knex) {
<<<<<<< HEAD:server/migrations/20190703103558_create_table_syss.js
  return knex.schema.dropTableIfExists('syss')
=======
  return knex.schema
  .dropTable("dcms")
>>>>>>> origin/TrungN:server/migrations/20190709113351_clgt.js
};
