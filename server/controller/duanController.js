var Validator = require('../validate/common')
const duanData = require('../data/Duan.data')
const constant = require('./constant')
const uuidv4 = require('uuid/v4');
var DuanController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */

    getDuan: function getDuan(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        duanData.getDuan(limit, offset, index, sortBy, (data) => {
            callback(data);
        }
        );
    },
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
    GetById: function GetById(Id, callback) {
        duanData.GetById(Id, (data) => {
            console.log('DATA', data)
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    },

    DeleteDuanbyId: async function deleteDuanbyId(dm_duan_id, callback) {
        duanData.deleteDuanbyId(dm_duan_id, (data) => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            callback(data, 400);
        })
    },

    insertDuan: async function insertDuan(duan, callback) {
        if (Validator.isNumAlpha(duan.dm_duan_key, 'Key không đúng định dạng')
            & Validator.isAlpha(duan.dm_duan_ten, 'Tên dự án không đúng định dạng')
            //& Validator.num(duan.dm_duan_id, 'Id dự án không đúng định dạng')
        ) {

            if (await Validator.db.unique('duans', 'ns_id_qtda', duan.ns_id_qtda, 'Ns_id_qtda đã tồn tại !')){
                let firstInsert;
                firstInsert = duan;
                firstInsert.dm_duan_id = uuidv4();
                duanData.insertDuan(firstInsert, (response) => {
                    var message = constant.successInsert;
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
            } else {
                callback({
                    message: Validator.getError(),
                    success: false
                }, 400);
            }

        } else {
            callback({
                message: Validator.getError(),
                success: false
            }, 400);
        }
    },
    updateDuan: async function updateDuan(duan, callback) {
        if (Validator.isNumAlpha(duan.dm_duan_key, 'Key không đúng định dạng')
          & Validator.isAlpha(duan.dm_duan_ten, 'Tên dự án không đúng định dạng')
        ) {
            if (1) {
                console.log("Day la update data", duan)
                duanData.updateDuan(duan, (res) => {
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : constant.errorUpdate
                    })
                })
          }
        }
    }
    ,
    getcha:function getcha(callback){
        duanData.getcha((data)=>{
            callback(data)
        })
    },
    Login: function getUserLogin(userName, callback) {
        userData.getUserLogin(userName, (data) => {

            callback(data);
        })
    },
    search: function search( pageSize,pageNumber,textSearch, columnSearch,index,sortBy,callback){
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        duanData.search(limit,offset,textSearch,columnSearch, index, sortBy ,(data)=>{
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
module.exports = DuanController;