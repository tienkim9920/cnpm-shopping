
const History = require('../../Models/history')
const Detail_History = require('../../Models/detail_history')

// Hiển thị danh sách hóa đơn
// Phương thức GET
module.exports.index = async (req, res) => {

    const id_user = req.query.id_user

    const history = await History.find({ id_user: id_user })

    res.json(history)

}

// Hiển thị chi tiết hóa đơn
// Phương thức GET
module.exports.detail = async (req, res) => {

    const id_history = req.params.id

    const detail_history = await Detail_History.find({ id_history: id_history })

    res.json(detail_history)

}

// Hiển thị thông tin hóa đơn
// Phương thức GET
module.exports.view = async (req, res) => {

    const id = req.params.id

    const history = await History.findOne({ _id: id })

    res.json(history)

}