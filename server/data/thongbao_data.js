var knex = require('./common/DB')

module.exports = {
    getThongbao: (tb_ns_id, callback) => {
        console.log("ns_id ", tb_ns_id.tb_ns_id)
        knex.raw("select * from thongbaos where tb_ns_id=(select ns.ns_id from nhansu ns where ns_dinhdanhcanhan=(select madinhdanh from users where name='" + tb_ns_id.tb_ns_id + "')) and tb_trangthai='chuadoc'")
            .then((res) => {
                callback({
                    success: true,
                    data: {
                        thongbao: res.rows,
                    }
                })
            }).catch((err) => {
                console.log(err),
                    callback({
                        success: false
                    })
            })
    },

    insertThongbao: function (thongbao, callback) {
        // console.log("data binh luan ",binhluan)
        knex.from('thongbaos').insert(thongbao).then(res => {
            callback({
                success: true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    }
}