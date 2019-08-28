var knex = require('./common/DB')
module.exports = {
    getFile: (limit, offset, index, sortBy, callback) => {
        knex.select('*').from('file_khachhangs').orderBy(index, sortBy).limit(limit).offset(offset)
            .then((res) => {
                knex('file_khachhangs').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                file_khachhangs: res,
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

    inserFile_khachhangs: function (file_khachhangs, callback) {
        knex.from('file_khachhangs').insert(file_khachhangs).then(res => {
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

    updateFile_khachhangs: function (file_khachhangs, callback) {
        knex.from('file_khachhangs').where('file_tenfile', file_khachhangs.file_tenfile).update(file_khachhangs).then(res => {
            callback({
                success: true,
                file_khachhangs: file_khachhangs
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    deleteFile_khachhangs: function (file_khachhangs, callback) {
        knex.from('file_khachhangs').whereIn('file_tenfile', file_khachhangs).del().then(res => {
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