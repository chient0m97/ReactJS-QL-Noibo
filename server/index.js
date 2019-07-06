const express = require('express');
const ProtectedRoutes = express.Router();

bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  config = require('./configurations/config'),
  app = express();

//set secret
app.set('Secret', config.secret);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.listen(3000, () => {

  console.log('server is running on port 3000')

});
app.get('/', function (req, res) {
  res.send('Hello world  app is running on http://localhost:3000/');
});

app.post('/authenticate', (req, res) => {

  if (req.body.username === "admin") {

    if (req.body.password == 123) {
      //if eveything is okey let's create our token 
      const payload = {
        check: true,
        userName: req.body.username
      };
      var token = jwt.sign(payload, app.get('Secret'), {
        expiresIn: 1440 // expires in 24 hours
      });
      res.json({
        message: 'authentication done ',
        token: token
      });
    } else {
      res.json({ message: "please check your password !" })
    }
  } else {
    res.json({ message: "user not found !" })
  }
})

app.use('/api', ProtectedRoutes);

ProtectedRoutes.use();
ProtectedRoutes.get('/getAllProducts', (req, res) => {
  let products = [
    {
      id: 1,
      name: "cheese"
    },
    {
      id: 2,
      name: "carottes"
    }
  ]

  res.json(products)

})


