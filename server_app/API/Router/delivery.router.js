var express = require('express')

var router = express.Router()

const Delivery = require('../Controller/delivery.controller')

router.get('/:id', Delivery.index)


module.exports = router