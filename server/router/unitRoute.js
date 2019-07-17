var express = require('express')
var router = express.Router()
var unitController = require('../controller/unitController');

router.use(function timelog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/unit/get', function (req, res) {
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

router.get('/unit/get/:Id', function (req, res) {
    unitController.GetById(req.params.Id, function (data) {
        res.send(data);
    })
})

router.delete('/unit/delete', function (req, res) {
    unitController.DeleteUnitbyId(req.body.dm_dv_id, function (data) {
        res.send(data);
    })
})

router.post('/unit/insert', function (req, res) {
    unitController.insertUnit(req.body, function (data) {
        res.send(data);
    })
})

router.post('/unit/update', function (req, res) {
    console.log('data res', req.body)
    unitController.updateUnit(req.body, function (data) {
        res.send(data);
    })
})

router.post('/unit/search',function(req,res){
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

router.get('/about', function (req, res) {
    res.send('About Unit')
})

module.exports = router 