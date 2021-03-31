const Products = require('../../Models/product')

module.exports.index = async (req, res) => {

    const products = await Products.find()

    res.send(products)
}

module.exports.category = async (req, res) => {

    const id_category = req.query.id_category

    const products_category = await Products.find({ id_category: id_category })

    res.json(products_category)
}

module.exports.detail = async (req, res) => {

    const id = req.params.id

    const product = await Products.findOne({ _id: id })

    res.json(product)

}