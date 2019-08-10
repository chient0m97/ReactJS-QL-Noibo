var knex = require('./common/DB')
let pool = require('./connect')
module.exports = {
    getUser: (limit, offset,index, sortBy, callback) => {
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
        knex.from('users').where('id', Id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    insertUser: function (user, callback) {
        knex.from('users').insert(user).then(res => {
            console.log('inserted');
            callback({ success: true});
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    updateUser: function (user, callback) {
        knex.from('users').where('id', user.id)
        .update(user).then(res=>{
            callback({ success: true })
         }).catch(err=>{
            console.log(err)
            callback({ success: false })
         })
    },
    selectUser: function (user, callback) {
        knex.from('users').select('*').where('id', user.id).then(res=>{
            callback(res[0]);
        }).catch(err=>{
            console.log(err)
            callback({ success: false })
        })
    },
    getUserLogin: function (username, callback) {
        knex.from('users').select('password').where('name','=',username).then(res=>{
            callback(res[0]);
        }).catch(err=>{
            console.log(err, 'lỗi kết nối')
        })
    },
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
         knex('users').where(columnSearch,'like', '%'+textSearch+'%').orderBy(index,sortBy).limit(limit).offset(offset)
        .then(res=> {
            var users = res
            knex('users').where(columnSearch,'like', textSearch).count()
            .then(resCount=>{
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
            .catch((err)=>{
                console.log('lỗi  kết nối', err)
            })
        })
        .catch((err)=> {
            console.log('lỗi  kết nối', err)
        })
    },
};
