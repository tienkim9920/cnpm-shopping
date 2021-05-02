var express = require('express')

var router = express.Router()

const Category = require('../../Controller/admin/category.controller')

router.get('/', Category.index)
router.get('/:id', Category.details)

router.post('/create', Category.create)

router.delete('/delete', Category.delete)



module.exports = router