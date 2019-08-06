const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
jwt = require('jsonwebtoken');
config = require('./configurations/config');
app = express();
const login = require('./router/login')
const checked = require('./router/checkrole')
const setpermiss = require('./router/setpermission')
const role_action = require('./router/role_action')
const port = 5000;
var userRouter = require('./router/index');


//var group_userRouter = require('./router/group_userRoute');
var userController = require('./controller/phanquyen/userController');
var authorize = require('./middleware/authorize')
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('Secret', config.secret);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
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

app.use('/Login',login);

app.use('/checkrole',checked)

app.use('/setpermission',setpermiss)
app.use('/role_action',role_action)

app.use('/', userRouter);

//app.use('/', authorize, hopdongrouters );

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/verify')