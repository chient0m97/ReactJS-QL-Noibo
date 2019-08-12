var express = require('express')
var multer = require('multer')
var router = express.Router()
// middleware that is specific to this router
var userController = require('../controller/userController');
var hopdongController = require('../controller/hopdongController');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file')
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now())
  next()
})

router.post('/login', (req, res, next) => {
  userController.Login(req.body.username, function (data) {
    if (data) {
      if (req.body.password === data.password) {
        delete data.password
        //if eveything is okey let's create our token 
        const payload = {
          check: true,
          userName: req.body.username
        };
        var token = jwt.sign(payload, app.get('Secret'), {
          expiresIn: '24h' // expires in 24 hours
        });
        //console.log('data login res', data)
        res.json({
          message: 'Đăng nhập thành công ',
          token: token,
          success: true,
          user: data
        });
      } else {
        res.json({ message: "Tài khoản hoặc mật khẩu không chính  xác!", success: false })
      }
    } else {
      res.json({ message: "Tài khoản này không tồn tại", success: false })
    }
  })
});

router.post('/user/get', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  userController.getUser(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})

router.get('/user/get/:Id', function (req, res) {
  userController.GetById(req.params.Id, function (data) {
    res.send(data);
  })
})


router.delete('/user/delete', function (req, res) {
  userController.DeleteUserbyId(req.body.id, function (data) {
    res.send(data);
  })
})

router.post('/user/insert', function (req, res) {
  userController.insertUser(req.body, function (data) {
    res.send(data);
  })

})

router.post('/user/update', function (req, res) {
  //console.log('data res',req)
  userController.updateUser(req.body, function (data) {
    res.send(data);
  })
})
router.post('/user/search', function (req, res) {
  let pageSize = req.body.pageSize;
  let pageNumber = req.body.pageNumber;
  let textSearch = req.body.textSearch;
  let columnSearch = req.body.columnSearch;
  let index = req.body.p1;
  let sortBy = req.body.p2
  userController.search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, function (data) {
    res.send(data);
  })

})
router.get('/about', function (req, res) {
  res.send('About User')
})

router.post('/hopdong/get', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  hopdongController.getHopdong(pageNumber, pageSize, function (data) {
    res.send(data);
    // console.log(data,'data tra ve')
  })
})
router.get('/hopdong/get/:Id', function (req, res) {
  hopdongController.GetById(req.params.Id, function (data) {
    res.send(data);
  })
})


router.delete('/hopdong/delete', function (req, res) {
  hopdongController.DeleteHopdongbyId(req.body.hd_id, function (data) {
    res.send(data);
  })
})

router.post('/hopdong/insert', function (req, res) {
  //console.log(req.body, "Da req")
  hopdongController.insertHopdong(req, function (data) {

    res.send(data);
  })

})

router.post('/hopdong/update', function (req, res) {
  //console.log('data res',req)
  //console.log("/hopdong/update")
  hopdongController.UpdateHopdong(req.body, function (data) {
    res.send(data);
  })
})

router.post('/hopdong/search', function (req, res) {
  let pageSize = req.body.pageSize;
  let pageNumber = req.body.pageNumber;
  let textSearch = req.body.textSearch;
  let columnSearch = req.body.columnSearch;
  let index = req.body.p1;
  let sortBy = req.body.p2
  hopdongController.search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, function (data) {
    res.send(data);
  })
})
//don vi
router.post('/hopdong/getcha', function (req, res) {
  hopdongController.getcha(function (data) {
    res.send(data);
  })
})
router.post('/hopdong/getdonvi', function (req, res) {
  hopdongController.getdonvi(function (data) {
    res.send(data);
  })
})
//khach hang
router.post('/hopdong/getkhachhang', function (req, res) {
  hopdongController.getkhachhang(function (data) {
    res.send(data);
  })
})
router.post('/hopdong/getduan', function (req, res) {
  hopdongController.getduan(function (data) {
    res.send(data);
  })
})
router.post('/hopdong/insertduan', function (req, res) {
  hopdongController.getinsertduan(function (data) {
    res.send(data);
  })
})
router.post('/hopdong/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
});
module.exports = router