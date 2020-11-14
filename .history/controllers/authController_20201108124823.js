

const signup_post = (req, res) => {
    const {username, password} = req.body
    console.log(username, password)

    res.send('sign up')
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