

var Validator = require('../../validate/common')
const role_actionData = require('../../data/role_actionData')
const constant = require('../constant')
var UserController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */

    getRole: function getRole(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        role_actionData.getRole(limit, offset, index, sortBy, (data) => {
            callback(data);
        }
        );
    },


    deleteRole: async function deleteRole(Id, callback) {
        console.log("----delete controller------", Id)
        role_actionData.deleteRole(Id, (data) => {

            callback(data)



        })
    },

    insertRoleAction: async function insertRoleAction(roles, callback) {
        console.log('-----------controler------------')
        role_actionData.uniqueRole(roles, (data) => {
            console.log('dataaaaaaaaaaa', data)
            if (data.length > 0) {
                console.log('ton tai roi nhoc')
                callback({ success: false, message: 'da ton tai ' })

            } else {

                role_actionData.insertRoleAction(roles, (data) => {
                    callback(data)
                })
            }
        })



    },
    updateRoleAction: function updateRoleAction(user, callback) {
        if (Validator.isMail(user.email, 'Email không đúng định dạng')
            & Validator.isNumAlpha(user.name, 'Tên đăng nhập không đúng định dạng')
            & Validator.isPass(user.password, 'Mật khẩu không đúng định dạng')
        ) {

            role_actionData.updateRole(user, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? constant.successUpdate : constant.errorUpdate
                })
            })

        }
    }
    ,

    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        role_actionData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            callback(data);
        })
    },
    getRoleCode: function getRoleCode(callback) {
        role_actionData.getRoleCode((data) => {
            callback(data)
        })
    },
    getRoleAction: function getRoleAction(callback) {
        role_actionData.getRoleAction((data) => {
            callback(data)
        })
    },
    insertRole: function insertRole(name, des, callback) {
        role_actionData.insertRole(name, des, (data) => {
            callback(data);
        })
    },
    insertAction: function insertAction(name, callback) {
        role_actionData.insertAction(name, (data) => {
            callback(data);
        })
    }




}
module.exports = UserController;