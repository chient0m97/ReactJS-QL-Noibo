var Validator = require('../../validate/common')
const userData = require('../../data/userData')
const constant = require('../constant')
const bcrypt = require('bcryptjs');
const pool = require('../../data/connect')

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
            console.log(hash, 'hash')
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
        bcrypt.hash(user.password, 10, function (err, hash) {
            user.password = hash;
            userData.updateUser(user, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? constant.successUpdate : constant.errorUpdate
                })
            })
        });


    },
    changePass: function changePass(user, callback) {
        console.log('controller',user)
        bcrypt.hash(user.password, 10, function (err, hash) {
            user.password = hash;
            userData.changePass(user, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? constant.successUpdate : constant.errorUpdate
                })
            })
        });


    },
    Login: function getUserLogin(userName, callback) {
        userData.getUserLogin(userName, (data) => {
            let f = data.fullname
            if (data) {
                console.log('data===========================', f)
                console.log('vao get claim')
                this.getClaimsByUser(userName, (cls) => {
                    data.claims = cls;
                    data.fullname = f;
                    callback(data);
                })
            }
            else {
                callback(data)

            }

        })

    },
    getClaimsByUser: (userName, callback) => {
        console.log('dấdaddasdasdsa')
        userData.getClaims(userName, (data) => {
            console.log('đaataa',data)
            if (data.data.length > 0) {
                var data = data.data.map(function (value) {
                    return value.role + '.' + value.action
                });
                callback(data)
            }
            else {
                console.log('readdddd')
                callback(data.data)
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

    setPermission: function (permiss, callback) {
        userData.updateRole(permiss, (data) => {
            console.log(data)
        })
        console.log('perrrrrrrrrrrrrrrrrrrrrrrrr', permiss)
        //    let per =  permiss.map(function (value) {
        //         return value = { role: value.split('.')[0], action: value.split('.')[1] }
        //     })
        //     callback(per)
    },
    validateCreate: (req, res, next) => {
        next()
    },

}
module.exports = UserController;