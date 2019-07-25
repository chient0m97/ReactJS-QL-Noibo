var knex = require('./common/DB')

module.exports = {
    getCustomer: (limit, offset,index, sortBy, callback) => {
        knex.from('khachhangs').select('*').orderBy(index, sortBy).limit(limit).offset(offset)
        .then((res) => {
            var customers = res
            knex('khachhangs').count()
            .then((resCount) => {
                callback({
                    success: true,
                    data: {
                        customers: customers,
                        count: resCount[0].count
                    }
                })
            })
            .catch((err) => {
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
    deleteCustomerbyId: function (Id, callback) {
        knex.from('khachhangs').where('kh_id', Id).del().then(res => {
            callback({ success:true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    insertCustomer: function (customer, callback){
    //     console.log('thêm mới',customer)
    //     knex.from('khachhangs').insert(customer).then(res => {
    //         console.log('inserted');
    //         callback({ success: true });
    //     }).catch(err => {
    //         console.log(err)
    //         callback({ success: false })
    //     })
    // },
    if (knex.from('khachhangs').insert(customer).then(res => {
        console.log('inserted');
        callback({ success: true });
    }).catch(err => {
        console.log(err)
        callback({ success: false })
    })) {
        return true;
    }
    else {
        knex.withRecursive('donvis', (qb) => {
            qb.select('*').from('khachhangs').where('kh_id', 1).union((qb) => {
                qb.select('*').from('khachhangs').join('donvis', 'dm_dv_id', 'kh_id')
            })
        }).select('*').from('donvis')
    }
    },

    updateCustomer: function (customer, callback) {
        knex.from('khachhangs').where('kh_id', customer.kh_id)
        .update(customer).then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    selectUnit: function (customer, callback) {
        knex.from('khachhangs').select('*').where('kh_id', customer.kh_id).then(res => {
            callback(res[0]);

        }).catch(err => {
            console.log('đây là select', err)
            callback({ success: false})
        })
    },

    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        console.log('chip chip')
        console.log('================',limit)
        knex('khachhangs').where(columnSearch,'like','%'+textSearch+'%').orderBy(index,sortBy).limit(limit).offset(offset)
        .then(res=> {
            var customers = res
            console.log('unit',customers)
            knex('khachhangs').where(columnSearch,'like','%'+textSearch+'%').count()
            .then(resCount=>{
                var count = resCount[0].count

                let dataCallback = {
                    success: true,
                    message: 'Get data success',
                    data: {
                        customers: customers,
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
    // getcha:function(callback){
    //     knex('donvis').select('dm_dv_id_cha').then(res=>{
    //         callback(res);
    //     })
    // }
};