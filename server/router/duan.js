var express = require('express')
var router = express.Router()
// middleware that is specific to this router
var duanController = require('../controller/duanController');




router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    duanController.getDuan(pageNumber, pageSize, function (data) {
        res.send(data);
    })
})

router.get('/get/:Id', function (req, res) {
  duanController.GetById(req.params.Id, function (data) {
        res.send(data);
    })
})


router.delete('/delete', function (req, res) {
  let dm_duan_id = req.body.dm_duan_id
  duanController.deleteDuanbyId(dm_duan_id, function (data) {
        res.send(data);
    })
})

router.post('/insert',function (req, res) {
  duanController.insertDuan(req.body, function (data) {
        res.send(data);
    })

})

router.post('/update',function (req, res) {
  duanController.updateDuan(req.body, function (data) {
      res.send(data);
  })
})
router.post('/getqtda',function(req,res){
  duanController.getQTDA(function(data){
    res.send(data);
  })
})

module.exports = router