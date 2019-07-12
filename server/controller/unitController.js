var Validator =  require('../validate/common')
var unitData = require('../data/unit.data')
var constant = require('./constant')
var UnitController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */
    getUnit: function getUnit(pageNumber, pageSize,index, sortBy, callback){
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        unitData.getUnit(limit, offset,index, sortBy, (data) => {
            callback(data);
        });
    },
     /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */

    GetById: function GetById(Id, callback) {
        unitData.GetById(Id, (data) => {
            console.log('DATA', data)
            if (data == undefined){
                callback({});
            }
            callback(data);
        })
    },

    DeleteUnitbyId: async function deleteUnitbyId(Id, callback) {
        unitData.deleteUnitbyId(Id, (data) => {
            if(data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            callback(data, 400);
        })
    },

    insertUnit: async function insertUnit(unit, callback) {
        if( 
        Validator.isInt(unit.dm_db_id_tinh, 'ID Tỉnh không đúng định dạng')
        & Validator.isInt(unit.dm_db_id_huyen, 'ID Huyện không đúng định dạng')
        & Validator.isInt(unit.dm_db_id_xa, 'ID Xã không đúng định dạng')
        ){
            if (await Validator.db.unique('donvis', 'dm_dv_ten', unit.dm_dv_ten, 'Tên đơn vị này đã tồn tại !!')
            & await Validator.db.unique('donvis', 'dm_dv_masothue', unit.dm_dv_masothue, 'Mã số thuế này đã tồn tại !!')
            & await Validator.db.unique('donvis', 'dm_dv_sodienthoai', unit.dm_dv_sodienthoai, 'Số điện thoại này đã tồn tại !!')
            ){
                console.log('ddax validate')
                unitData.insertUnit(unit, (response) => {
                    var message = constant.successInseart;
                    var status = 200;
                    if (!response.success) {
                        Validator.error.push(constant.errorSys)
                        message = Validator.getError()
                        status = 400
                    }
                    callback({
                        message: message,
                        success: response.success
                    }, status);
                })
            }
            else {
                var eror =  Validator.getError()
                console.log('looix tra ve', eror)
                callback({
                    message: eror,
                    success: false
                }, 400);
            }
         }
    },
    updateUnit: function updateUnit(unit, callback) {
        // if(
        // Validator.isInt(unit.dm_db_id_tinh, 'ID Tỉnh không đúng định dạng')
        // & Validator.isInt(unit.dm_db_id_huyen, 'ID Huyện không đúng định dạng')
        // & Validator.isInt(unit.dm_db_id_xa, 'ID Xã không đúng định dạng')
        // & Validator.isInt(unit.kh_id_nguoidaidien, 'ID Người đại diện không đúng định dạng')
        // ){
            // if (await Validator.db.unique('donvis', 'dm_dv_ten', unit.dm_dv_ten, 'Tên đơn vị này đã tồn tại !!')
            // & await Validator.db.unique('donvis', 'dm_dv_masothue', unit.dm_dv_masothue, 'Mã số thuế này đã tồn tại !!')
            // & await Validator.db.unique('donvis', 'dm_dv_sodienthoai', unit.dm_dv_sodienthoai, 'Số điện thoại này đã tồn tại !!')
            // ){
                unitData.updateUnit(unit, (res) => {
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : callback.errorUpdate
                    })
                })
            // }
        // }
    },
    search: function search( pageSize,pageNumber,textSearch, columnSearch,index,sortBy,callback){
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        unitData.search(limit,offset,textSearch,columnSearch, index, sortBy ,(data)=>{
        console.log(limit)
        console.log(offset)
            
            console.log('aaaaaaaaa',data)
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next()
    },
}
module.exports = UnitController;