
exports.up = function(knex) {
    return knex.schema
    .createTable('diabans', function (table) {
        table.string('id', 36).unique().primary();
        table.string('pagetitle', 255);
        table.string('footerpage', 255);
        table.string('logintitle', 255);
        table.string('backgroundcolor', 20);
     })
};

exports.down = function(knex) {
  
};
