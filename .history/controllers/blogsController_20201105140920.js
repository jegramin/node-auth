const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({'createdAt' : 'desc'})
    .then(result => res.send(result))
    .catch(err => console.log(err))
}