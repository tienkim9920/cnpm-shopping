const Order = require('../../../Models/order')
const Detail_History = require('../../../Models/detail_order')
const Payment = require('../../../Models/payment')
const Delivery = require('../../../Models/delivery')

module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let money = 0;
    const keyWordSearch = req.query.search;
    const status = req.query.status

    const perPage = parseInt(req.query.limit) || 8;

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let orders
    if (status) {
        orders = await (await Order.find({ status: status }).populate('id_user').populate('id_payment').populate('id_note')).reverse();
    } else {
        orders = await (await Order.find().populate('id_user').populate('id_note').populate('id_payment')).reverse();
    }

    const totalPage = Math.ceil(orders.length / perPage);

    orders.map((value) => {
        money += Number(value.total);
    })

    if (!keyWordSearch) {
        res.json({
            orders: orders.slice(start, end),
            totalPage: totalPage,
            totalMoney: money
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
            totalPage: totalPage,
            totalMoney: money
        })
    }
}

module.exports.detailOrder = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const keyWordSearch = req.query.search;

    const perPage = parseInt(req.query.limit) || 8;

    let start = (page - 1) * perPage;
    let end = page * perPage;

    const details = await Detail_History.find({ id_order: req.params.id }).populate('id_order').populate('id_product');

    const totalPage = Math.ceil(details.length / perPage);

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

module.exports.details = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id }).populate('id_user').populate('id_payment').populate('id_note');

    res.json(order)

}

module.exports.confirmOrder = async (req, res) => {
    await Order.updateOne({ _id: req.query.id }, { status: "2" }, function (err, res) {
        if (err) return res.json({ msg: err });
    });
    res.json({ msg: "Thanh Cong" })
}

module.exports.delivery = async (req, res) => {
    await Order.updateOne({ _id: req.query.id }, { status: "3" }, function (err, res) {
        if (err) return res.json({ msg: err });
    });
    res.json({ msg: "Thanh Cong" })
}

module.exports.confirmDelivery = async (req, res) => {
    await Order.updateOne({ _id: req.query.id }, { status: "4" }, function (err, res) {
        if (err) return res.json({ msg: err });
    });
    res.json({ msg: "Thanh Cong" })
}


module.exports.cancelOrder = async (req, res) => {
    await Order.updateOne({ _id: req.query.id }, { status: "5" }, function (err, res) {
        if (err) return res.json({ msg: err });
    });
    res.json({ msg: "Thanh Cong" })
}