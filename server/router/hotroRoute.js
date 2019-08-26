var express = require('express')
var router = express.Router()
var hotroController = require('../controller/hotro_Controller')
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
    hotroController.getHotro(pageNumber, pageSize, index, sortBy, function(data){
        res.send(data);
    })
})

router.post('/getidduan', function(req, res){
    hotroController.getIdDuan(function(data){
        res.send(data)
    })
})

router.post('/getnhansu', function(req, res){
    hotroController.getNhanSu(function(data){
        res.send(data)
    })
})

router.post('/getkhachhang', function(req, res){
    hotroController.getKhachHang(function(data){
        res.send(data)
    })
})

router.post('/gethopdong', function(req, res){
    hotroController.getHopDong(function(data){
        res.send(data)
    })
})

router.post('/getmyself', function(req, res){
    hotroController.getDataMyself(req.body,function(data){
        res.send(data)
    })
})

router.post('/getdatakhachhang', function(req, res){
    hotroController.getDataKhachHang(req.body,function(data){
        res.send(data)
    })
})

router.post('/insert', function(req,res) {
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

router.post('/getfollowmonth', function(req, res){
    hotroController.getHotroFollowMonth(req.body, function(data){
        res.send(data)
    })
})

router.get('/about', function(req,res) {
    res.send('About Ho Tro')
})


module.exports = router