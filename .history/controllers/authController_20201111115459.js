const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    const errors = {email: '', password: ''}

    if(err.code === 11000) {
        errors.email = 'This email address exists already!'
    }
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties)
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id}, 'this is my secrete which is pretty simple.', {
        expiresIn: maxAge
    })
}

const signup_post = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id})
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

const login_post = (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    
    res.send('log in')
}

module.exports = {
    signup_post,
    login_post
}