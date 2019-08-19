var knex = require('./common/DB')

module.exports = {
    getDuan: (limit, offset, callback) => {
        knex.select('dm_duan_id', 'dm_duan_ten', 'dm_duan_key', knex.raw("nhansu.ns_ho ||' '|| nhansu.ns_tenlot || ' ' || nhansu.ns_ten as ns_id_qtda")).from('duans').limit(limit).offset(offset)
            .innerJoin('nhansu','duans.ns_id_qtda', 'nhansu.ns_id')
            .then((res) => {
                var duans = res
                knex('duans').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                duans: duans,
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
        console.log('iu delete', dm_duan_id)
        knex.from('duans').where('dm_duan_id', dm_duan_id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    insertDuan: function (duan, callback) {
        knex.from('duans').insert(duan).then(res => {
            console.log('inserted');
            callback({ success: true});
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    updateDuan: function (duan, callback) {
        knex.from('duans').where('dm_duan_id', duan.dm_duan_id)
        .update(duan).then(res=>{
            console.log("Day la update")
            callback({ success: true })
         }).catch(err=>{
            console.log(err)
            callback({ success: false })
         })
    },
    selectDuan: function (duan, callback) {
        knex.from('duans').select('*').where('dm_duan_id', duan.dm_duan_id).then(res=>{
            callback(res[0]);
        }).catch(err=>{
            console.log(err)
            callback({ success: false })
        })
    },
    getcha:function(callback){
        knex('nhansu').select('ns_id', knex.raw("ns_ho ||' '||ns_tenlot ||' '||ns_ten as ns_ten")).then(res=>{
            callback(res);
            console.log(res)
        }).catch((err)=> {
            console.log(err)
        })
    },
    getUserLogin: function (username, callback) {
        knex.from('users').select('password').where('name','=',username).then(res=>{
            callback(res[0]);
        }).catch(err=>{
            console.log(err, 'lỗi kết nối')
        })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        knex('duans').where(columnSearch,'like', textSearch).orderBy(index,sortBy).limit(limit).offset(offset)
        .then(res=> {
            var duans = res
            knex('duans').where(columnSearch,'like', textSearch).count()
            .then(resCount=>{
                var count = resCount[0].count
                let dataCallback = {
                    success: true,
                    message: 'Get data success',
                    data: {
                        duans: duans,
                        count: count
                    }
                }
                callback(dataCallback)
            })
            .catch((err)=>{
                console.log('lỗi  kết nối', err)
            })
        })
        .catch((err)=> {
            console.log('lỗi  kết nối', err)
        })
    },
};
