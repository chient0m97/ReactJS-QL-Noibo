const express = require('express');
const app = express();
var router = express.Router();
var userController = require('../controller/phanquyen/userController')
config = require('../configurations/config');
app.set('Secret', config.secret);

router.post('/', (req, res) => {
    userController.Login(req.body.username, function (data) {
        console.log(req.body.password);
        console.log('data-----------------', data.password);
        if (data) {

            if (req.body.password == data.password) {
                console.log('log thanh cong')

                //if eveything is okey let's create our token 
                const payload = {
                    check: true,
                    userName: req.body.username
                };
                var token = jwt.sign(payload, app.get('Secret'), {
                    expiresIn: "24h" // expires in 24 hours
                });
                console.log(token)
                if (req.body.username === 'admin') {
                    console.log('cai dcm')
                    res.json({
                        action: 'none',
                        success: true,
                        message: 'authentication done ',
                        token: token
                    });
                }
                else{
                    res.json({
                        action: '',
                        success: true,
                        message: 'authentication done ',
                        token: token
                    });
                }


            } else {
                res.json({ message: "please check your password !" })
            }
        } else {
            res.json({ message: "user not found !" })
        }
    })


});
module.exports = router;