import React, { useEffect, useState } from 'react';
import './Checkout.css'
import CartAPI from '../API/CartAPI';
import queryString from 'query-string'
import OrderAPI from '../API/OrderAPI';
import Paypal from './Paypal';
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import { changeCount } from '../Redux/Action/ActionCount';
import { useDispatch, useSelector } from 'react-redux';

Checkout.propTypes = {

};

function Checkout(props) {

    const [carts, set_carts] = useState([])

    const [total_price, set_total_price] = useState(0)

    useEffect(() => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user')
            }

            const query = '?' + queryString.stringify(params)

            const response = await CartAPI.Get_Cart(query)
            set_carts(response)

            Sum_Price(response, 0)

        }

        fetchData()

    }, [])

    // Hàm này dùng để tính tổng tiền
    function Sum_Price(carts, sum_price){
        carts.map(value => {
            return sum_price += parseInt(value.count) * parseInt(value.price_product)
        })

        set_total_price(sum_price)
    }

    const [show_error, set_show_error] = useState(false)

    const [information, set_information] = useState({
        fullname: '',
        phone: '',
        address: '',
        email: ''
    })

    const onChangeFullname = (e) => {
        set_information({
            fullname: e.target.value,
            phone: information.phone,
            address: information.address,
            email: information.email
        })
    }
    const onChangePhone = (e) => {
        set_information({
            fullname: information.fullname,
            phone: e.target.value,
            address: information.address,
            email: information.email
        })
    }

    const onChangeAddress = (e) => {
        set_information({
            fullname: information.fullname,
            phone: information.phone,
            address: e.target.value,
            email: information.email
        })
    }
    const onChangeEmail = (e) => {
        set_information({
            fullname: information.fullname,
            phone: information.phone,
            address: information.address,
            email: e.target.value
        })
    }

    // Hàm này dùng để check validation cho paypal
    useEffect(() => {

        checkValidation()

    }, [information])

    // Kiểm tra Paypal
    function checkValidation() {
        if (information.fullname === ''){
            set_show_error(true)
        }else{
            if (information.phone === ''){
                set_show_error(true)
            }else{
                if (information.address === ''){
                    set_show_error(true)
                }else{
                    if (information.email === ''){
                        set_show_error(true)
                    }else{
                        set_show_error(false)
                    }
                }
            }
        }
    }


    const { register, handleSubmit, errors } = useForm();

    const [redirect, set_redirect] = useState(false)


    const [load_order, set_load_order] = useState(false)

    const count_change = useSelector(state => state.Count.isLoad)

    const dispatch = useDispatch()

    // Hàm này dùng để thanh toán offline
    const handler_Checkout = (data) => {

        set_load_order(true)

        const body = {
            id_user: sessionStorage.getItem('id_user'),
            id_find: Math.random().toString(),
            fullname: data.fullname,
            phone: data.phone,
            address: data.address,
            email: data.email,
            total: total_price,
            status: false,
            delivery: false,
            id_payment: '60635313a1ba573dc01656b6'
        }

        const post_data = async () => {

            const response = await OrderAPI.post_order(body)

            console.log(response)

            set_redirect(true)

            // Hàm này dùng để load lại phần header bằng Redux
            const action_count_change = changeCount(count_change)
            dispatch(action_count_change)

        }

        post_data()

    }

    const Change_Load_Order = (value) => {

        set_load_order(value)

    }

    return (
        <div>

            {
                load_order && (
                    <div className="wrapper_loader">
                        <div className="loader"></div>
                    </div>
                )
            }

            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Checkout</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem'}}>
                <div className="row">
                    <div className="col-lg-6 col-12 pb-5">
                        <form onSubmit={handleSubmit(handler_Checkout)}>
                            <div className="checkbox-form">
                                <h3>Billing Details</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Full Name <span className="required">*</span></label>
                                            <input placeholder="Enter Fullname" type="text" name="fullname" 
                                                ref={register({ required: true })}
                                                value={information.fullname} 
                                                onChange={onChangeFullname}/>
                                            {errors.fullname && errors.fullname.type === "required" && <span style={{ color: 'red' }}>* Fullname is required</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Phone Number <span className="required">*</span></label>
                                            <input placeholder="Enter Phone Number" type="text" name="phone"
                                                ref={register({ required: true })}
                                                value={information.phone} 
                                                onChange={onChangePhone} />
                                            {errors.phone && errors.phone.type === "required" && <span style={{ color: 'red' }}>* Phone Number is required</span>}                                                
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Address <span className="required">*</span></label>
                                            <input placeholder="Street address" type="text" name="address"
                                                ref={register({ required: true })}
                                                value={information.address} 
                                                onChange={onChangeAddress} />
                                            {errors.address && errors.address.type === "required" && <span style={{ color: 'red' }}>* Address is required</span>}                                               
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Email <span className="required">*</span></label>
                                            <input placeholder="Enter Email" type="email" name="email"
                                                ref={register({ required: true })}
                                                value={information.email} 
                                                onChange={onChangeEmail} />
                                            {errors.email && errors.email.type === "required" && <span style={{ color: 'red' }}>* Email is required</span>}                                               
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="order-button-payment">
                                            {
                                                redirect && <Redirect to="/success" />
                                            }
                                            <input value="Place order" type="submit" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="your-order">
                            <h3>Your order</h3>
                            <div className="your-order-table table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="cart-product-name">Product</th>
                                            <th className="cart-product-total">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            carts && carts.map(value => (
                                                <tr className="cart_item" key={value._id}>
                                                    <td className="cart-product-name">{value.name_product}<strong className="product-quantity"> × {value.count}</strong></td>
                                                    <td className="cart-product-total"><span className="amount">${parseInt(value.price_product) * parseInt(value.count)}</span></td>
                                                </tr>
                                            ))
                                        }      
                                    </tbody>
                                    <tfoot>
                                        <tr className="cart-subtotal">
                                            <th>Cart Subtotal</th>
                                            <td><span className="amount">${total_price}</span></td>
                                        </tr>
                                        <tr className="order-total">
                                            <th>Order Total</th>
                                            <td><strong><span className="amount">${total_price}</span></strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="payment-method">
                                <div className="payment-accordion">
                                    <div id="accordion">
                                        <div className="card">
                                            <div className="card-header" id="#payment-3">
                                                <h5 className="panel-title">
                                                    <a className="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        PayPal
                                                </a>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse">
                                                <div className="card-body">
                                                    {
                                                        show_error ? 'Vui Lòng Kiểm Tra Lại Thông Tin' :
                                                        <Paypal information={information} total={total_price} Change_Load_Order={Change_Load_Order} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Checkout;