var knex = require('./common/DB')
let pool = require('./connect')
const uuidv1 = require('uuid/v1');
module.exports = {
    getUser: (limit, offset, gr, callback) => {
        pool.connect().then(client => {
            client.query("select * from users left join pq_group_user on pq_group_user.user_code = users.name where pq_group_user.group_code = '" + gr + "' limit " + limit + " offset " + offset).then(res => {
                let users = res.rows
                client.query("select count(*) from users left join pq_group_user on pq_group_user.user_code = users.name where pq_group_user.group_code = '" + gr + "' limit " + limit + " offset " + offset).then(res1 => {
                    client.release()
                    callback({
                        success: true,
                        data: {
                            users: users,
                            count: res1.rows[0].count
                        }
                    })
                }).catch(err => {
                    client.release()
                    console.log('lỗi cmnr', err)
                })

            })
        }).catch(err => {
            client.release()
            console.log('lỗi cmnr', err)
        })
    },
    getList: function (limit, offset, groupName, callback) {
        pool.connect().then(client => {
            client.query("select name from users where name not in (select user_code from pq_group_user where group_code='" + groupName + "') ").then(res => {
                client.release()
                callback(res.rows)
            }).catch(err => {
                client.release()
                console.log('lỗi rồi em ey!!!!!', err)
            })

        }).catch(err => {
            client.release()
            console.log('lỗi cmnr', err)
        })
    },
    deleteUser: function (listmem, groupName, callback) {
        pool.connect().then(client => {
            for (i = 0; i < listmem.length; i++) {
                let query = "delete from pq_group_user where group_code = '" + groupName + "' and user_code='" + listmem[i] + "'"
                console.log('queryyyyyyyyyyyyyy', query)
                client.query(query).then(res => {
                    client.query("delete from pq_role_user_group where group_code = '" + groupName + "' and user_code='" + listmem[i] + "' ").then(res1 => {
                        console.log('xoa thanh cong')
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
            client.release()
            callback({ success: true })
        }).catch(err => {
            console.log(err)
            client.release()
            callback({ success: false })
        })
    },
    addUser: function (user, groupName, callback) {
        pool.connect().then(client => {
            for (i = 0; i < user.length; i++) {
                let id = uuidv1();

                let query = "insert into pq_group_user values('" + groupName + "','" + user[i] + "','" + id + "')"
                client.query(query).then(res => {

                }).catch(err => {
                    console.log(err)
                })
            }
            client.release()
            callback({ success: true, message: 'thêm mới thành công' })
        }).catch(err => {

            callback({ success: false })
        })
    },







};
