var express = require('express')

var router = express.Router()

const Products = require('../Controller/product.controller')

router.get('/', Products.index)

router.get('/category', Products.category)

router.get('/:id', Products.detail)

router.get('/category/gender', Products.gender)

router.get('/category/pagination', Products.pagination)

router.get('/scoll/page', Products.scoll)

module.exports = router