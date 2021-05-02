var express = require('express')

var router = express.Router()

const Category = require('../Controller/category.controller')

router.get('/', Category.index)


module.exports = router