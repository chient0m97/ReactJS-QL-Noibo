var express = require('express')
var router = express.Router()
// middleware that is specific to this router
var diabanController = require('../controller/diabanController');



router.post('/get', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  diabanController.getDiaban(pageNumber, pageSize, function (data) {
      res.send(data);
  })
})
router.post('/getcha',function(req,res){
  console.log("day la router diaban cha")
  diabanController.getcha(req.body, function(data){
    res.send(data);
  })
})

router.delete('/delete', function (req, res) {
  let dm_db_id = req.body.dm_db_id
  console.log('id',dm_db_id)
  diabanController.deleteDiabanbyId(dm_db_id, function (data) {
        res.send(data);
    })
})

router.post('/insert',function (req, res) {
  diabanController.insertDiaban(req.body, function (data) {
        res.send(data);
    })

})

router.post('/update',function (req, res) {
  console.log('data res',req)
  diabanController.updateDiaban(req.body, function (data) {
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
  diabanController.search(pageSize,pageNumber,textSearch, columnSearch,index,sortBy ,function(data){
      res.send(data);
  })

})

module.exports = router