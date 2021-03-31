import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import OrderAPI from '../API/OrderAPI';
import { changeCount } from '../Redux/Action/ActionCount';
import { useDispatch, useSelector } from 'react-redux';

Paypal.propTypes = {
    information: PropTypes.object,
    total: PropTypes.number,
    Change_Load_Order: PropTypes.func
};

Paypal.defaultProps = {
    information: {},
    total: 0,
    Change_Load_Order: null
}

function Paypal(props) {

    const { information, total, Change_Load_Order } = props

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

                const body = {
                    id_user: sessionStorage.getItem('id_user'),
                    id_find: Math.random().toString(),
                    fullname: information.fullname,
                    phone: information.phone,
                    address: information.address,
                    email: information.email,
                    total: total,
                    status: true, // Thanh Toán
                    delivery: false,
                    id_payment: '60635313a1ba573dc01656b5' //Paypal
                }
        
                // Gọi API Đặt Hàng theo phương thức POST
                const response = await OrderAPI.post_order(body)
        
                console.log(response)
        
                set_redirect(true)
        
                // Hàm này dùng để load lại phần header bằng Redux
                const action_count_change = changeCount(count_change)
                dispatch(action_count_change)
        

                set_redirect(true)
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