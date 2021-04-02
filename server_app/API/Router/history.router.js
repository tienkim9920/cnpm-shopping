var express = require('express')

var router = express.Router()

const History = require('../Controller/history.controller')

router.get('/', History.index)

router.get('/view/:id', History.view)

router.get('/:id', History.detail)

module.exports = router