const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const {authentication,authorization}=require('../middlewares/middleware')

//to create author
router.post("/authors",authorController.createAuthor)

//to create blogs
router.post("/blogs",authentication,blogController.createBlog)

//to get blogs from database
router.get('/blogs',authentication,blogController.getBlogs)

//for update blogs 
router.put('/blogs/:blogId',authentication,authorization,blogController.updateBlog)

//for delete blog by blogId
router.delete('/blogs/:blogId',authentication,authorization,blogController.deleteBlog)

//for delete blog by particular fields
router.delete('/blogs',authentication,authorization,blogController.deleteBlogByfields)

//for author login
router.post('/login',authorController.login)

module.exports = router;