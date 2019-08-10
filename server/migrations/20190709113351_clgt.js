
exports.up = function(knex) {
    return knex.schema
<<<<<<< HEAD:server/migrations/20190703103558_create_table_syss.js
    .createTable('syss', function (table) {
        table.string('id', 36).unique().primary();
||||||| merged common ancestors:server/migrations/20190703103558_create_table_syss.js
    .createTable('syss', function (table) {
        table.increments('id').primary();
=======
    .createTable('clgt', function (table) {
        table.increments('id').primary();
>>>>>>> c74c23eb1e03bf5cdab86d2399f49183bbb2232c:server/migrations/20190709113351_clgt.js
        table.string('pagetitle', 255);
        table.string('footerpage', 255);
        table.string('logintitle', 255);
        table.string('backgroundcolor', 20);
     })
};

exports.down = function(knex) {
<<<<<<< HEAD:server/migrations/20190703103558_create_table_syss.js
  return knex.schema.dropTableIfExists('syss')
||||||| merged common ancestors:server/migrations/20190703103558_create_table_syss.js
  return knex.schema.dropTable('syss')
=======
  return knex.schema
  .dropTable("dcms")
>>>>>>> c74c23eb1e03bf5cdab86d2399f49183bbb2232c:server/migrations/20190709113351_clgt.js
};
