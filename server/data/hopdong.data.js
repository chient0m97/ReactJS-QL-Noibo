var knex = require('./common/DB')


module.exports = {
    getHopdong: (limit, offset, callback) => {
        knex.select('*').from('hopdongs').limit(limit).offset(offset)
            .then((res) => {
                var hopdongs = res
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
        knex.from('hopdongs').insert(hopdong).then(res => {
            console.log('inserted');
            callback({ success: true});
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    updateHopdong: function (hopdong, callback) {
        knex.from('hopdongs').where('hd_id', hopdong.hd_id)
        .update(hopdong).then(res=>{
            callback({ success: true })
         }).catch(err=>{
            console.log(err)
            callback({ success: false })
         })
    },
    selectHopdong: function (hopdong, callback) {
        knex.from('hopdongs').select('*').where('hd_id', hopdong.hd_id).then(res=>{
            callback(res[0]);
        }).catch(err=>{
            console.log(err)
            callback({ success: false })
        })
    },
    // getUserLogin: function (username, callback) {
    //     knex.from('hopdongs').select('password').where('name','=',username).then(res=>{
    //         callback(res[0]);
    //     }).catch(err=>{
    //         console.log(err, 'lỗi kết nối')
    //     })
    // },
    getcha: function(callback){
        //let strSqlKH = "select kh_id as id, kh_ten || '(' || kh_email || ')' ten from khachhangs";
        let strSqlDV = "select dm_dv_id as id, dm_dv_ten ten from donvis";
        knex.raw(  strSqlDV  ).then(res=>{ //('donvis').select('dm_dv_id','dm_dv_ten').then(res=>{
            callback(res.rows);
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },
    getcha1: function(callback){
        let strSqlKH = "select kh_id as id, kh_ten || '(' || kh_email || ')' ten from khachhangs";
        //let strSqlDV = "select dm_dv_id as id, dm_dv_ten ten from donvis";
        knex.raw(  strSqlKH  ).then(res=>{ //('donvis').select('dm_dv_id','dm_dv_ten').then(res=>{
            callback(res.rows);
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },
    getduan: function(callback){
        let strSqlDA = "select dm_duan_id, dm_duan_ten from duans";
        knex.raw(  strSqlDA  ).then(res=>{ //('donvis').select('dm_dv_id','dm_dv_ten').then(res=>{
            callback(res.rows);
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        knex('hopdongs').where(columnSearch,'like', textSearch).orderBy(index,sortBy).limit(limit).offset(offset)
        .then(res=> {
            var hopdongs = res
            knex('hopdongs').where(columnSearch,'like', textSearch).count()
            .then(resCount=>{
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
            .catch((err)=>{
                console.log('lỗi  kết nối', err)
            })
        })
        .catch((err)=> {
            console.log('lỗi  kết nối', err)
        })
    },
};
