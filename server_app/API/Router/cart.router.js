var express = require('express')

var router = express.Router()

const Carts = require('../Controller/cart.controller')

router.get('/', Carts.index)

router.post('/', Carts.post_cart)

router.put('/', Carts.update)

router.delete('/:id', Carts.delete)

module.exports = router