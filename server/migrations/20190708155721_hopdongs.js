
exports.up = function(knex) {
  return knex.schema.createTable('hopdongs', function(table){
      table.increments('hd_id').primary();
      table.integer('dm_duan_id').notNullable();
      table.string('hd_loai', 10).notNullable();
      table.string('hd_so', 100);
      table.integer('hd_thoigianthuchien');
      table.date('hd_ngayketthuc');
      table.string('hd_diachi', 250);
      table.date('hd_ngayky');
      table.date('hd_ngaythanhly');
      table.date('hd_ngayxuathoadon');
      table.date('hd_ngaythanhtoan');
      table.string('hd_trangthai', 10);
      table.string('hd_files', 500);
      table.string('hd_ghichu', 250);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('hopdongs')
};
