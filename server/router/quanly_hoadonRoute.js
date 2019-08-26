var express = require('express')
var router = express.Router()
var quanly_hoadonsController = require('../controller/quanly_hoadonController')

router.use(function timeLog(req, res, next){
    console.log('Time: ',Date.now())
    next()
})

router.post('/get', function(req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy;
    quanly_hoadonsController.getQuanly_hoadons(pageNumber, pageSize, index, sortBy, function(data){
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    quanly_hoadonsController.insertQuanly_hoadons(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    quanly_hoadonsController.updateQuanly_hoadons(req.body, function (data) {
        res.send(data)
    })
})

router.delete('/delete', function (req, res) {
    quanly_hoadonsController.deleteQuanly_hoadonsById(req.body.qlhd_sohoadon, function (data) {
        res.send(data);
    })
})

router.post('/getkhachhang', function(req, res){
    quanly_hoadonsController.getKhachHang(function(data){
        res.send(data)
    })
})

module.exports = router