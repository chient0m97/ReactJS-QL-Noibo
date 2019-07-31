var UserController = require('../controller/phanquyen/userController')
var constant = require('./constant')
var authorize = (req, res, next) => {
    // check header for the token
    console.log('consta', constant)

    console.log('request tu client', req.originalUrl)
    // decode token
    if (JSON.stringify(req.url).trim().toLocaleLowerCase().includes('login') === true) {
        next();
    }
    else {
        var token = req.headers['access-token'];
        console.log('authorize token', token)
        if (token) {
            // verifies secret and checks if the token is expired
            jwt.verify(token, "heymynameismohamedaymen", (err, decoded) => {
                if (err) {
                    return res.json({ message: 'invalid token' });
                } else {
                    // if everything is good, save to request for use in other routes
                    UserController.getClaimsByUser(decoded.userName, (claims) => {
                        console.log('claims authorizeeeeeeeeeeeeeeeeeeeee', claims)
                        for (i = 0; i < constant.length; i++) {
                            if (constant[i].url == req.originalUrl) {
                                console.log('url matching')
                                let clm = constant[i].claim
                                for (j = 0; j < claims.length; j++) {
                                    if (claims[j] == clm) {
                                        console.log('nexttttttttttttttttttttttttttt')
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
