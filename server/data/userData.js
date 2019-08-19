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
        knex.from('users').where('name', Id).del().then(res => {
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
    changePass: function (user, callback) {
        console.log('usserererwerwerwerwer', user)
        pool.connect().then(client => {
            let query = "update users set password='" + user.password + "' where name='" + user.username + "'"
            console.log('quẻyyyyyyyyyyyyyyyyyyyyyyyy', query)
            client.query(query).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
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

            console.log('result', res)
            callback(res[0])
        }).catch(err => {

            console.log('lỗi cmnr', err)
        })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        knex('users').where(columnSearch, 'like', '%' + textSearch + '%').orderBy(index, sortBy).limit(limit).offset(offset)
            .then(res => {
                var users = res
                knex('users').where(columnSearch, 'like', '%' + textSearch + '%').count()
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
                query = "select pq_roles.name as role,pq_actions.name as action from pq_role_user_group left join users on users.name = pq_role_user_group.group_user_code left join pq_role_action on pq_role_action.id = pq_role_user_group.role_action_code left join pq_roles on pq_roles.id = pq_role_action.role_code left join pq_actions on pq_actions.id = pq_role_action.action_code where users.name ='" + username + "'"
                return client.query(query)
                    .then(res => {

                        client.release()
                        let data = res.rows
                        callback({
                            success: true,
                            data: data,
                        })
                    }).catch(err => {
                        client.release()
                        console.log('lỗi con mẹ nó rồi em ey', err)
                        callback({
                            success: false
                        })
                    })

            })
            .catch(e => {
                client.release()
                console.log(e.stack)
            })
    },
    updateRole: function (per, callback) {
        console.log('user name', per.user)
        callback({ message: 'dcm' })
        pool.connect().then(client => {
            client.query("delete from pq_role_user_group where group_user_code ='" + per.user + "'").then(res1 => {
                per.a.map(function (value) {
                    let role = value.split('.')[0]
                    let action = value.split('.')[1]
                    if (role && action) {
                        let id_role_action = uuidv1()
                        client.query("insert into pq_role_action values((select id from pq_roles where name ='" + role + "' ),(select id from pq_actions where name = '" + action + "'),'" + id_role_action + "')").then(res1 => {
                            client.query("select * from pq_role_action where role_code = (select id from pq_roles where name ='" + role + "' ) and action_code = (select id from pq_actions where name = '" + action + "')").then(res => {
                                console.log('-------------------------id----------------------', res.rows)
                                let idra = res.rows[0].id
                                let idgr = uuidv1();
                                client.query("insert into pq_role_user_group values('" + per.user + "','" + idra + "','" + idgr + "')").then(res2 => {
                                    console.log('them moi thagnh cong')
                                })

                            })
                        })

                    }

                })
            })


        }).catch(err => {
            client.release()
            console.log(err)
        })
    },


};
