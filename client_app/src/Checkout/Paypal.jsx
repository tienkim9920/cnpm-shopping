import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import OrderAPI from '../API/OrderAPI';
import { changeCount } from '../Redux/Action/ActionCount';
import { useDispatch, useSelector } from 'react-redux';
import NoteAPI from '../API/NoteAPI';
import Detail_OrderAPI from '../API/Detail_OrderAPI';
import CouponAPI from '../API/CouponAPI';

const socket = io('https://hieusuper20hcm.herokuapp.com/', {
    transports: ['websocket'], jsonp: false
});
socket.connect();

Paypal.propTypes = {
    information: PropTypes.object,
    total: PropTypes.number,
    Change_Load_Order: PropTypes.func,
    from: PropTypes.string,
    distance: PropTypes.string,
    duration: PropTypes.string,
    price: PropTypes.string,
};

Paypal.defaultProps = {
    information: {},
    total: 0,
    Change_Load_Order: null,
    from: '',
    distance: '',
    duration: '',
    price: '',
}

function Paypal(props) {

    const { information, total, Change_Load_Order, from, distance, duration, price } = props

    const paypal = useRef()

    const [redirect, set_redirect] = useState(false)

    const count_change = useSelector(state => state.Count.isLoad)

    const dispatch = useDispatch()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Hóa Đơn Đặt Hàng",
                            amount: {
                                currency_code: "USD",
                                value: total,
                            },
                        },
                    ],
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order)

                Change_Load_Order(true)

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
                    id_payment: '60635313a1ba573dc01656b5',
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

                // data email
                // const data_email = {
                //     id_order: response_order._id,
                //     total: total,
                //     fullname: information.fullname,
                //     phone: information.phone,
                //     price: price,
                //     address: information.address,
                //     email: information.email
                // }

                // // Xử lý API Send Mail

                // const send_mail = await OrderAPI.post_email(data_email)
                // console.log(send_mail)
                
                localStorage.removeItem('information')
                localStorage.removeItem('total_price')
                localStorage.removeItem('price')
                localStorage.removeItem('id_coupon')
                localStorage.removeItem('coupon')
                localStorage.setItem('carts', JSON.stringify([]))

                set_redirect(true)

                // Hàm này dùng để load lại phần header bằng Redux
                const action_count_change = changeCount(count_change)
                dispatch(action_count_change)

            },
            onError: (err) => {
                console.log("Vui Lòng Kiểm Tra Lại Thông Tin")
            }
        }).render(paypal.current)

    }, [])

    return (
        <div>
            {
                redirect && <Redirect to="/success" />
            }
            <div ref={paypal}>

            </div>
        </div>

    );
}

export default Paypal;