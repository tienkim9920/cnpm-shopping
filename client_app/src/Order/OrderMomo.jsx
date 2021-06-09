import React, { useState, useEffect } from 'react';
import crypto from 'crypto'
import { useDispatch, useSelector } from 'react-redux';
import { changeCount } from '../Redux/Action/ActionCount';
import CouponAPI from '../API/CouponAPI';
import NoteAPI from '../API/NoteAPI';
import OrderAPI from '../API/OrderAPI';
import Detail_OrderAPI from '../API/Detail_OrderAPI';

function OrderMomo(props) {
    const { search } = window.location;

    const [note, setNote] = useState('')

    const count_change = useSelector(state => state.Count.isLoad)

    const dispatch = useDispatch()

    useEffect(() => {

        const information = JSON.parse(localStorage.getItem('information'))
        const total = localStorage.getItem('total_price')
        const price = localStorage.getItem('price')

        const fetchData = async () => {
            const serectkey = "uLb683H8g9dWuiyipZbLHgO6zjSDlVm5"
            const accessKey = new URLSearchParams(search).get('accessKey')
            const amount = new URLSearchParams(search).get('amount')
            const extraData = new URLSearchParams(search).get('extraData')
            const errorCode = new URLSearchParams(search).get('errorCode')
            const localMessage = new URLSearchParams(search).get('localMessage')
            const message = new URLSearchParams(search).get('message')
            const orderId = new URLSearchParams(search).get('orderId')
            const orderInfo = new URLSearchParams(search).get('orderInfo')
            const orderType = new URLSearchParams(search).get('orderType')
            const partnerCode = new URLSearchParams(search).get('partnerCode')
            const payType = new URLSearchParams(search).get('payType')
            const requestId = new URLSearchParams(search).get('requestId')
            const responseTime = new URLSearchParams(search).get('responseTime')
            const transId = new URLSearchParams(search).get('transId')

            let param = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&transId=${transId}&message=${message}&localMessage=${localMessage}&responseTime=${responseTime}&errorCode=${errorCode}&payType=${payType}&extraData=${extraData}`

            var signature = crypto.createHmac('sha256', serectkey)
                .update(param)
                .digest('hex');

            if (new URLSearchParams(search).get('signature') !== signature) {
                setNote("Information Request Invalid")
                return;
            }
            if (errorCode == 0) {

                if (!information)
                {
                    window.location.href = '/'
                    return
                }

                if (localStorage.getItem("id_coupon")){

                    const responseUpdate = await CouponAPI.updateCoupon(localStorage.getItem("id_coupon"))
                    console.log(responseUpdate)
        
                }

                // data Note
                const data_note = {
                    fullname: information.fullname,
                    phone: information.phone,
                }

                // Xứ lý API Note
                const response_Note = await NoteAPI.post_note(data_note)

                // data Order
                const data_order = {
                    id_user: sessionStorage.getItem('id_user'),
                    address: information.address,
                    total: total,
                    status: '1',
                    pay: true,
                    id_payment: '60c05c3adae4bef7b3d55fbf',
                    id_note: response_Note._id,
                    feeship: price,
                    id_coupon: localStorage.getItem('id_coupon') ? localStorage.getItem('id_coupon') : '',
                    create_time: `${new Date().getDate()}/${parseInt(new Date().getMonth()) + 1}/${new Date().getFullYear()}`
                }

                // Xứ lý API Order
                const response_order = await OrderAPI.post_order(data_order)

                // data carts
                const data_carts = JSON.parse(localStorage.getItem('carts'))

                // Xử lý API Detail_Order
                for (let i = 0; i < data_carts.length; i++) {

                    const data_detail_order = {
                        id_order: response_order._id,
                        id_product: data_carts[i].id_product,
                        name_product: data_carts[i].name_product,
                        price_product: data_carts[i].price_product,
                        count: data_carts[i].count,
                        size: data_carts[i].size
                    }

                    await Detail_OrderAPI.post_detail_order(data_detail_order)

                }

                localStorage.setItem('carts', JSON.stringify([]))
                localStorage.removeItem('information')
                localStorage.removeItem('total_price')
                localStorage.removeItem('price')
                localStorage.removeItem('id_coupon')
                localStorage.removeItem('coupon')


                // Hàm này dùng để load lại phần header bằng Redux
                const action_count_change = changeCount(count_change)
                dispatch(action_count_change)

                setTimeout(() => {
                    window.location.href = '/history'
                }, 2500)

                setNote("You Have Ordered Successfully")

            } else {
                setNote("You Have Ordered Fail")
            }

        }
        fetchData()

    }, [])

    return (
        <div className="container fix_order">
            <h1>{note}</h1>
            <span style={{ fontSize: '1.2rem' }}>Please Checking Information Again!</span>
        </div>
    );
}

export default OrderMomo;