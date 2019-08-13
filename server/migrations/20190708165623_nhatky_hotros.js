
exports.up = function(knex) {
  return knex.schema.createTable('nhatky_hotros', function(table){
      table.string('nkht_id', 36).unique().primary();
      table.string('dm_duan_id', 36).notNullable();
      table.date('nkht_thoigiantiepnhan').notNullable();
      table.date('nkht_thoigian_hoanthanh');
      table.string('ns_id_ass',36).notNullable();
      table.string('ns_id_nguoitao', 36).notNullable();
      table.string('nkht_noidungyeucau', 250).notNullable();
      table.string('kh_id', 36);
      table.string('nkht_trangthai', 20).notNullable();
      table.string('ht_phanloai', 5).notNullable();
      table.string('nkht_uutien', 5).notNullable();
      table.string('nkht_ghichu', 500);
      table.string('ns_id_capnhat', 36).notNullable();
      table.date('nkht_thoigiancapnhat').notNullable();

      table.foreign('dm_duan_id').references('dm_duan_id').inTable('duans');
      table.foreign('ns_id_ass').references('ns_id').inTable('nhansu');
      table.foreign('ns_id_nguoitao').references('ns_id').inTable('nhansu');
      table.foreign('kh_id').references('kh_id').inTable('khachhangs');
      table.foreign('ns_id_capnhat').references('ns_id').inTable('nhansu');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('nhatky_hotros')
};
