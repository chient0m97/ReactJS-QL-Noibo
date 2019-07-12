var knex = require('./common/DB')

module.exports = {
    getUnit: (limit, offset,index, sortBy, callback) => {
        knex.from('donvis').select('*').orderBy(index, sortBy).limit(limit).offset(offset)
        .then((res) => {
            var units = res
            knex('donvis').count()
            .then((resCount) => {
                callback({
                    success: true,
                    data: {
                        units: units,
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
            callback({ success:true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
            message.success(data.message + 'id là' + dm_dv_id)
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

    insertUnit: function (unit, callback){
        knex.from('donvis').insert(unit).then(res => {
            console.log('inserted');
            callback({ success: true });
        }).catch(err => {
            console.log(err)
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
            console.log(err)
            callback({ success: false })
        })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        console.log('cai dkm')
        console.log('================',limit)
        knex('donvis').where(columnSearch,'like','%'+textSearch+'%').orderBy(index,sortBy).limit(limit).offset(offset)
        .then(res=> {
            var units = res
            console.log(units)
            knex('donvis').where(columnSearch,'like','%'+textSearch+'%').count()
            .then(resCount=>{
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
            .catch((err)=>{
                console.log('lỗi  kết nối', err)
            })
        })
        .catch((err)=> {
            console.log('lỗi  kết nối', err)
        })
    },
};