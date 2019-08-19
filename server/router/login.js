const express = require('express');
const app = express();
var router = express.Router();
var userController = require('../controller/phanquyen/userController')
config = require('../configurations/config');
const bcrypt = require('bcryptjs');
app.set('Secret', config.secret);

router.post('/', (req, res) => {
    userController.Login(req.body.username, function (data) {
        console.log(req.body.username)
        console.log(req.body.password);
        bcrypt.compare(req.body.password, data.password, function (err, match) {
            console.log('matching ', match)
            if (match) {
                const payload = {
                    userName: req.body.username,
                    claims: data.claims
                };
                var token = jwt.sign(payload, app.get('Secret'), {
                    expiresIn: "24h", // expires in 24 hours
                });
                console.log('token', token)
                res.json({
                    success: true,
                    message: 'authentication done ',
                    token: token
                });


            } else {
                res.json({ message: "sai mật khẩu rồi nhóc" })

            }
        });

    })


});

router.get('/Logins', function user(req,res) {
   res.send("haha")
})
module.exports = router;