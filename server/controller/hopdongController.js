
var multer = require('multer')
var Validator = require('../validate/common')
const hopdongData = require('../data/hopdong.data')
const constant = require('./constant')
const uuidv4 = require('uuid/v4');
var HopdongController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @param
     */

    getHopdong: function getHopdong(pageNumber, pageSize,index, sortBy, callback){
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hopdongData.getHopdong(limit, offset,index, sortBy, (data) => {
            callback(data);
        });
    },
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
    GetById: function GetById(Id, callback) {
        hopdongData.GetById(Id, (data) => {
            //console.log('DATA', data)
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    },

    DeleteHopdongbyId: async function deleteHopdongbyId(Id, callback) {
        hopdongData.deleteHopdongbyId(Id, (data) => {

            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            callback(data, 400);
        })
    },

    insertHopdong: async function insertHopdong(hopdong, callback) {
        // var listfile = hopdong.hd_files.fileList
        // console.log(listfile, 'file list')
        // listfile.map((value, index)=> {
        //    var z = window.atob(value)
        //    console.log(z, 'abcd')
        // })
        // var storage = multer.diskStorage({
        //     destination: function(req, file, cb){
        //       cb(null, './upload')
        //     },
        //     filename: function(req, file, cb){
        //       cb(null, file.originalname)
        //     }
        //   })
        //   var upload = multer({storage:storage})
        // if (Validator.isDate(hopdong.hd_ngayketthuc, 'Ngày kết thúc không đúng định dạng')
        //     & Validator.isDate(hopdong.hd_ngayky, 'Ngày ký không đúng định dạng')
        //     & Validator.isDate(hopdong.hd_ngaythanhly, 'Ngày thanh lý không đúng định dạng')
        //     & Validator.isDate(hopdong.hd_ngayxuathoadon, 'Ngày xuất hóa đơn không đúng định dạng')
        //     & Validator.isDate(hopdong.hd_ngaythanhtoan, 'Ngày thanh toán không đúng định dạng')
        //     & 
            if(1
            //Validator.isNum(hopdong.hd_thoigianthuchien, 'Thời gian thực hiện không đúng định dạng')
            //& Validator.isNum(hopdong.dm_duan_id, 'Dự án id không đúng định dạng')
            //& 
            // Validator.isAlpha(hopdong.hd_loai, 'Loại hợp đồng không đúng định dạng')
            // & Validator.isAlpha(hopdong.hd_trangthai, 'Trạng thái không đúng định dạng')
            
        ) {

            if (1
                //await Validator.db.unique('hopdongs', 'hd_so', hopdong.hd_so, 'Số hợp đồng đã tồn tại !'
                ) 
            {
                //console.log('ddax validate')
                
                let firtInsert;
                firtInsert = hopdong;
                //firtInsert.hd_so = 'Toi la chien: ' + firtInsert.hd_so;
                firtInsert.hd_id = uuidv4();

                    hopdongData.insertHopdong(firtInsert, (response) => {
                    var message = constant.successInsert;
                    var status = 200;
                    if (!response.success) {
                        Validator.error.push(constant.errorSys)
                        message = Validator.getError()
                        status = 400
                    }
                    callback({
                        message: message,
                        success: response.success
                    }, status);
                })
            } else {
                callback({
                    message: Validator.getError(),
                    success: false
                }, 400);
            }

        } else {
            var eror =  Validator.getError()
                //console.log('looix tra ve', eror)
            callback({
                message: eror,
                success: false
            }, 400);
        }
    },
    UpdateHopdong: async function updateHopdong(hopdong, callback) {
    //     if (
    //     Validator.isNum(hopdong.hd_thoigianthuchien, 'Thời gian thực hiện không đúng định dạng')
    //     & Validator.isNum(hopdong.dm_duan_id, 'Dự án id không đúng định dạng')
    //     & Validator.isAlpha(hopdong.hd_loai, 'Loại hợp đồng không đúng định dạng')
    //     & Validator.isAlpha(hopdong.hd_trangthai, 'Trạng thái không đúng định dạng')  
    //  ) {
             if (1) {
                 //console.log('hopdongController')
                hopdongData.updateHopdong(hopdong, (res) => {
                    //console.log('hopdongController')
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : constant.errorUpdate
                    })
                })
           }
        //}
    },
//     Login: function getUserLogin(userName, callback) {
//         hopdongData.getUserLogin(userName, (data) => {

//             callback(data);
//         })
//     },
getcha: function getcha(callback){
    hopdongData.getcha((data)=>{
        callback(data)
    })
},
getdonvi: function getdonvi(callback){
    hopdongData.getdonvi((data)=>{
        callback(data)
    })
},
getkhachhang: function getkhachhang(callback){
    hopdongData.getkhachhang((data)=>{
        callback(data)
    })
},
getduan: function getduan(callback){
    hopdongData.getduan((data)=>{
        callback(data)
    })
},

getinsertduan: function getinsertduan(callback){
    hopdongData.getinsertduan((data)=>{
        callback(data)
    })
},
getupload: function getupload(callback){
    // hopdongData.getupload((data)=>{
    //     callback(data)
    // })
        
},
    search: function search( pageSize,pageNumber,textSearch, columnSearch,index,sortBy,callback){
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hopdongData.search(limit,offset,textSearch,columnSearch, index, sortBy ,(data)=>{
            //console.log('aaaaaaaaa',data)
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next()
    },

 }
module.exports = HopdongController;