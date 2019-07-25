var knex = require('./common/DB')

module.exports = {
    getUnit: (limit, offset, index, sortBy, callback) => {
        knex.raw("select *, dvcha.ten tendonvicha, kh.ho || ' ' || kh.tenlot || ' ' || kh.ten  as tennguoidaidien,dibtinh.id as dm_db_id_tinh ,dibtinh.ten as tentinh , dibhuyen.id as dm_db_id_huyen ,dibhuyen.ten as tenhuyen , dibxa.id as dm_db_id_xa ,dibxa.ten as tenxa from donvis dv left join ( select dvs.dm_dv_id id ,dvs.dm_dv_ten ten from donvis dvs ) dvcha on dvcha.id = dv.dm_dv_id_cha left join (select khs.kh_id id ,khs.kh_ho ho ,khs.kh_tenlot tenlot ,khs.kh_ten ten from khachhangs khs) as kh on kh.id = dv.kh_id_nguoidaidien left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibtinh on dibtinh.id = dv.dm_db_id_tinh left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibhuyen on dibhuyen.id = dv.dm_db_id_huyen left join(select dbs.dm_db_id id, dbs.dm_db_ten as ten from diabans dbs) as dibxa on dibxa.id = dv.dm_db_id_xa order by " + index + ' ' + sortBy + ' limit ' + limit + ' offset ' + offset)
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
    deleteUnitbyId: function (Id, callback) {
        knex.from('donvis').where('dm_dv_id', Id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    // deleteUnitbyId: function(Id, callback) {
    //     knex.from('donvis').where('dm_dv_id', Id).del().then(res => {
    //         callback({success: true, message: 'Delete Success'});
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         callback({success: false})
    //     })
    // },

    insertUnit: function (unit, callback, qb) {
        if (knex.from('donvis').insert(unit).then(res => {
            console.log('inserted');
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })) {
            return true;
        }
        else {
            knex.withRecursive('khachhangs', (qb) => {
                qb.select('*').from('donvis').where('dm_dv_id', 1).union((qb) => {
                    qb.select('*').from('donvis').join('khachhangs', 'kh_id', 'dm_dv_id')
                })
            }).select('*').from('khachhangs')
        }
    },
    updateUnit: function (unit, callback) {
        knex.from('donvis').where('dm_dv_id', unit.dm_dv_id)
            .update(unit).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
        // knex.withRecursive('donvis',(qb) => {
        //     qb.select('*').from('donvis').where('dm_dv_id',1).union((qb) => {
        //         qb.select('*').from('donvis').join('donvis','dm_dv_id_cha','dm_dv_id')
        //     })
        // }).select('*').from('donvis')
    },
    selectUnit: function (unit, callback) {
        knex.from('donvis').select('*').where('dm_dv_id', unit.dm_dv_id).then(res => {
            callback(res[0]);

        }).catch(err => {
            console.log('uiwhihw', err)
            callback({ success: false })
        })
        // knex.from('donvis').select('*').where('dm_dv_id', unit.dm_dv_id).then(res => {
        //     callback(res[0]);
        // }).catch(err => {
        //     console.log(err)
        //     callback({ success: false })
        // })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        console.log('cai dkm')
        console.log('================', limit)
        knex('donvis').where(columnSearch, 'like', '%' + textSearch + '%').orderBy(index, sortBy).limit(limit).offset(offset)
            .then(res => {
                var units = res
                console.log('unit', units)
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
    // getcha:function(callback){
    //     knex('donvis').select('dm_dv_id_cha').then(res=>{
    //         callback(res);
    //     })
    // }

    getTinh: function (callback) {
        knex.from('diabans').select('*').where('dm_db_cap', 1)
            .then((res) => {
                console.log('data', res)
                callback(res);
            })
    },
    getHuyen: function (id_db_tinh, callback) {
        console.log('day la id tinh', id_db_tinh)
        knex.raw('select dm_db_id , dm_db_ten from diabans where dm_db_id_cha = ' + id_db_tinh)
            .then((res) => {
                console.log('data row', res.rows)
                callback(res.rows);
            })
    },
    getXa: function (data, callback) {
        console.log('dcm id  huyen', data)
        knex.raw('select dm_db_id, dm_db_ten from diabans where dm_db_id_cha = ' + data.dm_db_id_huyen)
        // console.log('dcm xa',data)
            .then((res) => {
                console.log('data xa', res.rows)
                callback(res.rows);
            })
    },

    getKhachhang : function (callback) {
        knex.from('khachhangs').select('*')
        .then((res) => {
            callback(res);
        })
    }
    // getXa : function (id_db_huyen, callback) {
    //     console.log('đây là id huyện',id_db_huyen)
    //     knex.raw('select dm_db_id, dm_db_ten from diabans where dm_db_id_cha =' + id_db_huyen)
    //     .then((res) => {
    //         console.log('data row', res.rows)
    //         callback(res.rows);
    //     })
    // }
};