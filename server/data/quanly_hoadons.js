var knex = require('./common/DB')
module.exports = {
    getQuanly_hoadons: (limit, offset, index, sortBy, callback) => {
        knex.select('*').from('quanly_hoadons').orderBy(index, sortBy).limit(limit).offset(offset)
        // knex.raw("")
            .then((res) => {
                knex('quanly_hoadons').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                quanly_hoadons: res,
                                count: resCount[0].count
                            }
                        })
                    }).catch((err) => {
                        console.log(err),
                            callback({
                                success: false
                            })
                    })
            }).catch((err) => {
                console.log(err),
                    callback({
                        success: false
                    })
            })
    },

    insertQuanly_hoadons: function (quanly_hoadons, callback) {
        knex.from('quanly_hoadons').insert(quanly_hoadons).then(res => {
            callback({
                success: true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    updateQuanly_hoadons: function (quanly_hoadons, callback) {
        knex.from('quanly_hoadons').where('qlhd_sohoadon', quanly_hoadons.qlhd_sohoadon).update(quanly_hoadons).then(res => {
            callback({
                success: true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    deleteQuanly_hoadons: function (qlhd_sohoadon, callback) {
        knex.from('quanly_hoadons').whereIn('qlhd_sohoadon', qlhd_sohoadon).del().then(res => {
            callback({
                success: true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    getKhachHang(callback) {
        knex.select('kh_id', 'kh_ten').from('khachhangs').then((res) => {
            callback({
                data: {
                    khachhangs: res
                }
            })
        })
    },
}