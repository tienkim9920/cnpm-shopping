var express = require('express')

var router = express.Router()

const User = require('../../Controller/admin/user.controller')

router.get('/', User.index)
router.get('/:id', User.details)

router.post('/create', User.create)

router.post('/login', User.login)

router.patch('/update', User.update)

router.delete('/delete', User.delete)


module.exports = router