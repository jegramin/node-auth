const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'this is my secrete which is pretty simple.', (err, decodedToken) => {
            if (err) {
                res.status(401).send({redirect: 'login'})
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.status(401).send({redirect: 'login'})
    }
}

module.exports = { requireAuth }