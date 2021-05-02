const Product = require('../../../Models/product')

module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const keyWordSearch = req.query.search;

    const perPage = parseInt(req.query.limit) || 8;
    const totalPage = Math.ceil(await Product.countDocuments() / perPage);

    let start = (page - 1) * perPage;
    let end = page * perPage;

    const products = await Product.find().populate('id_category');


    if (!keyWordSearch) {
        res.json({
            products: products.slice(start, end),
            totalPage: totalPage
        })

    } else {
        var newData = products.filter(value => {
            return value.name_product.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.price_product.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.id.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
            // value.id_category.category.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json({
            products: newData.slice(start, end),
            totalPage: totalPage
        })
    }
}

module.exports.create = async (req, res) => {
    const product = await Product.find();

    const productFilter = product.filter((c) => {
        return c.name_product.toUpperCase() === req.body.name.toUpperCase().trim()
    });

    if (productFilter.length > 0) {
        res.json({ msg: 'Sản phẩm đã tồn tại' })
    } else {
        var newProduct = new Product()
        req.body.name = req.body.name.toLowerCase().replace(/^.|\s\S/g, a => { return a.toUpperCase() })
        newProduct.name_product = req.body.name
        newProduct.price_product = req.body.price
        newProduct.id_category = req.body.category
        newProduct.number = req.body.number
        newProduct.describe = req.body.description
        newProduct.gender = req.body.gender
        if (req.files.file) {
            var fileImage = req.files.file;

            var fileName = fileImage.name


            var fileProduct = "/img/" + fileName

            newProduct.image = fileProduct

            fileImage.mv('./public/img/' + fileName)
        }
        else newProduct.image = '/img/nophoto.jpg'

        newProduct.save();
        res.json({ msg: "Bạn đã thêm thành công" })
    }
}

module.exports.delete = async (req, res) => {
    const id = req.query.id;

    await Product.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: err })
            return;
        }
        res.json({ msg: "Thanh Cong" })
    })
}
