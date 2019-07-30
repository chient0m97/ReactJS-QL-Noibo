
exports.up = function(knex) {
  return knex.schema.createTable('nhansu',function(table){
      table.increments('ns_id').primary();
      table.string('ns_ho', 50).notNullable();
      table.string('ns_tenlot', 50);
      table.string('ns_ten', 50).notNullable();
      table.date('ns_ngaysinh').notNullable();
      table.string('ns_gioitinh', 5).notNullable();
      table.string('ns_dinhdanhcanhan', 50).unique();
      table.string('ns_sodienthoai', 50);
      table.string('ns_email', 50);
      table.string('ns_diachihiennay', 250).notNullable();
      table.string('ns_nguyenquan', 250).notNullable();
      table.string('ns_nguoilienhe', 250);
      table.string('ns_bangcap', 250);
      table.date('ns_ngayhocviec');
      table.date('ns_ngaythuviec').notNullable();
      table.date('ns_ngaylamchinhthuc');
      table.date('ns_ngaydongbaohiem');
      table.string('ns_cacgiaytodanop', 250);
      table.string('ns_taikhoannganhang', 250);
      table.string('ns_trangthai', 5).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('nhansu')
};
