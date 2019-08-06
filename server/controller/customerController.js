var Validator = require('../validate/common')
const customerData = require('../data/customer.data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');
var CustomerController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */
    getCustomer: function getCustomer(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        var res_customer = []
        customerData.getCustomer(limit, offset, index, sortBy, async (data) => {
            console.log('dataaaa', data)
            await data.data.customers.map((value, index) => {

                switch (value.kh_lienlac) {
                    case 'DD':
                        value.kh_lienlac_txt = 'Đại diện'
                        break;
                    case 'DM':
                        value.kh_lienlac_txt = 'Đầu mối liên lạc'
                        break;
                    case 'TXLL':
                        value.kh_lienlac_txt = 'Thường xuyên lien lạc'
                        break;
                }
                // switch (value.kh_gioitinh) {
                //     case 'Nam':
                //         value.kh_gioitinh = 'Nam'
                //         break;
                //     case 'Nữ':
                //         value.kh_gioitinh = 'Nữ'
                //         break;
                //     case 'Khác':
                //         value.kh_gioitinh = 'Khác'
                //         break;
                // }    

                res_customer.push(value)
            })
            console.log(res_customer, 'data')
            data.data.customers = res_customer
            callback(data);
        });
    },
    /**
    * Get user by Id.
    * @param {Number} Id The identify of user
    */

    // getcha: function getcha(callback) {
    //     unitData.getcha((data)=>{
    //         callback(data)
    //     })
    // },


    GetById: function GetById(Id, callback) {
        customerData.GetById(Id, (data) => {
            console.log('DATA', data)
            if (data == undefined) {
                callback({});
            }
            callback(data);
        })
    },

    getTinh: function getTinh(callback) {
        customerData.getTinh((data) => {
            console.log('data', data)
            callback(data)
        })
    },

    getHuyen: function getHuyeb(body, callback) {
        customerData.getHuyen(body.id_db_tinh, (data) => {
            console.log('data huyennnn', data)
            callback(data)
        })
    },

    getXa: function getXa(data, callback) {
        customerData.getXa(data.id_db_huyen, (data) => {
            console.log('data xaaaaa', data)
            callback(data)
        })
    },

    getDonvi: function getDonvi(callback) {
        customerData.getDonvi((data) => {
            console.log('day la donvi')
            callback(data)
        })
    },

    DeleteCustomerbyId: async function deleteCustomerbyId(Id, callback) {
        customerData.deleteCustomerbyId(Id, (data) => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            callback(data, 400);
        })
    },

    insertDonvi: function insertDonvi(donvi, callback) {
        customerData.insertDonvi(donvi, (response) => {
            console.log("hien thi controller ", response)
            var message = constant.successInseart;
            var status = 200;
            if (!response.success) {
                Validator.error.push(constant.errorSys)
                message = Validator.getError()
            }
            callback({
                message: message,
                success: response.success
            }, status);
        })
    },

    insertCustomer: async function insertCustomer(customer, callback) {
        customer.kh_id = uuidv1();

        customer.dm_db_id_tinh = customer.dm_db_id_tinh_customer
        customer.dm_db_id_huyen = customer.dm_db_id_huyen_customer
        customer.dm_db_id_xa = customer.dm_db_id_xa_customer
        delete customer.dm_db_id_huyen_customer
        delete customer.dm_db_id_tinh_customer
        delete customer.dm_db_id_xa_customer
        console.log(customer, 'customer custom')
        if (Validator.isInt(customer.kh_sodienthoai, 'Số điện thoại không đúng định dạng !!')
            // & Validator.Name(customer.kh_ho, 'Họ không đúng định dạng !!')
            // & Validator.Name(customer.kh_tenlot, 'Tên lót không đúng định dạng !!')
            // & Validator.Name(customer.kh_ten, 'Tên không đúng định dạng !!')
            // & Validator.isMail(customer.kh_email, 'Email không đúng định dạng !!')
        ) {
            if (
                await Validator.db.unique('khachhangs', 'kh_email', customer.kh_email, 'Email khách hàng này đã tồn tại !!')
                & await Validator.db.unique('khachhangs', 'kh_sodienthoai', customer.kh_sodienthoai, 'Số điện thoại khách hàng này đã tồn tại !!')
            ) {
                console.log('đã validate')
                customerData.insertCustomer(customer, (response) => {
                    var message = constant.successInseart;
                    var status = 200;
                    if (!response.success) {
                        Validator.error.push(constant.errorSys)
                        message = Validator.getError()
                        status = 400
                    }
                    callback({
                        message: message,
                        success: response.success,
                        id_customer: customer.kh_id
                    }, status);
                })
            }
            else {
                var eror = Validator.getError()
                console.log('lỗi trả về', eror)
                callback({
                    message: eror,
                    success: false
                }, 400);
            }
        }
    },

    insertDonvi: function insertDonvi(donvi, callback) {
        customerData.insertDonvi(donvi, (response) => {
            console.log("hien thi controller ", response)
            var message = constant.successInseart;
            var status = 200;
            if (!response.success) {
                Validator.error.push(constant.errorSys)
                message = Validator.getError()
            }
            callback({
                message: message,
                success: response.success
            }, status);
        })
    },

    updateCustomer: function updateCustomer(customer, callback) {
        customer.forEach(element => {
            element.dm_dv_id_tinh = element.dm_dv_id_tinh_customer
            element.dm_dv_id_huyen = element.dm_dv_id_huyen_customer
            element.dm_dv_id_xa = element.dm_dv_id_xa_customer
        });
        customerData.updateCustomer(customer, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : callback.errorUpdate
            })
        })
    },
    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        customerData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            console.log(limit)
            console.log(offset)

            console.log('aaaaaaaaa', data)
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next()
    },
}
module.exports = CustomerController;