var express = require('express')
var router = express.Router()
// middleware that is specific to this router
var hopdongController = require('../controller/hopdongController');


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// router.post('/login', (req, res, next) => {
//   hopdongController.Login(req.body.username, function (data) {
//       if (data) {
//         if (req.body.password === data.password) {
//           delete data.password
//           //if eveything is okey let's create our token 
//           const payload = {
//             check: true,
//             userName: req.body.username
//           };
//           var token = jwt.sign(payload, app.get('Secret'), {
//             expiresIn: '24h' // expires in 24 hours
//           });
//           console.log('data login res', data)
//           res.json({
//             message: 'Đăng nhập thành công ',
//             token: token,
//             success: true,
//             user:data
//           });
//         } else {
//           res.json({ message: "Tài khoản hoặc mật khẩu không chính  xác!" , success: false})
//         }
//       } else {
//         res.json({ message: "Tài khoản này không tồn tại", success: false })
//       }
//     })
//   });

router.post('hopdong/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    hopdongController.getHopdong(pageNumber, pageSize, function (data) {
        res.send(data);
    })
})

router.get('hopdong/get/:Id', function (req, res) {
  hopdongController.GetById(req.params.Id, function (data) {
        res.send(data);
    })
})


router.delete('hopdong/delete', function (req, res) {
  hopdongController.DeleteHopdongbyId(req.body.id, function (data) {
        res.send(data);
    })
})

router.post('hopdong/insert',function (req, res) {
  hopdongController.insertHopdong(req.body, function (data) {
        res.send(data);
    })

})

router.post('hopdong/update',function (req, res) {
  //console.log('data res',req)
  hopdongController.updateHopdong(req.body, function (data) {
      res.send(data);
  })
})
router.post('hopdong/search',function(req,res){
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

module.exports = router