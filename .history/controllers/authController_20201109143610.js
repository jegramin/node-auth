const User = require('../models/user')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    const errors = {email: '', password: ''}

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties)
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const signup_post = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.create({email, password})
        res.status(201).json(user)
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