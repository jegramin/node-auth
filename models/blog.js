const mongoos = require('mongoose')

const Schema = mongoos.Schema

const blogSchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    snippet: {
        type: 'string',
        required: true
    },
    body: {
        type: 'string',
        required: true
    }
}, {timestamps: true})

const Blog = mongoos.model('Blog', blogSchema)

module.exports = Blog 