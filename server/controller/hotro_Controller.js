var Validator = require('../validate/common')
const hotroData = require('../data/hotro_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');

var hotroController = {

    getHotro: function getHotro(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hotroData.getHotro(limit, offset, index, sortBy, function (data) {
            callback(data);
        })
    },

    insertHotro: async function insertHotro(hotros, callback) {
        hotros.ht_id = uuidv1();
        hotroData.insertHotro(hotros, (response) => {
            var message = constant.successInsert;
            var status = 200;
            if (!response.success) {
                Validator.error.push(constant.errorSys)
                message = Validator.getError();
                status = 400
            }
            callback({
                message: message,
                success: response.success
            }, status);
        });
    },

    updateHotro: function updateHotro(hotros, callback) {
        hotroData.updateHotro(hotros, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : constant.errorUpdate
            })
        })
    },

    deleteHotroById: async function deleteHotroById(ht_id, callback) {
        hotroData.deleteHotro(ht_id, data => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
        })
    },

    getDataMyself: function getDataMyself(myself, callback){
        hotroData.getDataMyself(myself,(data)=>{
            callback(data);
        })
    },

    getIdDuan(callback){
        hotroData.getIdDuan(function(data){
            callback(data);
        })
    },

    getNhanSu(callback){
        hotroData.getNhanSu(function(data){
            callback(data);
        })
    },

    getKhachHang(callback){
        hotroData.getKhachHang(function(data){
            callback(data);
        })
    },

    getDataSearch: function getDataSearch(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hotroData.getDataSearch(limit, offset, textSearch, columnSearch, index, sortBy, data => {
            callback(data);
        })
    },

    getHotroFollowMonth: function getHotroFollowMonth(monthToMonth, callback) {
        hotroData.getHotroFollowMonth(monthToMonth, data => {
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    },

    validateCreate: (req, res, next) => {
        next();
    }
}

module.exports = hotroController;