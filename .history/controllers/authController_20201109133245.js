const User = require('../models/user')

const signup_post = async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.create({username, password})
        res.status(201).json(user)
    }
    catch(err) {
        console.log(err)
    }
}

const login_post = (req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    
    res.send('log in')
}

module.exports = {
    signup_post,
    login_post
}