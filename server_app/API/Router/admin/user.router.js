var express = require('express')

var router = express.Router()

const User = require('../../Controller/admin/user.controller')

router.get('/', User.index)
router.post('/create', User.create)

router.delete('/delete', User.delete)


module.exports = router