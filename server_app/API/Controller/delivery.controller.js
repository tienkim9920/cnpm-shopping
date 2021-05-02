
const Delivery = require('../../Models/delivery')

module.exports.index = async (req, res) => {

    const id_history = req.params.id

    const delivery = await Delivery.findOne({ id_history: id_history})

    res.json(delivery)

}