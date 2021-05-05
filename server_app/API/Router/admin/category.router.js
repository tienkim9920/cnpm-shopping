var express = require('express')

var router = express.Router()

const Category = require('../../Controller/admin/category.controller')

router.get('/', Category.index)

router.get('/:id', Category.detail)

router.get('/detail/:id', Category.detailProduct)

router.post('/create', Category.create)

router.delete('/delete', Category.delete)

router.put('/update', Category.update)



module.exports = router