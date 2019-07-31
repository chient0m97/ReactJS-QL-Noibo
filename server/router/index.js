var express = require('express')
var router = express.Router()
// middleware that is specific to this router
var userController = require('../controller/phanquyen/userController');



router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.post('/user/get', function (req, res) {
    console.log('------------------------------------get-----------------------------------')
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy
    userController.getUser(pageNumber, pageSize,index,sortBy, function (data) {
    
        res.send(data);
    })
})



router.delete('/user/delete', function (req, res) {
    console.log('----------delete-----------------',req.body.id)
    userController.DeleteUserbyId(req.body.id, function (data) {
        res.send(data);
    })
})

router.post('/user/insert',function (req, res) {
    console.log('----------------insert-------------',req.body)
    userController.insertUser(req.body, function (data) {
        res.send(data);
        console.log('result',data)

    })

})

router.post('/user/update',function (req, res) {
  console.log('---------------update-------------',req.body)
  userController.updateUser(req.body, function (data) {
      res.send(data);
  })
})
router.post('/user/search',function(req,res){
  let pageSize=req.body.pageSize;
  let pageNumber=req.body.pageNumber;
  let textSearch = req.body.searchText;
  let columnSearch = req.body.columnSearch;
  let index = req.body.p1;
  let sortBy = req.body.p2
  console.log('helo')
  
  userController.search(pageSize,pageNumber,textSearch, columnSearch,index,sortBy ,function(data){
      res.send(data);
  })
})
router.post('user/checkrole',function(req,res){
    console.log('checkkkkkkkkkkkkkkkkkkkkkkkkkk ',req.body.name)
    userController.Login(req.body.name,(data)=>{
        res.send(data);
    })
})
router.get('/about', function (req, res) {
    res.send('About User')
})


module.exports = router