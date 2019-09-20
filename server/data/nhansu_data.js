var knex = require('./common/DB')
var dateFormat = require('dateformat');

module.exports = {
    getNhansu: (limit, offset, index, sortBy, callback) => {
        //knex.select('ns_id', 'ns_dinhdanhcanhan', knex.raw("ns_ho || ' ' || ns_tenlot || ' ' || ns_ten as ns_hovaten"), 'ns_ngaysinh', 'ns_gioitinh', 'ns_sodienthoai', 'ns_email', 'ns_diachihiennay', 'ns_nguyenquan', 'ns_nguoilienhe', 'ns_bangcap')
        knex.select('ns_id', 'ns_ho', 'ns_tenlot', 'ns_ten', 'ns_ngaysinh', 'ns_gioitinh', 'ns_dinhdanhcanhan', 'ns_sodienthoai', 'ns_email', 'ns_diachihiennay', 'ns_nguyenquan', 'ns_nguoilienhe', 'ns_bangcap', 'ns_ngayhocviec', 'ns_ngaythuviec', 'ns_ngaylamchinhthuc', 'ns_ngaydongbaohiem', 'ns_cacgiaytodanop', 'ns_taikhoannganhang', 'ns_trangthai', knex.raw("coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten"))
            .from('nhansu').orderBy(index, sortBy).limit(limit).offset(offset)
            .then((res) => {
                knex('nhansu').count()
                    .then((resCount) => {
                        knex.select('ns_gioitinh').from('nhansu').then((resGioitinh) => {
                            callback({
                                success: true,
                                data: {
                                    nhansu: res,
                                    count: resCount[0].count,
                                    resGioitinh: resGioitinh
                                }
                            })
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

    insertNhansu: function (nhansu, callback) {
        nhansu.ns_ngaysinh = dateFormat(nhansu.ns_ngaysinh, "yyyy/mm/dd")
        nhansu.ns_ngayhocviec = dateFormat(nhansu.ns_ngayhocviec, "yyyy/mm/dd")
        nhansu.ns_ngaythuviec = dateFormat(nhansu.ns_ngaythuviec, "yyyy/mm/dd")
        nhansu.ns_ngaylamchinhthuc = dateFormat(nhansu.ns_ngaylamchinhthuc, "yyyy/mm/dd")
        nhansu.ns_ngaydongbaohiem = dateFormat(nhansu.ns_ngaydongbaohiem, "yyyy/mm/dd")
        knex.from('nhansu').insert(nhansu).then(res => {
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

    updateNhansu: function (nhansu, callback) {
        nhansu.ns_ngaysinh = dateFormat(nhansu.ns_ngaysinh, "yyyy/mm/dd")
        nhansu.ns_ngayhocviec = dateFormat(nhansu.ns_ngayhocviec, "yyyy/mm/dd")
        nhansu.ns_ngaythuviec = dateFormat(nhansu.ns_ngaythuviec, "yyyy/mm/dd")
        nhansu.ns_ngaylamchinhthuc = dateFormat(nhansu.ns_ngaylamchinhthuc, "yyyy/mm/dd")
        nhansu.ns_ngaydongbaohiem = dateFormat(nhansu.ns_ngaydongbaohiem, "yyyy/mm/dd")
        knex.from('nhansu').where('ns_id', nhansu.ns_id).update(nhansu).then(res => {
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

    deleteNhansu: function (ns_id, callback) {
        knex.from('nhansu').whereIn('ns_id', ns_id).del().then(res => {
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

    selectNhansu: function (nhansu, callback) {
        nhansu.ns_ngaysinh = dateFormat(nhansu.ns_ngaysinh, "yyyy/mm/dd")
        nhansu.ns_ngayhocviec = dateFormat(nhansu.ns_ngayhocviec, "yyyy/mm/dd")
        nhansu.ns_ngaythuviec = dateFormat(nhansu.ns_ngaythuviec, "yyyy/mm/dd")
        nhansu.ns_ngaylamchinhthuc = dateFormat(nhansu.ns_ngaylamchinhthuc, "yyyy/mm/dd")
        nhansu.ns_ngaydongbaohiem = dateFormat(nhansu.ns_ngaydongbaohiem, "yyyy/mm/dd")
        knex.from('nhansu').select('*').where('ns_id', nhansu.ns_id).then(res => {
            callback(res[0])
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    search: function (limit, offset, timkiem, callback) {
        let qr = ""
        if (timkiem.length > 0) {
            for (i = 0; i < timkiem.length; i++) {
                let a = timkiem[i]
                if (!a.values) {
                    a.values = ''
                }
                // if (a.keys === 'ns_hovaten') {
                //     qr = qr + "upper(cast(nhansu.ns_ho || nhansu.ns_tenlot || nhansu.ns_ten as text)) like upper('%" + a.values.replace(/ /g) + "%') and"
                //     console.log('qrrrr', qr)
                // } 
                    qr = qr + "upper(cast(nhansu." + a.keys + " as text)) like upper('%" + a.values + "%') and "
            
            }
            let queryy = qr.slice(0, qr.length - 5)
            let query = "select * from nhansu where " + queryy + ""
            knex.raw(query)
                .then(res => {
                    knex.raw("select count(*) from nhansu where " + queryy + "")
                        .then(resCount => {
                            callback({
                                success: true,
                                data: {
                                    nhansu: res.rows,
                                    count: resCount.rows[0].count
                                }
                            })
                        })
                        .catch((err) => {
                            console.log('lỗi  kết nối', err)
                        })
                })
                .catch((err) => {
                    console.log('lỗi  kết nối', err)
                })
        }
        else {
            this.getNhansu(limit, offset, callback);
        }
    },

    getUser(callback) {
        knex.select('name', 'madinhdanh').from('users').then((res) => {
            callback({
                data: {
                    users: res
                }
            })
        })
    }
}