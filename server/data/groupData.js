var knex = require('./common/DB')
let pool = require('./connect')
const uuidv1 = require('uuid/v1');
module.exports = {
    getGroup: (limit, offset, index, sortBy, callback) => {
        knex.from('pq_groups').select('*').orderBy(index, sortBy).limit(limit).offset(offset)
            .then((res) => {

                var groups = res
                knex('pq_groups').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                groups: groups,
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
    deleteGroup: function (Id, callback) {
        console.log('id ne', Id)
        knex.from('users').where('name', Id).del().then(res => {
            callback({ success: true });

            console.log('aaaaaaaa')
        }).catch(err => {

            console.log(err)

        })
    },
    insertGroup: function (user, callback) {
        console.log('insert lan thu 1 ty')
        let abc = user;
        abc.id = uuidv1();
        knex.from('pq_groups').insert(abc).then(res => {

            console.log('inserted');
            callback({ success: true });
        }).catch(err => {

            console.log(err)
            callback({ success: false })
        })
    },
    updateGroup: function (user, callback) {
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
                query = "select pq_roles.name as role,pq_actions.name as action from pq_role_user_group left join pq_groups on pq_groups.name = pq_role_user_group.group_code left join pq_role_action on pq_role_action.id = pq_role_user_group.role_action_code left join pq_roles on pq_roles.id = pq_role_action.role_code left join pq_actions on pq_actions.id = pq_role_action.action_code where pq_groups.name ='" + username + "'"
                return client.query(query)
                    .then(res => {
                        console.log('response', res.rows)
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
            client.query("delete from pq_role_user_group where group_code ='" + per.user + "'").then(res1 => {
                per.a.map(function (value) {
                    let role = value.split('.')[0]
                    let action = value.split('.')[1]
                    if (role && action) {
                        client.query("select * from pq_role_action where role_code = (select id from pq_roles where name ='" + role + "' ) and action_code = (select id from pq_actions where name = '" + action + "')").then(res => {
                            console.log('-------------------------id----------------------', res.rows[0].id)

                            client.query("select user_code from pq_group_user where group_code ='" + per.user + "'").then(res2 => {
                                console.log('=-==-=-=-', res2.rows)
                                let memb = res2.rows;
                                for (j = 0; j < memb.length; j++) {
                                    let idra = res.rows[0].id
                                    let idgr = uuidv1();
                                    let querygr = "insert into pq_role_user_group(role_action_code,id,group_code,group_user_code) values('" + idra + "','" + idgr + "','" + per.user + "','" + memb[j].user_code + "')"
                                    client.query(querygr).then(res3 => {
                                        console.log('them moi thagnh cong')
                                    })
                                }

                            })

                        })
                    }

                })

            }).catch(err => {
                client.release()
                console.log(err)
                })
        })
    },



};
