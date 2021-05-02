var express = require('express')

var router = express.Router()

const Order = require('../../Controller/admin/order.controller')

router.get('/', Order.index)

router.get('/detail/:id', Order.details)


module.exports = router