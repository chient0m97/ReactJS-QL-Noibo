var express = require('express')
var router = express.Router()
// middleware that is specific to this router
var hopdongController = require('../controller/hopdongController');


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})



router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    hopdongController.getHopdong(pageNumber, pageSize, function (data) {
        res.send(data);
    })
})


router.delete('/delete', function (req, res) {
  hopdongController.DeleteHopdongbyId(req.body.id, function (data) {
        res.send(data);
    })
})

router.post('/insert',function (req, res) {
  hopdongController.insertHopdong(req.body, function (data) {
        res.send(data);
    })

})

router.post('/update',function (req, res) {
  //console.log('data res',req)
  hopdongController.updateHopdong(req.body, function (data) {
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
  hopdongController.search(pageSize,pageNumber,textSearch, columnSearch,index,sortBy ,function(data){
      res.send(data);
  })

})

  router.post('/getcha', function(req, res){ 
    hopdongController.getcha(function(data){
      res.send(data);
    })
  })
  router.post('/getdonvi', function(req, res){ 
    hopdongController.getdonvi(function(data){
      res.send(data);
    })
  })
  //khach hang
  router.post('/getkhachhang', function(req, res){
    hopdongController.getkhachhang(function(data){
      res.send(data);
    })
  })
  router.post('/getduan', function(req, res){
    hopdongController.getduan(function(data){
      res.send(data);
    })
  })
  router.post('/insertduan', function(req, res){
    hopdongController.getinsertduan(function(data){
      res.send(data);
    })
  })
  router.post('/upload',function(req, res) {
    hopdongController.getupload(function(data){
      res.send(data);
    })
  });
  router.post('http://localhost:8000/upload', function(req, res){
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')
upload(req, res, function (err) {
  if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
  } else if (err) {
      return res.status(500).json(err)
  }
return res.status(200).send(req.file)

})
})
  
module.exports = router