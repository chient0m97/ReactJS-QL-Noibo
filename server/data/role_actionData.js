var knex = require('./common/DB')
let pool = require('./connect')
const uuidv1 = require('uuid/v1');
module.exports = {
    getRole: (limit, offset, index, sortBy, callback) => {
        pool.connect().then(client => {
            client.query("select pq_role_action.id, pq_roles.name as role ,pq_actions.name as action from pq_role_action inner join pq_roles on pq_roles.id = pq_role_action.role_code inner join pq_actions on pq_actions.id = pq_role_action.action_code order by pq_role_action." + index + " " + sortBy + " limit " + limit + " offset " + offset + " ")
                .then(res => {
                    let roles = res.rows
                    client.query("select count(*) from pq_role_action").then(res1 => {
                        console.log(res1.rows[0].count)
                        let data = {
                            roles: roles,
                            success: true,
                            count: res1.rows[0].count
                        }

                        callback(data)
                    })
                })
        }).catch(err => {
            console.log('loi cmnr', err)
        })
    },
    deleteRole: function (Id, callback) {
        console.log('------delete query-------', Id)
        pool.connect().then(client => {
            let query ="delete from pq_role_action where id='" + Id + "'"
            console.log(query)
            client.query(query).then(res => {
                callback({ success: true,message:'xoa' });
            })
        }).catch(err => {
            console.log(err, 'loi cmnr')
            callback({ success: false })
        })

    },
    insertRoleAction: function (roles, callback) {
        let id = uuidv1()
        pool.connect().then(client => {
            client.query("insert into pq_role_action values((select id from pq_roles where name='" + roles.role + "'),(select id from pq_actions where name='" + roles.action + "'),'" + id + "')").then(res => {
                callback({ success: true, message: 'insert thanh cong' })
            })
        }).catch(err => {
            console.log('loi cmmr', err)
        })


    },
    updateRoleAction: function (user, callback) {
        knex.from('users').where('id', user.id)
            .update(user).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
    },


    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        pool.connect()
            .then(client => {
                query = "SELECT * FROM users WHERE " + columnSearch + " LIKE '%" + textSearch + "%'  ORDER BY " + index + " " + sortBy + " LIMIT " + limit + " OFFSET " + offset
                console.log('aaaaaaaaaaaa', query)
                return client.query(query)
                    .then(res => {
                        let users = res.rows;
                        console.log('uuuuuuuuuuuuuu', users)
                        client.query("SELECT count(*) as count FROM users WHERE " + columnSearch + " LIKE '%" + textSearch + "%'  ").then(res2 => {
                            client.release();
                            let count = res2.rows[0].count;
                            //callback to controller:
                            let dataCallback = {
                                success: true,
                                message: 'Get data success',
                                data: {
                                    users: users,
                                    count: count
                                }
                            };
                            callback(dataCallback)
                            console.log('---datacallback-------', dataCallback)

                        })
                    })
                    .catch(e => {
                        client.release()
                        console.log(e.stack)
                    })
            })
    },
    getRoleCode: function (callback) {
        pool.connect().then(client => {
            client.query("select * from pq_roles").then(res => {
                console.log('get role code data')
                console.log(res.rows)
                callback({ success: true, data: res.rows })
            })
        }).catch(err => {
            console.log(err)
        })
    },
    getRoleAction: function (callback) {
        pool.connect().then(client => {
            client.query("select * from pq_actions").then(res => {
                console.log(res.rows)
                callback({ success: true, data: res.rows })
            })
        }).catch(err => {
            console.log(err)
        })
    },
    insertRole: function (name, des, callback) {
        let id = uuidv1();
        pool.connect().then(client => {
            client.query("insert into pq_roles values('" + name + "','" + des + "','" + id + "')").then(res => {
                console.log(res)
                callback({ success: true, message: 'insert thanh cong' })
            })
        }).catch(err => {
            console.log('loi cmnr', err)
        })
    },
    insertAction: function (name, callback) {
        console.log('ddddddddddddddddddddd', name)
        let id = uuidv1();
        pool.connect().then(client => {
            client.query("insert into pq_actions values('" + name + "','" + id + "')").then(res => {
                console.log(res)
                callback({ success: true, message: 'insert thanh cong' })
            })
        }).catch(err => {
            console.log('loi cmnr', err)
        })
    },
    uniqueRole: function (roles, callback) {
        console.log('---------data-----------------', roles)
        pool.connect().then(client => {
            client.query("select * from pq_role_action where role_code=(select id from pq_roles where name='" + roles.role + "') and action_code=(select id from pq_actions where name='" + roles.action + "')").then(res => {
                console.log('ressssssssssssssssss', res.rows)
                callback(res.rows)
            })
        }).catch(err => {
            console.log(err)
        })
    }
};
