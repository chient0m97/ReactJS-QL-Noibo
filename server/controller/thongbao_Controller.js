var Validator = require('../validate/common')
const thongbaoData = require('../data/thongbao_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');
var thongbaoController = {

    getThongbao: function getThongbao(tb_ns_id, callback) {
        // let limit = pageSize;
        // let offset = pageSize * (pageNumber - 1);
        thongbaoData.getThongbao(tb_ns_id,function (data) {
            callback(data);
        })
    },

    insertThongbao: function insertThongbao(thongbao, callback) {
        // console.log("day la binh luan ", thongbao)
        thongbao.tb_id = uuidv1();
        thongbaoData.insertThongbao(thongbao, (response) => {
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
    }
}

module.exports = thongbaoController;