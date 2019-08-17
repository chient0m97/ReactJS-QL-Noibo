const express = require('express');
const app = express();
var router = express.Router();
var groupController = require('../controller/phanquyen/groupController')
config = require('../configurations/config');
const bcrypt = require('bcryptjs');
app.set('Secret', config.secret);

router.post('/', (req, res) => {
    console.log('permissionnnnnnnnnnnnnnasdasds',req.body)
    groupController.setGroupPermission(req.body,(data)=>{
        console.log('----------------------data-------',data)
        res.send(data);
    })
});
module.exports = router;