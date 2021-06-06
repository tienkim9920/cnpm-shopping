
const mailer = require('../../mailer')

const Order = require('../../Models/order')
const Detail_Order = require('../../Models/detail_order')

// Đặt hàng
module.exports.post_order = async (req, res) => {

    const order = await Order.create(req.body)

    res.json(order)

}

module.exports.get_order = async (req, res) => {

    const id_user = req.params.id

    const order = await Order.find({ id_user }).populate(['id_user', 'id_note'])

    res.json(order)

}

module.exports.get_detail = async (req, res) => {

    const id_order = req.params.id

    const order = await Order.findOne({ _id: id_order }).populate(['id_user', 'id_note'])

    res.json(order)

}

module.export.get_order_detail = async (req, res) => {
 const id = req.params.id
	console.log(id)
	const order = await Order.find({_id: id })
	res.json(order)
}

module.export.add_to_cart = async (req, res) => {
	
	const count = req.query.count
	const id_user = req.query.id_user
	
	const order = await Order.find({id_user: id_user})	
	
	res.json(order)
}










































// module.exports.post_paypal = async (req, res) => {

//     var create_payment_json = {
//         "intent": "authorize",
//         "payer": {
//             "payment_method": "paypal"
//         },
//         "redirect_urls": {
//             "return_url": "http://localhost:3000/success",
//             "cancel_url": "http://localhost:3000/fail"
//         },
//         "transactions": [{
//             "item_list": {
//                 "items": [{
//                     "name": "item", // Tên sản phẩm
//                     "sku": "item", // mã sản phẩm
//                     "price": "1.00", // giá tiền
//                     "currency": "USD",
//                     "quantity": 1 // số lượng
//                 }]
//             },
//             "amount": {
//                 "currency": "USD",
//                 "total": "1.00" // tổng số tiền phụ thuộc vào mình code
//             },
//             "description": "This is the payment description."
//         }]
//     };

//     paypal.payment.create(create_payment_json, function (error, payment) {
//         if (error) {
//             console.log(error.response);
//             throw error;
//         } else {
//             for (var index = 0; index < payment.links.length; index++) {
//             //Redirect user to this endpoint for redirect url
//                 if (payment.links[index].rel === 'approval_url') {
//                     console.log(payment.links[index].href);
//                 }
//             }
//             console.log(payment);
//         }
//     });

//     res.send("Thanh Cong")

// }