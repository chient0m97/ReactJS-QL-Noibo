const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
jwt = require('jsonwebtoken');
config = require('./configurations/config');
app = express();
const port = 5000;
var routers = require('./router/index');
var nhansuRoute = require('./router/nhansuRoute');
var hotroRoute = require('./router/hotroRoute');
var menuRoute = require('./router/menu_Route')
var khachhangRoute = require('./router/khachhangRoute')
var router = require('./router/unitRoute');
var cusrouter =  require('./router/customerRoute');

//var group_userRouter = require('./router/group_userRoute');
// var userController = require('./controller/userController');
var authorize = require('./middleware/authorize')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('Secret', config.secret);

app.use(bodyParser.json());

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

app.use('/hotro',hotroRoute)

app.use('/menu', menuRoute)

app.use('/khachhangRoute', khachhangRoute)
app.use('/', cusrouter);

app.use('/', authorize, routers);

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/verify')