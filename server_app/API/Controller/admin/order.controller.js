const Order = require('../../../Models/history')
const Detail_History = require('../../../Models/detail_history')
const Payment = require('../../../Models/payment')

module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const keyWordSearch = req.query.search;
    const status = req.query.status

    const perPage = parseInt(req.query.limit) || 8;
    const totalPage = Math.ceil(await Order.countDocuments() / perPage);

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let orders
    if (status) {
        orders = await Order.find({ status: status }).populate('id_user').populate('id_payment');
    } else {
        orders = await Order.find().populate('id_user').populate('id_payment');
    }



    if (!keyWordSearch) {
        res.json({
            orders: orders.slice(start, end),
            totalPage: totalPage
        })

    } else {
        var newData = orders.filter(value => {
            return value.id.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.fullname.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.phone.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.address.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.id_user.email.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.total.toString().toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.id_payment.pay_name.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json({
            orders: newData.slice(start, end),
            totalPage: totalPage
        })
    }
}

module.exports.details = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const keyWordSearch = req.query.search;

    const perPage = parseInt(req.query.limit) || 8;
    const totalPage = Math.ceil(await Detail_History.countDocuments() / perPage);

    let start = (page - 1) * perPage;
    let end = page * perPage;

    const details = await Detail_History.find({ id_history: req.params.id }).populate('id_history');

    if (!keyWordSearch) {
        res.json({
            details: details.slice(start, end),
            totalPage: totalPage
        })
    } else {
        var newData = details.filter(value => {
            return value.name_product.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.price_product.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.count.toString().toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.size.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json({
            details: newData.slice(start, end),
            totalPage: totalPage
        })
    }
}