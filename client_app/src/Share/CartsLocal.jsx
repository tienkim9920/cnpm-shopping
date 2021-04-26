

const CartsLocal = {

    addProduct: (data) => {
        //Lấy dữ liệu từ local
        const data_add_cart = data

        //Lấy dữ liệu có sẵn trong state
        const add_cart = JSON.parse(localStorage.getItem('carts'))

        console.log(add_cart.length)
        console.log(data_add_cart)

        if (add_cart.length < 1) {

            add_cart.push(data_add_cart)

            localStorage.setItem('carts', JSON.stringify(add_cart))

        } else {           

            //Tìm xem thử sản phẩm này đã mua hay chưa
            const findCart = add_cart.find(value => {
                return value.id_product === data_add_cart.id_product
            })

            let flag = false

            //Nếu này chưa được mua thì mình push vào
            //Còn đã từng mua rồi thì mình update tại vị trí indexCart mà mình vừa tìm được
            if (!findCart) {
                add_cart.push(data_add_cart)
                
                localStorage.setItem('carts', JSON.stringify(add_cart))
            } else {
                for (let i = 0; i < add_cart.length; i++) {
                    if (add_cart[i].id_product === data_add_cart.id_product) {
                        if (add_cart[i].size === data_add_cart.size) {
                            add_cart[i].count = parseInt(add_cart[i].count) + parseInt(data_add_cart.count)
                            flag = true
                            console.log("Update")

                            localStorage.setItem('carts', JSON.stringify(add_cart))
                        }
                    }
                }

                if (!flag) {
                    add_cart.push(data_add_cart)
                    console.log("Push")

                    localStorage.setItem('carts', JSON.stringify(add_cart))
                }
            }
        }
    },

    deleteProduct: (data) => {
        //Lấy dữ diệu có sẵn trong state
        const delete_cart = JSON.parse(localStorage.getItem('carts'))

        console.log(data)

        //Tìm kiểm vị trí mà cần xóa
        const indexDelete = delete_cart.findIndex(value => {
            return value.id_cart === data
        })

        //Xóa theo vị trí
        delete_cart.splice(indexDelete, 1)

        localStorage.setItem('carts', JSON.stringify(delete_cart))
    },

    updateProduct: (data) => {
        const data_update_cart = data
            
        const update_cart = JSON.parse(localStorage.getItem('carts'))

        const index = update_cart.findIndex(value => {
            return value.id_cart === data_update_cart.id_cart
        })

        update_cart[index].count = data_update_cart.count

        localStorage.setItem('carts', JSON.stringify(update_cart))
    }

}

export default CartsLocal