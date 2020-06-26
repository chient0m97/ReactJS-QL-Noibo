var express = require('express');
var multer = require('multer')
const cors = require("cors");
const path = require('path')
jwt = require('jsonwebtoken');
config = require('./configurations/config');
var app = express();
app.use('/uploads', express.static(path.join(__dirname, 'upload', './')))
// app.use(express.static("./public"));
// app.set("view engine", "ejs");
// app.set("views", "./views");
const login = require('./router/login')
const checked = require('./router/checkrole')
const setpermiss = require('./router/setpermission')
const role_action = require('./router/role_action') 
// var server = require("http").Server(app);
// var io = require("socket.io")(server);
// server.listen(3000);
const port = 8000; 

// var xlsx = require("xlsx")
// var wb = xlsx.readFile("./upload/test_Read_excel.xlsx")
// var ws = wb.Sheets["Sheet1"]
// var data =xlsx.utils.sheet_to_json(ws)
// console.log("day la data ",data[1]['KIỂU DỮ LIỆU'])
// console.log("day la name ",data[1].name)

var groupRoute = require('./router/group')
var setGroupPermission = require('./router/setGroupPermission')
var nhansuRoute = require('./router/nhansuRoute')
var hotroRoute = require('./router/hotroRoute')
var menuRoute = require('./router/menu_Route')
var quanly_hoadonRoute = require('./router/quanly_hoadonRoute')
var khachhangRoute = require('./router/khachhangRoute')
var router = require('./router/unitRoute');
var approved = require('./router/approved');
var half = require('./router/half');
var notification = require('./router/notification');
var cusrouter = require('./router/customerRoute')
var hopdong = require('./router/hopdong')
var userRouter = require('./router/index');
var diabanRoute = require('./router/diaban')
var duanRoute = require('./router/duan')
var memberRoute = require('./router/memberRoute')
var fileRoute = require('./router/fileRoute')
var ChangePass = require('./router/changepass')
var ViewProfile = require('./router/viewprofile')
var binhluanRoute = require('./router/binhluanRoute')
var authorize = require('./middleware/authorize')
var bodyParser = require('body-parser');
var thongbao = require('./router/thongbaoRoute')

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
app.use(cors());

app.use('/nhansu', nhansuRoute);

app.use('/member', memberRoute);

app.use('/changepass', ChangePass);

app.use('/viewprofile', ViewProfile);

app.use('/hotro', hotroRoute)

app.use('/binhluan', binhluanRoute)

app.use('/hopdong', hopdong)

app.use('/menu', menuRoute)

app.use('/qlhd', quanly_hoadonRoute)

app.use('/group', groupRoute)

app.use('/diaban', diabanRoute)

app.use('/duan', duanRoute)

app.use('/khachhangRoute', khachhangRoute)

app.use('/customer', cusrouter)

app.use('/thongbao', thongbao)

app.use('/filekhachhangs', fileRoute);

app.use('/Login', login);

app.use('/setGroupPermission', setGroupPermission);

app.use('/Login', login);

app.use('/setGroupPermission', setGroupPermission);

app.use('/Login', login);

app.use('/checkrole', checked)

app.use('/setpermission', setpermiss)

app.use('/role_action', role_action)

app.use('/user', authorize, userRouter);

//app.use('/', authorize, hopdongrouters );

app.use('/unit', router);

app.use('/several', approved);

app.use('/half', half);

app.use('/notification', notification);



// io.on("connection", function(socket){
//   console.log('co nguoi ket noi '+socket.id);
// })

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload')
  },
  filename: (req, file, cb) => {
    console.log(file,'file');
    
    cb(null, file.originalname)
  }
});
let upload = multer({storage: storage}).single("file");
app.post('/upload', (req, res) => {
  upload(req, res, (error) => {
    // Nếu có lỗi thì trả về lỗi cho client.
    // Ví dụ như upload một file không phải file ảnh theo như cấu hình của mình bên trên
    if (error) {
      return res.send(`Error when trying to upload: ${error}`);
    }
    // Không có lỗi thì lại render cái file ảnh về cho client.
    // Đồng thời file đã được lưu vào thư mục uploads
    res.sendFile(path.join(`${__dirname}/upload/${req.file.originalname}`));
  });
})
// app.get("/", function(req, res){
//   res.render("trangchu");
// });
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.post('/verify')