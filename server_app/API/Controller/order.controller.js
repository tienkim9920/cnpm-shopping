
const mailer = require('../../mailer')


const History = require('../../Models/history')
const Detail_History = require('../../Models/detail_history')
const Carts = require('../../Models/cart')
const Delivery = require('../../Models/delivery')


// Đặt hàng theo phương thức thanh toán trực tiếp
module.exports.post_order = async (req, res) => {

    //B1: Đầu tiên sẽ thêm vào history
    await History.create(req.body)

    //B2: Thêm tất cả những sản phẩm vào detail_history
    const carts = await Carts.find({ id_user: req.body.id_user })

    //B3: Bắt đầu gửi Mail xác nhận đơn hàng
    const htmlHead = '<table style="width:50%">' + 
        '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Size</th><th style="border: 1px solid black;">Thành Tiền</th>'

    let htmlContent = ""

    for (let i = 0; i < carts.length; i++){
        htmlContent += '<tr>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].name_product + '</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' + carts[i].image + '" width="80" height="80"></td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].price_product + '$</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].count + '</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + carts[i].size + '</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + ( parseInt(carts[i].price_product) * parseInt(carts[i].count) ) + '$</td>' + 
        '<tr>'
    }    

    const htmlResult = '<h1>Xin Chào ' + req.body.fullname + '</h1>' + '<h3>Phone: ' + req.body.phone + '</h3>' + '<h3>Address:' + req.body.address + '</h3>' +
        htmlHead + htmlContent + '<h1>Phí Vận Chuyển: ' + req.body.price + '$</h1></br>' + '<h1>Tổng Thanh Toán: ' + req.body.total + '$</h1></br>' + '<p>Cảm ơn bạn!</p>'

    // Thực hiện gửi email (to, subject, htmlContent)
    await mailer.sendMail(req.body.email, 'Hóa Đơn Đặt Hàng', htmlResult)


    //B4: Dùng để lấy _id của history
    const history = await History.findOne({ id_find: req.body.id_find })

    for (let i = 0; i < carts.length; i++){

        const data = {
            id_history: history._id,
            name_product: carts[i].name_product,
            price_product: carts[i].price_product,
            count: carts[i].count,
            image: carts[i].image,
            size: carts[i].size
        }

        await Detail_History.create(data)

        //B5: Xóa giỏ hàng
        carts[i].delete()

    }

    //B6: Tiến hành thực hiện push data vào Delivery
    const data_delivery = {
        id_history: history._id,
        from: req.body.from,
        to: req.body.to,
        distance: req.body.distance,
        duration: req.body.duration,
        price: req.body.price
    }

    await Delivery.create(data_delivery)

    res.send("Thanh Cong")
    
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