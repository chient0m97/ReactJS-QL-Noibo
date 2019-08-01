var express = require('express')
var router = express.Router()
var hotroController = require('../controller/hotro_Controller')
router.use(function timeLog(req, res, next){
    console.log('Time: ',Date.now())
    next()
})
router.get('/get',function(req,res){
    res.send('dcmmhihi')
})
router.post('/get', function(req, res) {
    console.log("Get data f")
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy;
    hotroController.getHotro(pageNumber, pageSize, index, sortBy, function(data){
        res.send(data);
    })
    console.log("Get data and limit & offset", pageNumber,' ', pageSize)
})

router.post('/getidduan', function(req, res){
    hotroController.getIdDuan(function(data){
        res.send(data)
    })
    console.log("getidduan")
})

router.post('/getnhansu', function(req, res){
    hotroController.getNhanSu(function(data){
        res.send(data)
    })
    console.log("getnhansu")
})

router.post('/getkhachhang', function(req, res){
    hotroController.getKhachHang(function(data){
        res.send(data)
    })
    console.log("getkhachhang")
})

router.post('/insert', function(req,res) {
    console.log('INSERT')
    hotroController.insertHotro(req.body, function(data){
        res.send(data);
    })
})

router.post('/update', function(req,res){
    hotroController.updateHotro(req.body, function(data) {
        res.send(data)
    })
})

router.delete('/delete', function (req, res) {
    hotroController.deleteHotroById(req.body.ht_id, function (data) {
        res.send(data);
    })
})

router.post('/search', function(req, res) {
    console.log('First sever search')
    let pageSize = req.body.pageSize;
    let pageNumber = req.body.pageNumber;
    let textSearch = req.body.textSearch;
    let columnSearch = req.body.columnSearch;
    let index = req.body.p1;
    let sortBy = req.body.p2;
    hotroController.getDataSearch(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, function(data){
        res.send(data);
    })
})

router.get('/get/:ns_id', function(req, res){
    hotroController.getById(req.params.ht_id, function(data){
        res.send(data)
    })
})

router.get('/about', function(req,res) {
    res.send('About Ho Tro')
})


module.exports = router