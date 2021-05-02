var express = require('express')

var router = express.Router()

const Products = require('../../Controller/admin/product.controller')

router.get('/', Products.index)
router.post('/create', Products.create)

router.delete('/delete', Products.delete)


module.exports = router