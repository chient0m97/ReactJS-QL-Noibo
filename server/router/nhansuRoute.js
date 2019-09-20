var express = require('express')
var router = express.Router()
var nhansuController = require('../controller/nhansu_Controller')
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.get('/get', function (req, res) {
    res.send('dcmmhihi')
})
router.post('/get', function (req, res) {
    console.log("Get data f")
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy;
    nhansuController.getNhansu(pageNumber, pageSize, index, sortBy, function (data) {
        res.send(data);
    })
    console.log("Get data and limit & offset", pageNumber, ' ', pageSize)
})

router.post('/insert', function (req, res) {
    console.log('INSERT')
    nhansuController.insertNhansu(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    nhansuController.updateNhansu(req.body, function (data) {
        res.send(data)
    })
})

router.delete('/delete', function (req, res) {
    nhansuController.deleteNhansuById(req.body.ns_id, function (data) {
        res.send(data);
    })
})

router.post('/search', function (req, res) {
    let pageSize = req.body.pageSize;
    let pageNumber = req.body.pageNumber;
    let timkiem = req.body.timkiem;
    console.log('ssss', req.body.timkiem)
    nhansuController.search(pageSize, pageNumber, timkiem, function (data) {
        console.log('tttttttttt', data)
        res.send(data);
    })
})

router.post('/getdinhdanh', function (req, res) {
    nhansuController.getUser(function (data) {
        res.send(data)
    })
})

router.get('/get/:ns_id', function (req, res) {
    nhansuController.getById(req.params.ns_id, function (data) {
        res.send(data)
    })
})

router.get('/about', function (req, res) {
    res.send('About Nhan Su')
})


module.exports = router