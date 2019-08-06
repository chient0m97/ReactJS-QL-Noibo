
exports.up = function (knex) {
    return knex.schema
        .createTable('dm_menus', function (table) {
            table.increments('dm_menu_id').primary();
            table.string('dm_menu_url', 100).unique().notNullable();
            table.string('dm_menu_name', 250).notNullable();
            table.integer('dm_menu_id_parent');
            table.string('dm_menu_icon_class', 200).notNullable();

            table.foreign('dm_menu_id_parent').references('dm_menu_id').inTable('dm_menus');
        })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('dm_menus')
};
