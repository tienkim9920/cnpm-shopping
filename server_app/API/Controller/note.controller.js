const Note = require('../../Models/note')

module.exports.post_delivery = async (req, res) => {

    const note = await Note.create(req.body)

    res.json(note)

}

module.exports.get_delivery = async (req, res) => {

    const id = req.params.id

    const note = await Note.findOne({ _id: id })

    res.json(note)

}