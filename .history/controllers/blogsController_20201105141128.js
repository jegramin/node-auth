const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({'createdAt' : 'desc'})
    .then(result => res.send(result))
    .catch(err => console.log(err))
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then(result => res.send(result))
    .catch(err => console.log(err))
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => res.send(result))
        .catch(err => console.log(err))
}

const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(err => res.status(400).send(err))
}