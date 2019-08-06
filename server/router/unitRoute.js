var express = require('express')
var router = express.Router()
var unitController = require('../controller/unitController');

router.use(function timelog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = req.body.index;
    let sortBy = req.body.sortBy
    unitController.getUnit(pageNumber, pageSize,index,sortBy, function (data) {
        res.send(data);
    })
})

// router.post('/unit/getCha', function (req, res) {
//     unitController.(function(data){})
//     res.send(data);
// })

router.post('/gettinh', function (req, res) {
    console.log('reqesy tinh', req.data)
    unitController.getTinh(function(data){
        res.send(data);
    })
})

router.post('/gethuyen', function (req, res) {
    console.log('req huuyen', req.body)
    unitController.getHuyen(req.body, function(data){
        res.send(data);
    })
})

router.post('/getxa', function (req, res) {
    console.log('req xa',req.body)
    unitController.getXa(req.body, function(data){
        res.send(data);
    })
})

router.post('/getkhachhang', function (req, res) {
    unitController.getKhachhang(function(data){
        res.send(data);
    })
})

router.get('/get/:Id', function (req, res) {
    unitController.GetById(req.params.Id, function (data) {
        res.send(data);
    })
})

router.delete('/delete', function (req, res) {
    unitController.DeleteUnitbyId(req.body.dm_dv_id, function (data) {
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    unitController.insertUnit(req.body, function (data) {
        res.send(data);
    })
})

router.post('/insertkh', function (req, res) {
    console.log('đây là insert khách hàng', req.body)
    unitController.insertKhachhang(req.body, function (data) {
        console.log('insert data',data)
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    console.log('data res', req) 
    unitController.updateUnit(req.body,function (data) {
        console.log('----------------------------------------------------',data)
        // if(data.success){
        //     res.send(data);
        // }
        // else{
        //     data.message='sai mnr'
        //     res.send(data)
        // }
        res.send(data);
        
    })
})

router.post('/search',function(req,res){
    let pageSize=req.body.pageSize;
    let pageNumber=req.body.pageNumber;
    let textSearch = req.body.textSearch;
    let columnSearch = req.body.columnSearch;
    let index = req.body.p1;
    let sortBy = req.body.p2
    console.log('index',index)
    console.log('sortby',sortBy)
    unitController.search(pageSize,pageNumber,textSearch, columnSearch,index,sortBy ,function(data){
        res.send(data);
    })
  
  })



module.exports = router 