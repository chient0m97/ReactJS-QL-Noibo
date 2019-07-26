var Validator = require('../../validate/common')
const userData = require('../../data/userData')
const constant = require('../constant')
const bcrypt = require('bcryptjs');


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

    getUser: function getUser(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        userData.getUser(limit, offset, index, sortBy, (data) => {
            callback(data);
        }
        );
    },
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
    GetById: function GetById(Id, callback) {
        userData.GetById(Id, (data) => {
            console.log('DATA', data)
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    },

    DeleteUserbyId: async function deleteUserbyId(Id, callback) {
        userData.deleteUserbyId(Id, (data) => {
            console.log('erioertioertioerhiotero', data.success)
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            else {
                callback(data, 400);

            }
        })
    },

    insertUser: function insertUser(user, callback) {
        console.log('hash password', user.password)
        bcrypt.hash(user.password, 10, function (err, hash) {
            user.password = hash;
            userData.insertUser(user, (response) => {
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
        });
    },
    updateUser: function updateUser(user, callback) {
        console.log('controller')
        if (Validator.isMail(user.email, 'Email không đúng định dạng')
            & Validator.isNumAlpha(user.name, 'Tên đăng nhập không đúng định dạng')
            & Validator.isPass(user.password, 'Mật khẩu không đúng định dạng')
        ) {
            console.log('go to db')
            bcrypt.hash(user.password, 10, function (err, hash) {
                user.password = hash;
                userData.updateUser(user, (res) => {
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : constant.errorUpdate
                    })
                })
            });


        }
    },
    Login: function getUserLogin(userName, callback) {
        userData.getUserLogin(userName, (data) => {
            if (data) {
                this.getClaimsByUser(userName, (cls) => {
                    data.claims = cls;
                    console.log('claim', cls)
                    callback(data);
                })
            }
            else {
                callback(data)

            }

        })

    },
    getClaimsByUser: (userName, callback) => {
        userData.getClaims(userName, (data) => {
            console.log('tra ve data', data)
            console.log('qweqweqweqweqeqwe', data.length)
            if (data.length > 0) {
                var data = data.map(function (value) {
                    return value.role + '.' + value.action

                });
                callback(data)
            }
            else {
                console.log('readdddd')
                let data = ['USER.READ']
                callback(data)
            }
        })

    },

    getClaimsByGroupUser: (groupUserName, callback) => {
        let data = [
            "USER.READ",
            "USER.EDIT",
            "USER.DELETE"
        ]
        if (groupUserName == 'dev') {
            callback(data)
        } else {
            data = [
                "USER.READ"
            ];
            callback(data);
        }
    },
    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        console.log('dm')
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        userData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            console.log('aaaaaaaaa', data)
            callback(data);
        })
    },
    ss: function ss(callback) {
        userData.ss((data) => {
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next()
    },

}
module.exports = UserController;