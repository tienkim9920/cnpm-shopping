var express = require('express')

var router = express.Router()

const Note = require('../Controller/note.controller')

router.post('/', Note.post_delivery)

router.get('/:id', Note.get_delivery)

module.exports = router