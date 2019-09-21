var knex = require('./common/DB')
const uuidv4 = require('uuid/v4');
module.exports = {
    getHopdong: (limit, offset, callback) => {
        knex.raw("select * from several where who = 'nhuan' and status = '0' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'nhuan' and status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                    callback({
                        success: false
                    })
            })
    },
    getHopdong1: (limit, offset, callback) => {
        knex.raw("select * from several where who = 'phe' and status = '0' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'phe' and status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                    callback({
                        success: false
                    })
            })
    },
    getHopdong2: (limit, offset, callback) => {
        knex.raw("select * from several where who = 'hoai' and status = '0' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'hoai' and status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdong3: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'hoa' and status = '0' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'hoa' and status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdongAccept: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'nhuan' and status = '1' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'nhuan' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdongAccept1: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'phe' and status = '1' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'phe' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdongAccept2: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'hoai' and status = '1' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'hoai' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdongAccept3: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'hoa' and status = '1' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'hoa' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdongRefuse: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'nhuan' and status = '2' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'nhuan' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdongRefuse1: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'phe' and status = '2' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'phe' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdongRefuse2: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'hoai' and status = '2' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'hoai' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    getHopdongRefuse3: (limit, offset, callback) => {
        ////console.log('da vao .data cua approved');
        knex.raw("select * from several where who = 'hoa' and status = '2' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where who = 'hoa' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                several: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        ////console.log(err),
                            callback({
                                success: false
                            })
                    })
            })
            .catch((err) => {
                ////console.log(err),
                    callback({
                        success: false
                    })
            })
    },
    insertHopdong: function (hopdong, callback) {
        ////console.log('da vao .data');
        ////console.log(hopdong, 'hopdong');
    
        knex.raw("insert into several(name, registration_time, day_start, day_end, reason, who, id, status) values ( '"+hopdong.nguoiDangKy+"' , '"+hopdong.thoiGianDangKy+"' , '"+hopdong.ngayBatDau+"' , '"+hopdong.ngayKetThuc+"' , '"+hopdong.lyDo+"' , '"+hopdong.dangKy+"' , '"+uuidv4()+"' , '0')").then(res => {
            callback({ success: true });
        }).catch(err => {
            ////console.log(err,'err');   
            callback({ success: false })
        })
    },
    insertHopdong1: function (hopdong, callback) {
        knex.from('half').insert(hopdong).then(res => {
            callback({ success: true });
        }).catch(err => {
            ////console.log(err,'err');
            callback({ success: false })
        })
    },
    insertHopdong2: function (hopdong, callback) {
        knex.from('several').insert(hopdong).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err,'err');
            callback({ success: false })
        })
    },
    insertHopdong3: function (hopdong, callback) {
        knex.from('several').insert(hopdong).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err,'err');
            callback({ success: false })
        })
    },
    updateHopdong: function (hopdong, callback) {
        ////console.log(hopdong, 'hopdong');
            knex.raw("update several set status = '1' where id='"+hopdong.id+"'").then(res => {
                    callback({ success: true })
                }).catch(err => {
                    callback({ success: false })
                })      
    },
    updateHopdong1: function (hopdong, callback) {
        ////console.log(hopdong, 'hopdong');
            knex.raw("update several set status = '1' where id='"+hopdong.id+"'").then(res => {
                    callback({ success: true })
                }).catch(err => {
                    callback({ success: false })
                })      
    },
    updateHopdong2: function (hopdong, callback) {
        ////console.log(hopdong, 'hopdong');
            knex.raw("update several set status = '1' where id='"+hopdong.id+"'").then(res => {
                    callback({ success: true })
                }).catch(err => {
                    callback({ success: false })
                })      
    },
    updateHopdong3: function (hopdong, callback) {
        ////console.log(hopdong, 'hopdong');
            knex.raw("update several set status = '1' where id='"+hopdong.id+"'").then(res => {
                    callback({ success: true })
                }).catch(err => {
                    callback({ success: false })
                })      
    },
    updateHopdong4: function (hopdong, callback) {
        ////console.log(hopdong, 'hopdong');
            knex.raw("update several set status = '2' where id='"+hopdong.id+"'").then(res => {
                    callback({ success: true })
                }).catch(err => {
                    callback({ success: false })
                })      
    },
    updateHopdong5: function (hopdong, callback) {
        ////console.log(hopdong, 'hopdong');
            knex.raw("update several set status = '2' where id='"+hopdong.id+"'").then(res => {
                    callback({ success: true })
                }).catch(err => {
                    callback({ success: false })
                })      
    },
    updateHopdong6: function (hopdong, callback) {
        ////console.log(hopdong, 'hopdong');
            knex.raw("update several set status = '2' where id='"+hopdong.id+"'").then(res => {
                    callback({ success: true })
                }).catch(err => {
                    callback({ success: false })
                })      
    },
    updateHopdong7: function (hopdong, callback) {
        ////console.log(hopdong, 'hopdong');
            knex.raw("update several set status = '2' where id='"+hopdong.id+"'").then(res => {
                    callback({ success: true })
                }).catch(err => {
                    callback({ success: false })
                })      
    },
};
