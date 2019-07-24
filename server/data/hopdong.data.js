var knex = require('./common/DB')
var pool = require('./connect')

module.exports = {
    getHopdong: (limit, offset, callback) => {

        // knex.select('*').from('hopdongs').limit(limit).offset(offset).then((res) => {     
        //                 var hopdongs = res
        //                 console.log(res, 'res')
        //                 knex('hopdongs').count()
        //                     .then((resCount) => {
        //                         callback({
        //                             success: true,
        //                             data: {

        //                                 hopdongs: hopdongs,
        //                                 count: resCount[0].count
        //                             }
        //                         })
        //                     }).catch((err) => {
        //                         console.log(err),
        //                             callback({
        //                                 success: false
        //                             })
        //                     })
        //             })
        // .catch((err) => {
        //     console.log(err),
        //         callback({
        //             success: false
        //         })
        // })
        pool.connect()
            .then(client => {
                let sql_SelectHopDongs = "select hd.hd_id, \
            case (hd.hd_loai) \
                when 'DV' then 'Đơn Vị'\
                when 'CN' then 'Cá Nhân'\
                else 'Không xác định' end hd_loai,\
            hd.hd_doituong,\
            case (hd.hd_loai)\
                when 'DV' then (select dv.dm_dv_ten from donvis dv where dv.dm_dv_id = hd.hd_doituong)\
                when 'CN' then (select kh.kh_ten from khachhangs kh where kh.kh_id = hd.hd_doituong)\
                else 'Không xác định' end hd_doituong,\
            hd.dm_duan_id,\
            da.dm_duan_ten,\
            hd.hd_so,\
            hd.hd_thoigianthuchien,\
            hd.hd_ngayketthuc,\
            hd.hd_diachi,\
            hd.hd_ngayky,\
            hd.hd_ngaythanhly,\
            hd.hd_ngayxuathoadon,\
            hd.hd_ngaythanhtoan,\
            hd.hd_trangthai, \
            case (hd.hd_trangthai)\
                 when 'DTH' then 'Đang thực hiện'\
                 when 'TL'  then 'Thanh lý'\
                 when 'XHD' then 'Xuất hóa đơn'\
                 when 'DTT' then 'Đã thanh toán'\
                 when 'DONG' then 'Đóng'\
                 else 'Không xác định'\
             end hd_trangthai,\
            hd.hd_files,\
            hd.hd_ghichu\
        from hopdongs hd,\
          duans da \
          where hd.dm_duan_id = da.dm_duan_id"
                return client.query(sql_SelectHopDongs)
                    .then(res => {
                        var hopdongs = res
                        console.log(res, 'res')
                        knex('hopdongs').count()
                            .then((resCount) => {
                                callback({
                                    success: true,
                                    data: {

                                        hopdongs: hopdongs,
                                        count: resCount[0].count
                                    }
                                })
                            }).catch((err) => {
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
                  
            })
    },
    deleteHopdongbyId: function (Id, callback) {
        knex.from('hopdongs').where('hd_id', Id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    insertHopdong: function (hopdong, callback) {
        console.log(hopdong, 'data insert')
        knex.from('hopdongs').insert(hopdong).then(res => {
            console.log('inserted');
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    updateHopdong: function (hopdong, callback) {
        knex.from('hopdongs').where('hd_id', hopdong.hd_id)
            .update(hopdong).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
    },

    getcha: function (callback) {
        //let strSqlKH = "select kh_id as id, kh_ten || '(' || kh_email || ')' ten from khachhangs";
        let strSqlDV = "select dm_dv_id as id, dm_dv_ten ten from donvis";
        knex.raw(strSqlDV).then(res => { //('donvis').select('dm_dv_id','dm_dv_ten').then(res=>{
            callback(res.rows);
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    },
    getdonvi: function (callback) {
        //let strSqlKH = "select kh_id as id, kh_ten || '(' || kh_email || ')' ten from khachhangs";
        let strSqlDV = "select dm_dv_id as id, dm_dv_ten ten from donvis";
        knex.raw(strSqlDV).then(res => { //('donvis').select('dm_dv_id','dm_dv_ten').then(res=>{
            callback(res.rows);
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    },
    getkhachhang: function (callback) {
        let strSqlKH = "select kh_id as id, kh_ten || '(' || kh_email || ')' ten from khachhangs";
        //let strSqlDV = "select dm_dv_id as id, dm_dv_ten ten from donvis";
        knex.raw(strSqlKH).then(res => { //('donvis').select('dm_dv_id','dm_dv_ten').then(res=>{
            callback(res.rows);
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    },
    getduan: function (callback) {
        let strSqlDA = "select dm_duan_id, dm_duan_ten from duans";
        knex.raw(strSqlDA).then(res => { //('donvis').select('dm_dv_id','dm_dv_ten').then(res=>{
            callback(res.rows);
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        knex('hopdongs').where(columnSearch, 'like', textSearch).orderBy(index, sortBy).limit(limit).offset(offset)
            .then(res => {
                var hopdongs = res
                knex('hopdongs').where(columnSearch, 'like', textSearch).count()
                    .then(resCount => {
                        var count = resCount[0].count
                        let dataCallback = {
                            success: true,
                            message: 'Get data success',
                            data: {
                                hopdongs: hopdongs,
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
};
