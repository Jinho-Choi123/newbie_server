const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    //read the token from the header or url query
    const token = req.headers['x-access-token'] || req.query.token 
    //token doesnt exist
    if(!token){
        return res.redirect('sparcs@/auth/login')
    }
    //promise that decodes token
    function decode (callback) {
        return new Promise ((resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decode) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(decode)}
            })
        })
    }

    const onError = (err) => {
        console.log(err)
        res.status(403).json({
            success: false,
            message: err.message
        })
    }

    decode()
        .then((token) => {
            req.token = token
            console.log("goto next")
            next()
        })
        .catch(onError)
}

module.exports = authMiddleware