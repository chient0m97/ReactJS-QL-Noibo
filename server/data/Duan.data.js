var knex = require('./common/DB')

module.exports = {
    getDuan: (limit, offset, callback) => {
        knex.raw("select  da.*, nhs.ns_hovaten,nhs.ns_id from duans da left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns.ns_id as ns_id from nhansu ns) as nhs on nhs.ns_id = da.ns_id_qtda" + ' offset ' + offset + ' limit ' + limit)
            .then((res) => {
                var duans = res
                knex('duans').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                duans: res.rows,
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
    },
    deleteDuanbyId: function (dm_duan_id, callback) {
        knex.from('duans').whereIn('dm_duan_id', dm_duan_id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    insertDuan: function (duan, callback) {
        knex.from('duans').insert(duan).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    updateDuan: function (duan, callback) {
        knex.from('duans').where('dm_duan_id', duan.dm_duan_id)
            .update(duan).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
    },
    selectDuan: function (duan, callback) {
        knex.from('duans').select('*').where('dm_duan_id', duan.dm_duan_id).then(res => {
            callback(res[0]);
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    getQTDA: function (callback) {
        knex('nhansu').select('ns_id', knex.raw("ns_ho ||' '||ns_tenlot ||' '||ns_ten as ns_ten")).then(res => {
            callback(res);
        }).catch((err) => {
            console.log(err)
        })
    },
    getUserLogin: function (username, callback) {
        knex.from('users').select('password').where('name', '=', username).then(res => {
            callback(res[0]);
        }).catch(err => {
            console.log(err, 'lỗi kết nối')
        })
    },
    getcha:function(callback){
        knex('nhansu').select('ns_id', knex.raw("coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten")).then(res=>{
            callback(res);
        }).catch((err)=> {
            console.log(err)
        })
    },
};
