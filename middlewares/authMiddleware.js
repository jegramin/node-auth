const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = (req, res, next) => {
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

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'this is my secrete which is pretty simple.', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }