const express = require('express')
const blogController = require('../controllers/blogsController')

const router = express.Router()

router.get('/blog', blogController.blog_index)
router.get('/blog/:id', blogController.blog_details)
router.post('/blog', blogController.blog_create_post)
router.delete('/blog/:id', blogController.blog_delete)

module.exports = router