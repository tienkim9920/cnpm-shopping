var express = require('express')

var router = express.Router()

const Products = require('../Controller/product.controller')

router.get('/', Products.index)

router.get('/category', Products.category)

router.get('/:id', Products.detail)

module.exports = router