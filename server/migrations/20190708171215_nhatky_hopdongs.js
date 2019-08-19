
exports.up = function(knex) {
  return knex.schema.createTable('nhatky_hopdongs', function(table){
      table.string('nkhd_id', 36).unique().primary();
      table.string('dm_duan_id', 36).notNullable();
      table.string('nkhd_loai', 10).notNullable();
      table.string('nkhd_so', 100);
      table.integer('nkhd_thoigianthuchien');
      table.date('nkhd_ngayketthuc');
      table.string('nkhd_diachi', 250);
      table.date('nkhd_ngayky');
      table.date('nkhd_ngaythanhly');
      table.date('nkhd_ngayxuathoadon');
      table.date('nkhd_ngaythanhtoan');
      table.string('nkhd_trangthai', 10);
      table.string('nkhd_files', 500);
      table.string('nkhd_ghichu', 250);
      table.string('ns_id_capnhat', 36).notNullable();
      table.date('nkhd_thoigiancapnhat').notNullable();

      table.foreign('ns_id_capnhat').references('ns_id').inTable('nhansu');
      table.foreign('dm_duan_id').references('dm_duan_id').inTable('duans');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('nhatky_hopdongs')
};
