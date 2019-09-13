var knex = require('./common/DB')
var xlsx = require("xlsx")
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
        // console.log(file_khachhangs)
        knex.from('file_khachhangs').insert(file_khachhangs).then(res => {
            var fileName=file_khachhangs.file_data.replace('http://localhost:5000','.')
            // console.log("data ", fileName)
            
            var wb = xlsx.readFile(fileName)

            var sheet_name_list = wb.SheetNames;
            
            var xlData = xlsx.utils.sheet_to_json(wb.Sheets[sheet_name_list[1]]);
            var xlDataSheet1 = xlsx.utils.sheet_to_json(wb.Sheets[sheet_name_list[0]]);

            // var ws = wb.Sheets["Hợp đồng"]
            // var data =xlsx.utils.sheet_to_json(ws)
            // console.log("day la data ",xlData)

            console.log(xlDataSheet1)
            callback({
                success: true,
                dataExcel: xlData,
                dataSheet1: xlDataSheet1
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

    deleteFile_khachhangs: function (file_id, callback) {
        knex.from('file_khachhangs').whereIn('file_id', file_id).del().then(res => {
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