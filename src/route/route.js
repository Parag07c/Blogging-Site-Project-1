
const express = require('express');
const router = express.Router();
const authorModel= require("../models/authoModel.js")
const blogModel = require("../models/blogModel.js")
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")


router.get("/test-me", function (req, res) {
    res.send("My first project!")
})
  


module.exports = router;