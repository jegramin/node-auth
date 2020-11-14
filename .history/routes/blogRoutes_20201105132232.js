const express = require('express')
const Blog = require('./models/blog')

const router = express.Router()

router.get('/blog', (req, res) => {
    Blog.find().sort({'createdAt' : 'desc'})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

router.get('/blog/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

router.post('/blog', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

router.delete('/blog/:id', (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch(err => res.status(400).send(err))
})
