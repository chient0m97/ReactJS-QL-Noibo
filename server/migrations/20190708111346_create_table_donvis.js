exports.up = function(knex) {
  return knex.schema
  .createTable('donvis', function(table) {
<<<<<<< HEAD
      table.increments('dm_dv_id').primary();
      table.integer('dm_dv_id_cha');
=======
      table.string('dm_dv_id',36).unique().primary();
      table.string('dm_dv_id_cha',36);
>>>>>>> origin/chien
      table.string('dm_dv_ten' , 50).notNullable();
      table.integer('dm_db_id_tinh').notNullable();
      table.integer('dm_db_id_huyen').notNullable();
      table.integer('dm_db_id_xa').notNullable();
      table.string('dm_dv_diachi', 50).notNullable();
      table.string('dm_dv_masothue',50);
<<<<<<< HEAD
      table.string('dm_dv_sodienthoai', 150);
      table.integer('kh_id_nguoidaidien');
      table.string('dm_dv_trangthai', 50);

      table.foreign('dm_dv_id_cha').references('dm_dv_id').inTable('donvis')
      table.foreign('kh_id_nguoidaidien').references('dm_dv_id').inTable('donvis')
=======
      table.string('dm_dv_sodienthoai', 50);
      table.string('kh_id_nguoidaidien',36);
      table.string('dm_dv_trangthai', 50);

      table.foreign('dm_dv_id_cha').references('dm_dv_id').inTable('donvis')
      table.foreign('kh_id_nguoidaidien').references('kh_id').inTable('khachhangs')
>>>>>>> origin/chien
  })
};

exports.down = function(knex) {
<<<<<<< HEAD
  return knex.schema.dropTableIfExists('donvis')
=======
  return knex.schema.dropTable('donvis')
>>>>>>> origin/chien
};
