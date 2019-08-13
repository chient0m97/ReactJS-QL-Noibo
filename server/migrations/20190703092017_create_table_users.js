
exports.up = function (knex) {
    return knex.schema.createTable('dcms', function (table) {
        table.string('id').unique().primary();
        table.string('name');
        table.string('fullname');
        table.string('password');
        table.timestamps();
    })
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists("dcms")
};