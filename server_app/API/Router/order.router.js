var express = require('express')

var router = express.Router()

const Order = require('../Controller/order.controller')

// router.post('/paypal', Order.post_paypal)

router.post('/order', Order.post_order)

module.exports = router