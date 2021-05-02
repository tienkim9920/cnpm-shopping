const Carts = require('../../Models/cart')

module.exports.index = async (req, res) => {

    const id_user = req.query.id_user

    const carts = await Carts.find({ id_user: id_user })

    res.json(carts)

}

module.exports.post_cart = async (req, res) => {

    const user_cart = await Carts.find({ id_user: req.body.id_user })

    if (user_cart.length < 1 ){
        
        await Carts.create(req.body)

    }else{

        // Tìm xem thử sản phẩm này đã mua hay chưa
        const find_cart = user_cart.find(value => {
            return value.id_product === req.body.id_product
        })

        let flag = false

        if (!find_cart){

            await Carts.create(req.body)

        }else{

            // Duyệt vòng for để kiểm tra sản phẩm này đã mua hay chưa
            // Nếu mua rồi thì tiếp tục kiểm tra size
            // nếu vẫn là size cũ thì update không thì ngược lại
            for (let i = 0; i < user_cart.length; i++){
                if (user_cart[i].id_product === req.body.id_product){
                    if (user_cart[i].size === req.body.size){
                        user_cart[i].count = parseInt(user_cart[i].count) + parseInt(req.body.count)
                        flag = true
                        user_cart[i].save()
                        console.log("Update")
                    }
                }
            }

            if (!flag){

                await Carts.create(req.body)
                console.log("Push")

            }
        }
    }

    res.send("Thanh Cong")

}


module.exports.update = async (req, res) => {

    const id_cart = req.query.id_cart

    const count = req.query.count

    const cart = await Carts.findOne({ _id: id_cart })
    cart.count = count
    cart.save()

    res.send("Thanh Cong")

}


module.exports.delete = async (req, res) => {

    const id = req.params.id

    const cart = await Carts.findOne({ _id: id })

    cart.delete()

    res.send("Thanh Cong")

}