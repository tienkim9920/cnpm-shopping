
const Products = require('../../Models/product')
const Category = require('../../Models/category')


module.exports.index = async (req, res) => {

    const products = await Products.find()

    res.json(products)
}


module.exports.gender = async (req, res) => {

    const gender = req.query.gender

    const category = await Category.find({ gender: gender })

    res.json(category)

}

//TH: Hàm này dùng để phân loại sản phẩm
module.exports.category = async (req, res) => {

    const id_category = req.query.id_category

    let products_category

    if (id_category === 'all'){
        products_category = await Products.find()
    }else{
        products_category = await Products.find({ id_category: id_category })
    }
    
    res.json(products_category)
}

//TH: Chi Tiết Sản Phẩm
module.exports.detail = async (req, res) => {

    const id = req.params.id

    const product = await Products.findOne({ _id: id })

    res.json(product)

}


// QT: Tìm kiếm phân loại và phân trang sản phẩm
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
    if (category === 'all'){
        products = await Products.find()
    }else{
        products = await Products.find({ id_category: category })
    }

    var paginationProducts = products.slice(start, end)


    if (!keyWordSearch){
        
        res.json(paginationProducts)

    }else{
        var newData = paginationProducts.filter(value => {
            return value.name_product.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
            value.price_product.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json(newData)
    }

}

// Hàm này dùng để hiện những sản phẩm search theo scoll ở component tìm kiếm bên client
module.exports.scoll = async (req, res) => {

    const page = req.query.page
    
    const count = req.query.count

    const search = req.query.search

    //Lấy sản phẩm đầu và sẩn phẩm cuối
    const start = (page - 1) * count
    const end = page * count   

    const products = await Products.find()

    const newData = products.filter(value => {
        return value.name_product.toUpperCase().indexOf(search.toUpperCase()) !== -1
    })

    const paginationProducts = newData.slice(start, end)

    res.json(paginationProducts)

}
