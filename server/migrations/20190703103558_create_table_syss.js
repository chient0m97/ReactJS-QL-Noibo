
exports.up = function(knex) {
    return knex.schema
    .createTable('syss', function (table) {
        table.increments('id').primary();
        table.string('pagetitle', 255);
        table.string('footerpage', 255);
        table.string('logintitle', 255);
        table.string('backgroundcolor', 20);
     })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('syss')
};
