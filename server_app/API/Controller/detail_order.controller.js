
const Detail_Order = require('../../Models/detail_order')

// Hiển thị chi tiết hóa đơn
// Phương thức GET
module.exports.detail = async (req, res) => {

    const id_order = req.params.id

    const detail_order = await Detail_Order.find({ id_order: id_order }).populate('id_product')

    res.json(detail_order)

}

// Phuong Thuc Post
module.exports.post_detail_order = async (req, res) => {

    await Detail_Order.create(req.body)

    res.send("Thanh Cong")

}