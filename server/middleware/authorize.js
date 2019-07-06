
 
var UserController = require('../controller/userController')
var authorize = (req, res, next) => {
    // check header for the token
    
      // decode token
    if(JSON.stringify(req.url).trim().toLocaleLowerCase().includes('login') === true){
        next();
    }
    else{
        var token = req.headers['access-token'];
        console.log('authorize token', token)
        if (token) {
            // verifies secret and checks if the token is expired
            jwt.verify(token, "heymynameismohamedaymen", (err, decoded) => {
                if (err) {
                    return res.json({ message: 'invalid token' });
                } else {
                    // if everything is good, save to request for use in other routes
                    if (decoded.userName) {
                        // UserController.getClaims(decoded.userName, (claims) => {
                        //     let isValid = false;
                        //     if (claims && claims.length > 0) {
                        //         let resource = req.originalUrl
                        //         console.log('url: ', resource)
                        //         for (let i = 0; i < claims.length; i++) {
                        //             const element = claims[i].split('.')[0];
                        //             if (resource.toUpperCase().indexOf(element) >= 0) {
                        //                 isValid = true;
                        //                 next();
                        //                 break; 
                        //             }
                        //         }
                        //     }
                        //     if (!isValid) {
                        //         res.send({
                        //             message: 'Chưa được phân quyền.'
                        //         });
                        //     }
                        // })
                        next();
                    } else {
                        if (decoded.userName) {  
                            next();
                        } else {
                            res.send({
                                message: 'may deo co quyen vao day'
                            });
                        }
                    }
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
