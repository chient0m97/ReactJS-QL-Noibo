
exports.up = function(knex) {
  return knex.schema.createTable('hotros', function(table){
      table.increments('ht_id').primary();
      table.integer('dm_duan_id').notNullable();
      table.date('ht_thoigiantiepnhan').notNullable();
      table.date('ht_thoigian_hoanthanh');
      table.integer('ns_id_ass').notNullable();
      table.integer('ns_id_nguoitao').notNullable();
      table.string('ht_noidungyeucau', 250).notNullable();
      table.integer('kh_id');
      table.string('ht_trangthai', 20).notNullable();
      table.string('ht_phanloai', 5).notNullable();
      table.string('ht_uutien', 5).notNullable();
      table.string('ht_ghichu', 500);

      table.foreign('dm_duan_id').references('dm_duan_id').inTable('duans');
      table.foreign('ns_id_ass').references('ns_id').inTable('nhansu');
      table.foreign('ns_id_nguoitao').references('ns_id').inTable('nhansu');
      table.foreign('kh_id').references('kh_id').inTable('khachhangs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('hotros')
};
