var express = require('express')

var router = express.Router()

const Permission = require('../../Controller/admin/permission.controller')

router.get('/', Permission.index)
router.get('/all', Permission.all)
router.get('/:id', Permission.details)

router.post('/create', Permission.create)

router.delete('/delete', Permission.delete)
router.put('/update', Permission.update)


module.exports = router