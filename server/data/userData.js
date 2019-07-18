var knex = require('./common/DB')
let pool = require('./connect')
const uuidv1 = require('uuid/v1');
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
        let abc = user;
        abc.id=uuidv1();
        knex.from('users').insert(abc).then(res => {
            console.log('inserted');
            callback({ success: true});
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    updateUser: function (user, callback) {
        console.log('upadteeeeeeeeeeeeee')
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
        knex.from('users').select('password','code').where('name','=',username).then(res=>{
            console.log('password code',res)
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
    ss:function(callback){
        knex('nhansu').select('ns_id').then(res=>{
            callback(res);
        })
    }
};
