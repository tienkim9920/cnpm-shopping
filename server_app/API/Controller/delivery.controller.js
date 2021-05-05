
const Delivery = require('../../Models/delivery')

module.exports.post_delivery = async (req, res) => {

    const delivery = await Delivery.create(req.body)

    res.json(delivery)

}

module.exports.get_delivery = async (req, res) => {

    const id = req.params.id

    const delivery = await Delivery.findOne({ id_delivery: id })

    res.json(delivery)

}