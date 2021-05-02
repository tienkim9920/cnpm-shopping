const Products = require('../../Models/product')
const Category = require('../../Models/category')

module.exports.index = async (req, res) => {

    const products = await Products.find()

    res.json(products)
}

// Hàm này dùng để phân loại sản phẩm
module.exports.category = async (req, res) => {

    const id_category = req.query.id_category

    let products_category

    if (id_category === 'all') {
        products_category = await Products.find()
    } else {
        products_category = await Products.find({ id_category: id_category })
    }

    res.json(products_category)
}

module.exports.detail = async (req, res) => {

    const id = req.params.id

    const product = await Products.findOne({ _id: id })

    res.json(product)

}

module.exports.gender = async (req, res) => {

    const gender = req.query.gender

    const category = await Category.find({ gender: gender })

    res.json(category)

}

module.exports.pagination = async (req, res) => {

    //Lấy page từ query
    const page = parseInt(req.query.page) || 1

    //Lấy số lượng từ query
    const numberProduct = parseInt(req.query.count) || 1

    //Lấy key search từ query
    const keyWordSearch = req.query.search

    //Lấy category từ query
    const category = req.query.category

    //Lấy sản phẩm đầu và sẩn phẩm cuối
    var start = (page - 1) * numberProduct
    var end = page * numberProduct

    var products

    //Phân loại điều kiện category từ client gửi lên
    if (category === 'all') {
        products = await Products.find()
    } else {
        products = await Products.find({ id_category: category })
    }

    var paginationProducts = products.slice(start, end)


    if (!keyWordSearch) {

        res.json(paginationProducts)

    } else {
        var newData = paginationProducts.filter(value => {
            return value.name_product.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.price_product.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json(newData)
    }

    res.send("Thanh Cong")

}
