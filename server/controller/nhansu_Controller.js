var Validator = require('../validate/common')
const nhansuData = require('../data/nhansu_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');

var nhansuController = {

    getNhansu: function getNhansu(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        nhansuData.getNhansu(limit, offset, index, sortBy, function(data){
            callback(data);
        })
    },

    insertNhansu: async function insertNhansu(nhansu, callback) {
        console.log('Controller : ', uuidv1())
        nhansu.ns_id=uuidv1();
        nhansu.ns_sodienthoai+="0";
        //nhansu.data.ns_id=uuidv1;g
        console.log('console :', nhansu)
        if ( nhansu.ns_email===undefined|| Validator.isMail(nhansu.ns_email, 'Email không đúng định dạng')
        ) {

            if (await Validator.db.unique('nhansu','ns_dinhdanhcanhan',nhansu.ns_dinhdanhcanhan, 'Định danh cá nhân đã tồn tại !')
                & await Validator.db.unique('nhansu', 'ns_sodienthoai', nhansu.ns_sodienthoai, 'Số điện thoại đã tồn tại !')
                & await Validator.db.unique('nhansu', 'ns_email', nhansu.ns_email, 'Email đã tồn tại !')) {
                    nhansuData.insertNhansu(nhansu, (response) => {
                        var message = constant.successInsert;
                        var status = 200;
                        if(!response.success) {
                            Validator.error.push(constant.errorSys)
                            message = Validator.getError();
                            status = 400
                        }
                        callback({
                            message: message,
                            success: response.success
                        }, status);
                    });
                } else {
                    callback({
                        message: Validator.getError(),
                        success: false
                    }, 400);
                }
        } else {
            callback({
                message:Validator.getError(),
                success: false
            },400);
        }
    },

    updateNhansu: function updateNhansu(nhansu, callback){
        console.log(nhansu, 'day la nhan su')
        
        if (Validator.isMail(nhansu.ns_email, 'Email không đúng định dạng'))
        {
            if (1){
                nhansuData.updateNhansu(nhansu, (res) => {
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : constant.errorUpdate
                    })
                })
            }
        }
    },

    deleteNhansuById: async function deleteNhansuById(ns_id, callback) {
        nhansuData.deleteNhansuById(ns_id, data => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            callbackI(data, 400);
        })
    },

    getDataSearch: function getDataSearch(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        nhansuData.getDataSearch(limit,offset,textSearch,columnSearch,index,sortBy, data => {
            callback(data);
        })
    },

    getById: function getById(ns_id, callback) {
        nhansuData.getById(ns_id, data => {
            if(data == undefined) {
                callback({});
            }
            callback(data);
        });
    },

    validateCreate: (req, res, next) => {
        next();
    }
}

module.exports = nhansuController;