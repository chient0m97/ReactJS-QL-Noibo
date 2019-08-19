var knex = require('./common/DB')

module.exports = {
    getCustomer: (limit, offset,index, sortBy, callback) => {
        knex.raw("select *, khs.iddv as dm_dv_id, khs.tendv as tendonvi, dibtinh.idtinh as dm_db_id_tinh ,dibtinh.tentinh as tentinh , dibhuyen.idhuyen as dm_db_id_huyen ,dibhuyen.tenhuyen as tenhuyen , dibxa.idxa as dm_db_id_xa ,dibxa.tenxa as tenxa from khachhangs kh left join(select dbs.dm_db_id idtinh, dbs.dm_db_ten as tentinh from diabans dbs) as dibtinh on dibtinh.idtinh = kh.dm_db_id_tinh left join(select dbs.dm_db_id idhuyen, dbs.dm_db_ten as tenhuyen from diabans dbs) as dibhuyen on dibhuyen.idhuyen = kh.dm_db_id_huyen left join(select dbs.dm_db_id idxa, dbs.dm_db_ten as tenxa from diabans dbs) as dibxa on dibxa.idxa = kh.dm_db_id_xa left join (select dvs.dm_dv_id iddv, dvs.dm_dv_ten tendv from donvis dvs) as khs on khs.iddv = kh.dm_dv_id   order by " + ' ' + index + ' ' + sortBy + ' limit ' + limit + ' offset ' + offset)
        .then((res) => {
            var customers = res.rows
            console.log('ưbfuq',customers)
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
    deleteCustomerbyId: function (kh_id, callback) {
        knex.from('khachhangs').whereIn('kh_id', kh_id).del().then(res => {
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
    console.log("day la tang data ", customer)
    if (knex.from('khachhangs').insert(customer).then(res => {
        console.log('inserted');
        callback({ success: true });
    }).catch(err => {
        console.log(err)
        callback({ success: false })
    })) {
        return true;
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

    getTinh: function (callback) {
        knex.from('diabans').select('*').where('dm_db_cap', 1)
            .then((res) => {
                console.log('data', res)
                callback(res);
            })
    },
    getHuyen: function (id_db_tinh, callback) {
        console.log('day la id tinh', id_db_tinh)
        knex.raw('select dm_db_id , dm_db_ten from diabans where dm_db_id_cha = ' + id_db_tinh)
            .then((res) => {
                console.log('data row', res.rows)
                callback(res.rows);
            })
    },
    getXa: function (data, callback) {
        console.log('dcm id  huyen', data)
        knex.raw('select dm_db_id, dm_db_ten from diabans where dm_db_id_cha = ' + data)
        // console.log('dcm xa',data)
            .then((res) => {
                console.log('data xa', res.rows)
                callback(res.rows);
            })
    },
    
    // getDonvicha : function (callback){
    //     knex.raw('select dm_dv_id, dm_dv_ten as tendonvicha from donvis where dm_dv_id_cha = ' +data)
    //     .then((res) => {
    //         callback(res.rows);
    //     })
    // },

    getDonvi : function (callback) {
        knex.raw('select dm_dv_id, dm_dv_ten as tendonvi from donvis khs')
        .then((res) => {
            console.log('data dv',res)
            callback(res.rows);
        })
    },

    insertDonvi : function (donvi, callback){
        console.log("hien thi tang insert ",donvi)
        knex.from('donvis').insert(donvi).then(res => {
            console.log('inserted============= ',donvi);
            callback({ success: true });
        }).catch(err => {
            console.log(err, 'lỗi  insert' )
            callback({ success: false })
        })    
    }



};