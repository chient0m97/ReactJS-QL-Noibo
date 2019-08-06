var express = require('express')
var router = express.Router()
var customerController = require('../controller/customerController');

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
    customerController.getCustomer(pageNumber, pageSize,index,sortBy, function (data) {
        res.send(data);
    })
})

// router.post('/unit/getCha', function (req, res) {
//     unitController.(function(data){})
//     res.send(data);
// })

router.get('/get/:Id', function (req, res) {
    customerController.GetById(req.params.Id, function (data) {
        res.send(data);
    })
})

router.post('/getdonvi', function(req, res){
    console.log('cdm dv')
    customerController.getDonvi( function(data) {
        res.send(data);
    })
})

router.post('/gettinh', function (req, res) {
    console.log('reqesy tinh', req.data)
    customerController.getTinh(function(data){
        res.send(data);
    })
})

router.post('/gethuyen', function (req, res) {
    console.log('req huuyen', req.body)
    customerController.getHuyen(req.body, function(data){
        res.send(data);
    })
})

router.post('/getxa', function (req, res) {
    console.log('req xa',req.body)
    customerController.getXa(req.body, function(data){
        res.send(data);
    })
})

router.delete('/delete', function (req, res) {
    customerController.DeleteCustomerbyId(req.body.kh_id, function (data) {
        res.send(data);
    })
})

router.post('/unit/insertdv', function (req, res) {
    console.log('đây là insert đơn vị')
    customerController.insertDonvi(req.body, function (data) {
        console.log('insert data',data)
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    customerController.insertCustomer(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    console.log('data res', req.body)
    customerController.updateCustomer(req.body, function (data) {
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
    customerController.search(pageSize,pageNumber,textSearch, columnSearch,index,sortBy ,function(data){
        res.send(data);
    })
  
  })


module.exports = router 