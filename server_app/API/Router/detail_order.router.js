var express = require('express')

var router = express.Router()

const Detail_Order = require('../Controller/detail_order.controller')

// Hiển thị danh sách detail
router.get('/:id', Detail_Order.detail)

router.post('/', Detail_Order.post_detail_order)

module.exports = router