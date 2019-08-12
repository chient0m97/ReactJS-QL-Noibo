const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
jwt = require('jsonwebtoken');
config = require('./configurations/config');
app = express();
const port = 5000;
var routers = require('./router/index');
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
app.use('/', authorize, routers);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.post('/verify');