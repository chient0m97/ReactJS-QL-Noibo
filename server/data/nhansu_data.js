var knex = require('./common/DB')

module.exports = {
    getNhansu: (limit, offset, index, sortBy, callback) => {
        knex.select('*').from('nhansu').orderBy(index, sortBy).limit(limit).offset(offset)
            .then((res) =>{
                knex('nhansu').count()
                    .then((resCount) => {
                        callback({
                            success : true,
                            data: {
                                nhansu: res,
                                count: resCount[0].count
                            }
                        })
                    }).catch((err) => {
                        console.log(err),
                        callback({
                            success:false
                        })
                    })
            }).catch((err) => {
                console.log(err),
                callback({
                    success:false
                })
            })
    },

    insertNhansu: function(nhansu, callback) {
        knex.from('nhansu').insert(nhansu).then(res => {
            callback({
                success:true                
            })
            console.log('DaTa =>: ',nhansu)
        }).catch(err => {
            console.log(err)
            callback({
                success : false
            })
        })
    },

    updateNhansu: function(nhansu, callback) {
        knex.from('nhansu').where('ns_id',nhansu.ns_id).update(nhansu).then(res => {
            callback({
                success:true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success : false
            })
        })
    },

    deleteNhansu: function(ns_id, callback){
        knex.from('nhansu').where('ns_id',ns_id).del().then(res =>{
            callback({
                success:true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    selectNhansu: function (nhansu, callback) {
        knex.from('nhansu').select('*').where('ns_id',nhansu.ns_id).then(res => {
            callback(res[0])
        }).catch(err => {
            console.log(err)
            callback({success:false})
        })
    },

    getDataSearch: function(limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        console.log('textsearch', textSearch, 'and column search:', columnSearch);

        textSearch='%'+textSearch+'%';
        console.log('textsearch', textSearch, 'and column search:', columnSearch);
        knex('nhansu').where(columnSearch,'like',textSearch).orderBy(index,sortBy).limit(limit).offset(offset)
            .then(response => {
                var nhansu = response
                console.log('=>', response)
                knex.from('nhansu').where(columnSearch,'like', textSearch).count('*')
                    .then(resCount =>{
                        var count = resCount[0].count;
                        let dataCallback = {
                            success: true,
                            message: 'Get data success',
                            data: {
                                nhansu: nhansu,
                                count: count,
                            }
                        }
                        console.log('res',nhansu)
                        callback(dataCallback)
                    }).catch(err => {
                        console.log(' Error connect ', err)
                    })
            }).catch(err => {
                console.log('Error connect', err)
            })
    }
}