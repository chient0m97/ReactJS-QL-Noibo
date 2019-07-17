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

    insertUnit: function (unit, callback,qb){
       if( knex.from('donvis').insert(unit).then(res => {
            console.log('inserted');
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })){
            return true;
        }
        else{
            knex.withRecursive('donvis',(qb) => {
                qb.select('*').from('dm_dv_id').where('dm_dv_id_cha', 1).union((qb) => {
                    qb.select('*').from('dm_dv_id').join('donvis','dm_dv_id_cha')
                })
            }).select('*').from('donvis')
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
    },
    selectUnit: function (unit, callback) {
        knex.from('donvis').select('*').where('dm_dv_id', unit.dm_dv_id).then(res => {
            callback(res[0]);

        }).catch(err => {
            console.log('uiwhihw', err)
            callback({ success: false})
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
        console.log('================',limit)
        knex('donvis').where(columnSearch,'like','%'+textSearch+'%').orderBy(index,sortBy).limit(limit).offset(offset)
        .then(res=> {
            var units = res
            console.log('unit',units)
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
    // getcha:function(callback){
    //     knex('donvis').select('dm_dv_id_cha').then(res=>{
    //         callback(res);
    //     })
    // }
};