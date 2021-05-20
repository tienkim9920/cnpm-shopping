const Coupon = require('../../../Models/coupon');
const Detail_Coupon = require('../../../Models/detail_coupon')

module.exports.index = async (req, res) => {

    let page = parseInt(req.query.page) || 1;
    const keyWordSearch = req.query.search;

    const perPage = parseInt(req.query.limit) || 8;
    const totalPage = Math.ceil(await Detail_Coupon.countDocuments() / perPage);

    let start = (page - 1) * perPage;
    let end = page * perPage;

    const detail_coupon = await Detail_Coupon.find();

    if (!keyWordSearch) {
        res.json({
            coupons: detail_coupon.slice(start, end),
            totalPage: totalPage
        })

    } else {
        var newData = detail_coupon.filter(value => {
            return value.code.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.promotion.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json({
            coupons: newData.slice(start, end),
            totalPage: totalPage
        })
    }

}

module.exports.create = async (req, res) => {

    await Detail_Coupon.create(req.body)

    res.json({ msg: "Bạn đã thêm thành công"})

}

module.exports.update = async (req, res) => {

    const id = req.params.id

    const coupon = await Detail_Coupon.findOne({ _id: id })

    coupon.code = req.body.code
    coupon.count = req.body.count
    coupon.promotion = req.body.promotion
    coupon.describe = req.body.describe

    coupon.save()

    res.json({ msg: "Bạn đã cập nhật thành công"})

}

module.exports.delete = async (req, res) => {

    const id = req.params.id

    await Detail_Coupon.deleteOne({ _id: id })

    res.json("Thanh Cong")

}

module.exports.detail = async (req, res) => {

    const id = req.params.id

    const coupon = await Detail_Coupon.findOne({ _id: id })

    res.json(coupon)

}

module.exports.checking = async (req, res) => {

    const code = req.query.code

    const id_user = req.query.id_user

    const coupon = await Detail_Coupon.findOne({ code })

    if (!coupon){
        res.json({ msg: "Không tìm thấy" })
    }

    const checkCoupon = await Coupon.findOne({ id_user: id_user, coupon: coupon._id })

    if (checkCoupon){
        res.json({ msg: "Bạn đã sử dụng mã này rồi"})
    }

    res.json({ msg: "Thành công", coupon: coupon })

}

module.exports.createCoupon = async (req, res) => {

    const coupon = await Coupon.create(req.body)

    const detail_coupon = await Detail_Coupon.findOne({ _id: req.body.coupon })

    detail_coupon.count = parseInt(detail_coupon.count) - 1

    detail_coupon.save()

    res.json(coupon)

}