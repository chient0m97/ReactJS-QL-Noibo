var knex = require('./common/DB')

module.exports = {
    getUnit: (limit, offset, index, sortBy, callback) => {
<<<<<<< HEAD
        knex.raw("select *, dvcha.ten tendonvicha, kh.ten  as tennguoidaidien,dibtinh.id as dm_db_id_tinh ,dibtinh.ten as tentinh , dibhuyen.id as dm_db_id_huyen ,dibhuyen.ten as tenhuyen , dibxa.id as dm_db_id_xa ,dibxa.ten as tenxa from donvis dv left join ( select dvs.dm_dv_id id ,dvs.dm_dv_ten ten from donvis dvs ) dvcha on dvcha.id = dv.dm_dv_id_cha left join (select khs.kh_id id , khs.kh_ten ten from khachhangs khs) as kh on kh.id = dv.kh_id_nguoidaidien left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibtinh on dibtinh.id = dv.dm_db_id_tinh left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibhuyen on dibhuyen.id = dv.dm_db_id_huyen left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibxa on dibxa.id = dv.dm_db_id_xa order by " + index + ' ' + sortBy + ' limit ' + limit + ' offset ' + offset)
=======
        knex.raw("select *, dvcha.ten tendonvicha, kh.ten  as tennguoidaidien,dibtinh.id as dm_db_id_tinh ,dibtinh.ten as tentinh , dibhuyen.id as dm_db_id_huyen ,dibhuyen.ten as tenhuyen , dibxa.id as dm_db_id_xa ,dibxa.ten as tenxa from donvis dv left join ( select dvs.dm_dv_id id ,dvs.dm_dv_ten ten from donvis dvs ) dvcha on dvcha.id = dv.dm_dv_id_cha left join (select khs.kh_id id, khs.kh_ten ten from khachhangs khs) as kh on kh.id = dv.kh_id_nguoidaidien left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibtinh on dibtinh.id = dv.dm_db_id_tinh left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibhuyen on dibhuyen.id = dv.dm_db_id_huyen left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibxa on dibxa.id = dv.dm_db_id_xa order by " + index + ' ' + sortBy + ' limit ' + limit + ' offset ' + offset)
>>>>>>> e47faee07de9a67cbeeeccc06a38983539e94b70
            .then((res) => {
                var units = res
                knex('donvis').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                units: units.rows,
                                count: resCount[0].count
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                console.log(err),
                    callback({
                        success: false
                    })
            })
    },

    deleteUnitbyId: function (dm_dv_id, callback) {
        knex.from('donvis').whereIn('dm_dv_id', dm_dv_id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    insertUnit: function (unit, callback) {
        knex.from('donvis').insert(unit)
        .then(res => {
            var sql = 'update khachhangs set dm_dv_id = ' + "'" + unit.dm_dv_id + "'" + ' where kh_id = ' + "'" + unit.kh_id_nguoidaidien + "'"
            knex.raw(sql).then(res => {
            })
            callback({
                success: true
            });
        }).catch(err => {
            console.log(err, 'lỗi  ínert')
            callback({ success: false })
        })
    },

    updateUnit: function (unit, callback) {
        knex.from('donvis').where('dm_dv_id', unit.dm_dv_id)
            .update(unit).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
    },
    selectUnit: function (unit, callback) {
        knex.from('donvis').select('*').where('dm_dv_id', unit.dm_dv_id).then(res => {
            callback(res[0]);

        }).catch(err => {
            console.log('uiwhihw', err)
            callback({ success: false })
        })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        knex('donvis').where(columnSearch, 'like', '%' + textSearch + '%').orderBy(index, sortBy).limit(limit).offset(offset)
            .then(res => {
                var units = res
                knex('donvis').where(columnSearch, 'like', '%' + textSearch + '%').count()
                    .then(resCount => {
                        var count = resCount[0].count

                        let dataCallback = {
                            success: true,
                            message: 'Get data success',
                            data: {
                                units: units,
                                count: count
                            }
                        }
                        callback(dataCallback)
                    })
                    .catch((err) => {
                        console.log('lỗi  kết nối', err)
                    })
            })
            .catch((err) => {
                console.log('lỗi  kết nối', err)
            })
    },
    getcha: function (callback) {
        knex('donvis').select('dm_dv_id_cha').then(res => {
            callback(res);
        })
    },

    getTinh: function (callback) {
        knex.from('diabans').select('*').where('dm_db_cap', 1)
            .then((res) => {
                callback(res);
            })
    },
    getHuyen: function (id_db_tinh, callback) {
        knex.raw('select dm_db_id , dm_db_ten from diabans where dm_db_id_cha = ' + id_db_tinh)
            .then((res) => {
                callback(res.rows);
            })
    },
    getXa: function (data, callback) {
        knex.raw('select dm_db_id, dm_db_ten from diabans where dm_db_id_cha = ' + data)
            .then((res) => {
                callback(res.rows);
            })
    },

    getKhachhang: function (callback) {
<<<<<<< HEAD
        knex.raw("select  kh.kh_id,kh_ten as tennguoidaidien from khachhangs kh")
=======
        knex.raw("select  kh.kh_id, kh_ten as tennguoidaidien from khachhangs kh")
>>>>>>> e47faee07de9a67cbeeeccc06a38983539e94b70
            // knex.from('khachhangs').select('*')
            .then((res) => {
                callback(res.rows);
            })
    },

    insertKhachhang: function (khachhang, callback) {
        knex.from('khachhangs').insert(khachhang).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err, 'lỗi  insert')
            callback({ success: false })
        })
    }
};