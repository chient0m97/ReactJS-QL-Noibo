const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
jwt = require('jsonwebtoken');
config = require('./configurations/config');  
app = express();
const port = 5000;
var routers = require('./router/index');
//var hopdongrouters = require('./router/hopdong');
//var group_userRouter = require('./router/group_userRoute');
//var userController = require('./controller/userController');
//var hopdongController = require('./controller/hopdongController');
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


app.use('/', authorize, routers);

//app.use('/', authorize, hopdongrouters );

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/verify')