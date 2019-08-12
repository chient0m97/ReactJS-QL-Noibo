var UserController = require('../controller/phanquyen/userController')
var constant = require('./constant')
var authorize = (req, res, next) => {
    // check header for the token
    console.log('authorize')
    // decode token
    if (JSON.stringify(req.url).trim().toLocaleLowerCase().includes('login') === true) {
        next();
    }
    else {
        var token = req.headers['access-token'];
        if (token) {
            // verifies secret and checks if the token is expired
            jwt.verify(token, "heymynameismohamedaymen", (err, decoded) => {
                if (err) {
                    return res.json({ message: 'invalid token' });
                } else {
                    // if everything is good, save to request for use in other routes
                    UserController.getClaimsByUser(decoded.userName, (claims) => {
                        for (i = 0; i < constant.length; i++) {
                            if (constant[i].url == req.originalUrl) {
                                let clm = constant[i].claim
                                for (j = 0; j < claims.length; j++) {
                                    if (claims[j] == clm) {
                                        next();
                                        break;

                                    }
                                }
                            }
                        }

                    })
                }
            })
        } else {
            // if there is no token  
            res.send({
                message: 'No token provided.'
            });
        }
    }
}

module.exports = authorize;
