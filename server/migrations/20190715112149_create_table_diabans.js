
exports.up = function(knex) {
    return knex.schema
<<<<<<< HEAD:server/migrations/20190709113351_clgt.js
    .createTable('clgt', function (table) {
        table.increments('id').primary();
=======
    .createTable('diabans', function (table) {
        table.string('id', 36).unique().primary();
>>>>>>> origin/quyetfilter:server/migrations/20190715112149_create_table_diabans.js
        table.string('pagetitle', 255);
        table.string('footerpage', 255);
        table.string('logintitle', 255);
        table.string('backgroundcolor', 20);
     })
};

exports.down = function(knex) {
<<<<<<< HEAD:server/migrations/20190709113351_clgt.js
<<<<<<< HEAD:server/migrations/20190703103558_create_table_syss.js
  return knex.schema.dropTableIfExists('syss')
=======
  return knex.schema
  .dropTable("dcms")
>>>>>>> origin/TrungN:server/migrations/20190709113351_clgt.js
=======
  
>>>>>>> origin/quyetfilter:server/migrations/20190715112149_create_table_diabans.js
};
