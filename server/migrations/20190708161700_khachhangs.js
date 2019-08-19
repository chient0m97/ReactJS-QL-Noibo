
exports.up = function(knex) {
  return knex.schema.createTable('khachhangs', function(table){
      table.string('kh_id', 36).unique().primary();
      table.string('kh_ho', 50).notNullable();
      table.string('kh_tenlot', 50);
      table.string('kh_ten', 50).notNullable();
      table.date('kh_ngaysinh').notNullable();
      table.string('kh_gioitinh', 5).notNullable();
      table.string('kh_dinhdanhcanhan', 50);
      table.string('kh_sodienthoai', 50).notNullable();
      table.string('kh_email', 50);
      table.integer('dm_db_id_tinh').notNullable();
      table.integer('dm_db_id_huyen').notNullable();
      table.integer('dm_db_id_xa').notNullable();
      table.string('kh_diachi', 250);
      table.string('dm_dv_id', 36);
      table.string('kh_vitricongtac', 150);
      table.string('kh_lienlac', 250).notNullable();

      // table.foreign('dm_db_id_tinh').references('dm_db_id').inTable('diabans');
      // table.foreign('dm_db_id_huyen').references('dm_db_id').inTable('diabans');
      // table.foreign('dm_db_id_xa').references('dm_db_id').inTable('diabans');
      table.foreign('dm_dv_id').references('dm_dv_id').inTable('donvis');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('khachhangs')
};
