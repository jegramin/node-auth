const User = require('../models/user')

const handleErrors = (err) => {
    console.log(err.message, err.code)
}

const signup_post = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.create({email, password})
        res.status(201).json(user)
    }
    catch(err) {
        handleErrors(err)
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