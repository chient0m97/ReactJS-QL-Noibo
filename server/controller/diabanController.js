var Validator = require('../validate/common')
const diabanData = require('../data/Diaban.data')
const constant = require('./constant')
var DiabanController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */

    getDiaban: function getDiaban(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        diabanData.getDiaban(limit, offset, index, sortBy, (data) => {
            callback(data);
        }
        );
    },
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
    GetById: function GetById(Id, callback) {
        diabanData.GetById(Id, (data) => {
            console.log('DATA', data)
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    },

    DeleteDiabanbyId: async function deleteDiabanbyId(dm_db_id, callback) {
        diabanData.deleteDiabanbyId(dm_db_id, (data) => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            callback(data, 400);
        })
    },

    insertDiaban: async function insertDiaban(diaban, callback) {
        console.log('dia ban',diaban)
        if (1)
            
         {

            //if (await Validator.db.unique('duans', 'ns_id_qtda', duan.ns_id_qtda, 'Ns_id_qtda đã tồn tại !')){
                let firstInsert;
                firstInsert = diaban;
                diabanData.insertDiaban(firstInsert, (response) => {
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
    },
    updateDiaban: async function updateDiaban(diaban, callback) {
      
            if (1) {
                console.log("Day la update data", diaban)
                diabanData.updateDiaban(diaban, (res) => {
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : constant.errorUpdate
                    })
                })
          }
        
    }
    ,
    getcha:function getcha(data, callback){
        console.log("day la controller diaban cha")
        diabanData.getcha(data.cap,(data)=>{
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
        diabanData.search(limit,offset,textSearch,columnSearch, index, sortBy ,(data)=>{
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
module.exports = DiabanController;