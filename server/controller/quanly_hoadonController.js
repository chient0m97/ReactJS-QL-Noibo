var Validator = require('../validate/common')
const quanly_hoadonsData = require('../data/quanly_hoadons')
const constant = require('./constant')

var quanly_hoadonsController = {

    getQuanly_hoadons: function getQuanly_hoadons(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        quanly_hoadonsData.getQuanly_hoadons(limit, offset, index, sortBy, function (data) {
            callback(data);
        })
    },

    insertQuanly_hoadons: function insertQuanly_hoadons(quanly_hoadons, callback) {
        quanly_hoadonsData.insertQuanly_hoadons(quanly_hoadons, (response) => {
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

    updateQuanly_hoadons: function updateQuanly_hoadons(quanly_hoadons, callback) {
        quanly_hoadonsData.updateQuanly_hoadons(quanly_hoadons, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : constant.errorUpdate
            })
        })
    },

    deleteQuanly_hoadonsById: async function deleteQuanly_hoadonsById(qlhd_sohoadon, callback) {
        quanly_hoadonsData.deleteQuanly_hoadons(qlhd_sohoadon, data => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
        })
    },

    getKhachHang(callback){
        quanly_hoadonsData.getKhachHang(function(data){
            callback(data);
        })
    },
}

module.exports = quanly_hoadonsController;