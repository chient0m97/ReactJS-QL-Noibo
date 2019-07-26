var knex = require('./common/DB')
let pool = require('./connect')
const uuidv1 = require('uuid/v1');
module.exports = {
    getUser: (limit, offset, index, sortBy, callback) => {
        knex.from('users').select('*').orderBy(index, sortBy).limit(limit).offset(offset)
            .then((res) => {
                var users = res
                knex('users').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                users: users,
                                count: resCount[0].count
                            }
                        })
                    }).catch((err) => {
                        console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    deleteUserbyId: function (Id, callback) {
        console.log('id ne', Id)
        knex.from('users').where('id', Id).del().then(res => {
            callback({ success: true });
            console.log('aaaaaaaa')
        }).catch(err => {
            console.log(err)
            
        })
    },
    insertUser: function (user, callback) {
        console.log('insert lan thu 1 ty')
        let abc = user;
        abc.id = uuidv1();
        knex.from('users').insert(abc).then(res => {
            console.log('inserted');
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    updateUser: function (user, callback) {
        console.log('upadteeeeeeeeeeeeee')
        knex.from('users').where('id', user.id)
            .update(user).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
    },
    selectUser: function (user, callback) {
        knex.from('users').select('*').where('id', user.id).then(res => {
            callback(res[0]);
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    getUserLogin: function (username, callback) {
        console.log('name:', username)
        knex('users').select('password').where('name', username).then(res => {
            console.log('result', res[0])
            callback(res[0])
        }).catch(err => {
            console.log(err)
        })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        knex('users').where(columnSearch, 'like', '%' + textSearch + '%').orderBy(index, sortBy).limit(limit).offset(offset)
            .then(res => {
                var users = res
                knex('users').where(columnSearch, 'like', textSearch).count()
                    .then(resCount => {
                        var count = resCount[0].count
                        let dataCallback = {
                            success: true,
                            message: 'Get data success',
                            data: {
                                users: users,
                                count: count
                            }
                        }
                        callback(dataCallback)
                    })
                    .catch((err) => {
                        console.log('lỗi  kết nối', err)
                    })
            })
            .catch((err) => {
                console.log('lỗi  kết nối', err)
            })
    },
    getClaims: function (username, callback) {
        pool.connect()
            .then(client => {
                query = "select pq_roles.name as role,pq_actions.name as action from pq_role_user_group left join users on users.code = pq_role_user_group.group_user_code left join pq_role_action on pq_role_action.id = pq_role_user_group.role_action_code left join pq_roles on pq_roles.id = pq_role_action.role_code left join pq_actions on pq_actions.id = pq_role_action.action_code where users.name ='" + username + "'"
                return client.query(query)
                    .then(res => {
                        console.log('data bay oi',res.rows)
                        callback(res.rows);
                    })
            })
            .catch(e => {
                client.release()
                console.log(e.stack)
            })
    }


};
