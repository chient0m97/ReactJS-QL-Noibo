var express = require('express');
const path = require('path');
//const bodyParser = require("body-parser");
var cors = require("cors");
jwt = require('jsonwebtoken');
config = require('./configurations/config');
var app = express();
const login = require('./router/login')
const checked = require('./router/checkrole')
const setpermiss = require('./router/setpermission')
const role_action = require('./router/role_action')
const port = 5000;

var groupRoute = require('./router/group')
var setGroupPermission = require('./router/setGroupPermission')
var nhansuRoute = require('./router/nhansuRoute')
var hotroRoute = require('./router/hotroRoute')
var menuRoute = require('./router/menu_Route')
var quanly_hoadonRoute = require('./router/quanly_hoadonRoute')
var khachhangRoute = require('./router/khachhangRoute')
var router = require('./router/unitRoute');
var cusrouter = require('./router/customerRoute')
var hopdong = require('./router/hopdong')
var userRouter = require('./router/index');
var diabanRoute = require('./router/diaban')
var duanRoute = require('./router/duan')
var memberRoute = require('./router/memberRoute')
var ChangePass = require('./router/changepass')
var authorize = require('./middleware/authorize')
var bodyParser = require('body-parser');
app.use('/upload', express.static(path.join(__dirname, 'upload', './')))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.set('Secret', config.secret);

var whitelist = ['http://localhost:3000', 'http://localhost:5000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
var multer = require('multer')
app.use(cors());


app.use('/nhansu', nhansuRoute);
app.use('/member', memberRoute);
app.use('/changepass', ChangePass);

app.use('/hotro', hotroRoute)

app.use('/hopdong', hopdong)

app.use('/menu', menuRoute)

app.use('/qlhd', quanly_hoadonRoute)

app.use('/group', groupRoute)

app.use('/diaban', diabanRoute)

app.use('/duan', duanRoute)

app.use('/khachhangRoute', khachhangRoute)

app.use('/customer', cusrouter);

app.use('/Login', login);

app.use('/setGroupPermission', setGroupPermission);

app.use('/Login', login);

app.use('/checkrole', checked)

app.use('/setpermission', setpermiss)

app.use('/role_action', role_action)

app.use('/user', userRouter);

//app.use('/', authorize, hopdongrouters );

app.use('/unit', router);

//upload multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file')
app.post('/upload', function (req, res) {
  console.log('da vao upload');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/verify')