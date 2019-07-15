
exports.up = function(knex) {
    return knex.schema
    .createTable('menus', function (table) {
        table.string('id', 36).unique().primary();
        table.string('name', 500);
        table.string('path', 255).notNullable();
        table.string('id_parent_menu', 36);
        table.string('id_user_create', 36);
        table.timestamps();
     })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('menus')
};
