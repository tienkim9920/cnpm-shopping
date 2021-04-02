import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { deleteCart, updateCart } from '../Redux/Action/ActionCart';
import { changeCount } from '../Redux/Action/ActionCount';
import CartAPI from '../API/CartAPI'
import queryString from 'query-string'

Cart.propTypes = {
    
};

function Cart(props) {

    //carts được lấy từ redux
    const carts = useSelector(state => state.Cart.listCart)

    const dispatch = useDispatch()

    const [list_carts, set_list_carts] = useState([])

    // state get from redux
    const count_change = useSelector(state => state.Count.isLoad)

    const [total_price, set_total_price] = useState(0)

    // Hàm này dùng để hiện thị danh sách sản phẩm đã thêm vào giỏ hàng
    // và tính tổng tiền
    useEffect(() => {

        if (sessionStorage.getItem('id_user')){

            const fetchData = async () => {
                const params = {
                    id_user: sessionStorage.getItem('id_user')
                }
    
                const query = '?' + queryString.stringify(params)
    
                const response_carts = await CartAPI.Get_Cart(query)

                set_list_carts(response_carts)

                Sum_Price(response_carts, 0)
            }

            fetchData()

        }else{
            set_list_carts(carts)
            
            Sum_Price(carts, 0)

        }


    }, [count_change])

    // Hàm này dùng để tính tổng tiền
    function Sum_Price(carts, sum_price){
        carts.map(value => {
            return sum_price += parseInt(value.count) * parseInt(value.price_product)
        })

        set_total_price(sum_price)
    }

    // Hàm này dùng để tăng số lượng
    const upCount = (count, id_cart) => {

        const data = {
            id_cart: id_cart,
            count: parseInt(count) + 1
        }

        console.log(data)

        if (sessionStorage.getItem('id_user')){ // Khi khách hàng đã đăng nhập

            // Gọi API bằng phương thức PUT để cập nhật dữ liệu
            const putData = async () => {
                const query = '?' + queryString.stringify(data)

                const response = await CartAPI.Put_Cart(query)
                console.log(response)
            }

            putData()

            const action_change_count = changeCount(count_change)
            dispatch(action_change_count)

        }else{ // Khi khách hàng chưa đăng nhập
            const action = updateCart(data)
            dispatch(action)
    
            const action_change_count = changeCount(count_change)
            dispatch(action_change_count)
        }

    }

    // Hàm này dùng để giảm số lượng
    const downCount = (count, id_cart) => {

        if (parseInt(count) === 1){
            return
        }

        const data = {
            id_cart: id_cart,
            count: parseInt(count) - 1
        }

        console.log(data)

        if (sessionStorage.getItem('id_user')){ // Khi khách hàng đã đăng nhập

            // Gọi API bằng phương thức PUT để cập nhật dữ liệu
            const putData = async () => {
                const query = '?' + queryString.stringify(data)

                const response = await CartAPI.Put_Cart(query)
                console.log(response)
            }

            putData()

            const action_change_count = changeCount(count_change)
            dispatch(action_change_count)

        }else{ // Khi khách hàng chưa đăng nhập
            const action = updateCart(data)
            dispatch(action)
    
            const action_change_count = changeCount(count_change)
            dispatch(action_change_count)
        }

    }

    // Hàm này dùng để xóa giỏ hàng
    const handler_delete_carts = (id_cart) => {
        
        if (sessionStorage.getItem('id_user')){ // Khi khách hàng đã đăng nhập
            
            const deleteData = async () => {

                const response = await CartAPI.Delete_Cart(id_cart)

                console.log("Xoa " + response)

            }

            deleteData()

            const action_change_count = changeCount(count_change)
            dispatch(action_change_count)

        }else{ // Khi khách hàng chưa đăng nhập

            const action = deleteCart(id_cart)
            dispatch(action)

            // Thay đổi trạng thái trong redux để load lại cart ở phần header
            const action_change_count = changeCount(count_change)
            dispatch(action_change_count)

        }

    }


    // Hàm này này dùng để kiểm tra đăng nhập checkout
    const [redirect, set_redirect] = useState(false)

    const [show_error, set_show_error] = useState(false)

    const [show_null_cart, set_show_null_cart] = useState(false)

    const handler_checkout = () => {

        if (sessionStorage.getItem('id_user')){
            if (list_carts.length < 1){
                set_show_null_cart(true)
            }else{
                set_redirect(true)
            }
        }else{

            set_show_error(true)

        }

        setTimeout(() => {
            set_show_error(false)
            set_show_null_cart(false)
        }, 1500)

    }

    return (
        <div>
            {
                show_error && 
                    <div className="modal_success">
                        <div className="group_model_success pt-3">
                            <div className="text-center p-2">
                                <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff', backgroundColor: '#f84545' }}></i>
                            </div>
                            <h4 className="text-center p-3" style={{ color: '#fff' }}>Vui Lòng Kiểm Tra Tình Trạng Đăng Nhập!</h4>
                        </div>
                    </div>
            }
            {
                show_null_cart && 
                    <div className="modal_success">
                        <div className="group_model_success pt-3">
                            <div className="text-center p-2">
                                <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff', backgroundColor: '#f84545' }}></i>
                            </div>
                            <h4 className="text-center p-3" style={{ color: '#fff' }}>Vui Lòng Kiểm Tra Lại Giỏ Hàng!</h4>
                        </div>
                    </div>
            }

            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Shopping Cart</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="Shopping-cart-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form action="#">
                                <div className="table-content table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="li-product-remove">remove</th>
                                                <th className="li-product-thumbnail">images</th>
                                                <th className="cart-product-name">Product</th>
                                                <th className="li-product-price">Price</th>
                                                <th className="li-product-price">Size</th>
                                                <th className="li-product-quantity">Quantity</th>
                                                <th className="li-product-subtotal">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list_carts && list_carts.map((value, index) => (
                                                <tr key={index}>
                                                    <td className="li-product-remove" onClick={sessionStorage.getItem('id_user') ? () => handler_delete_carts(value._id) : () => handler_delete_carts(value.id_cart)}>
                                                        <a style={{ cursor: 'pointer' }}><i className="fa fa-times"></i></a>
                                                    </td>
                                                    <td className="li-product-thumbnail"><Link to={`/detail/${value.id_product}`}><img src={value.image} style={{ width: '5rem'}} alt="Li's Product Image" /></Link></td>
                                                    <td className="li-product-name"><a href="#">{value.name_product}</a></td>
                                                    <td className="li-product-price"><span className="amount">${value.price_product}</span></td>
                                                    <td className="li-product-price"><span className="amount">{value.size}</span></td>
                                                    <td className="quantity">
                                                        <label>Quantity</label>
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" value={value.count} type="text" />
                                                            <div className="dec qtybutton" onClick={() => downCount(value.count, value._id)}><i className="fa fa-angle-down"></i></div>
                                                            <div className="inc qtybutton" onClick={() => upCount(value.count, value._id)}><i className="fa fa-angle-up"></i></div>
                                                        </div>
                                                    </td>
                                                    <td className="product-subtotal"><span className="amount">${parseInt(value.price_product) * parseInt(value.count)}</span></td>
                                                </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="coupon-all">
                                            <div className="coupon">
                                                <input id="coupon_code" className="input-text" name="coupon_code" placeholder="Coupon code" type="text" />
                                                <input className="button" name="apply_coupon" value="Apply coupon" type="submit" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 ml-auto">
                                        <div className="cart-page-total">
                                            <h2>Cart totals</h2>
                                            <ul>
                                                <li>Subtotal <span>${total_price}</span></li>
                                                <li>Total <span>${total_price}</span></li>
                                            </ul>
                                            {
                                                redirect && <Redirect to="/checkout" />
                                            }
                                            <a style={{ color: '#fff', cursor: 'pointer', fontWeight: '600' }} onClick={handler_checkout}>Proceed to checkout</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;