import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { deleteCart, updateCart } from '../Redux/Action/ActionCart';
import { changeCount } from '../Redux/Action/ActionCount';
import CartAPI from '../API/CartAPI'
import queryString from 'query-string'
import CartsLocal from '../Share/CartsLocal';
import CouponAPI from '../API/CouponAPI';

Cart.propTypes = {

};

function Cart(props) {

    const dispatch = useDispatch()

    const [list_carts, set_list_carts] = useState([])

    // state get from redux
    const count_change = useSelector(state => state.Count.isLoad)

    const [total_price, set_total_price] = useState(0)

    // Hàm này dùng để hiện thị danh sách sản phẩm đã thêm vào giỏ hàng
    // và tính tổng tiền
    useEffect(() => {

        set_list_carts(JSON.parse(localStorage.getItem('carts')))

        Sum_Price(JSON.parse(localStorage.getItem('carts')), 0)

    }, [count_change])



    // Hàm này dùng để tính tổng tiền
    function Sum_Price(carts, sum_price) {
        carts.map(value => {
            return sum_price += parseInt(value.count) * parseInt(value.price_product)
        })

        set_total_price(sum_price)
        set_new_price(sum_price)
    }

    // Hàm này dùng để tăng số lượng
    const upCount = (count, id_cart) => {

        const data = {
            id_cart: id_cart,
            count: parseInt(count) + 1
        }

        console.log(data)



        CartsLocal.updateProduct(data)

        const action_change_count = changeCount(count_change)
        dispatch(action_change_count)

    }

    // Hàm này dùng để giảm số lượng
    const downCount = (count, id_cart) => {

        if (parseInt(count) === 1) {
            return
        }

        const data = {
            id_cart: id_cart,
            count: parseInt(count) - 1
        }

        console.log(data)

        CartsLocal.updateProduct(data)

        const action_change_count = changeCount(count_change)
        dispatch(action_change_count)

    }

    // Hàm này dùng để xóa giỏ hàng
    const handler_delete_carts = (id_cart) => {

        CartsLocal.deleteProduct(id_cart)

        // Thay đổi trạng thái trong redux để load lại cart ở phần header
        const action_change_count = changeCount(count_change)
        dispatch(action_change_count)

    }


    // Hàm này này dùng để kiểm tra đăng nhập checkout
    const [show_error, set_show_error] = useState(false)

    const [show_null_cart, set_show_null_cart] = useState(false)

    const handler_checkout = () => {

        if (sessionStorage.getItem('id_user')) {
            if (list_carts.length < 1) {
                set_show_null_cart(true)
            } else {
                window.location.replace('/checkout')
            }
        } else {

            set_show_error(true)

        }

        setTimeout(() => {
            set_show_error(false)
            set_show_null_cart(false)
        }, 1500)

    }


    // Hàm này dùng để kiểm tra coupon
    const [coupon, set_coupon] = useState('')

    const [discount, setDiscount] = useState(0)

    const [new_price, set_new_price] = useState(0)

    const [show_success, set_show_success] = useState(false)

    const [errorCode, setErrorCode] = useState(false)

    const handlerCoupon = async (e) => {

        e.preventDefault()
        
        if (!sessionStorage.getItem('id_user')){
            set_show_error(true)
        }else{

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                code: coupon
            }

            const query = '?' + queryString.stringify(params)

            const response = await CouponAPI.checkCoupon(query)

            if (response.msg === 'Không tìm thấy'){
                setErrorCode(true)
            }else if (response.msg === 'Bạn đã sử dụng mã này rồi'){
                setErrorCode(true)
            }else{
                localStorage.setItem('id_coupon', response.coupon._id)
                localStorage.setItem('coupon', JSON.stringify(response.coupon))

                setDiscount((total_price * response.coupon.promotion) / 100)

                const newTotal = total_price - ((total_price * response.coupon.promotion) / 100)

                set_new_price(newTotal)
                set_show_success(true)
            }

        }

        setTimeout(() => {
            set_show_error(false)
            set_show_null_cart(false)
            set_show_success(false)
            setErrorCode(false)
        }, 1500)
    }

    return (
        <div>
            {
                errorCode &&
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff', backgroundColor: '#f84545' }}></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: '#fff' }}>Vui Lòng Kiểm Tra Lại Mã Code!</h4>
                    </div>
                </div>
            }
            {
                show_success &&
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff' }}></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: '#fff' }}>Áp Dụng Mã Code Thành Công!</h4>
                    </div>
                </div>
            }
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
                                                        <td className="li-product-remove" onClick={() => handler_delete_carts(value.id_cart)}>
                                                            <a style={{ cursor: 'pointer' }}><i className="fa fa-times"></i></a>
                                                        </td>
                                                        <td className="li-product-thumbnail"><Link to={`/detail/${value.id_product}`}><img src={value.image} style={{ width: '5rem' }} alt="Li's Product Image" /></Link></td>
                                                        <td className="li-product-name"><a href="#">{value.name_product}</a></td>
                                                        <td className="li-product-price"><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.price_product)+ ' VNĐ'}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.size}</span></td>
                                                        <td className="quantity">
                                                            <label>Quantity</label>
                                                            <div className="cart-plus-minus">
                                                                <input className="cart-plus-minus-box" value={value.count} type="text" />
                                                                <div className="dec qtybutton" onClick={() => downCount(value.count, value.id_cart)}><i className="fa fa-angle-down"></i></div>
                                                                <div className="inc qtybutton" onClick={() => upCount(value.count, value.id_cart)}><i className="fa fa-angle-up"></i></div>
                                                            </div>
                                                        </td>
                                                        <td className="product-subtotal"><span className="amount">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(parseInt(value.price_product) * parseInt(value.count))+ ' VNĐ'}</span></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="coupon-all">
                                            <div class="coupon">
                                                <input id="coupon_code" class="input-text" onChange={(e) => set_coupon(e.target.value)} value={coupon} placeholder="Coupon code" type="text" /> &nbsp;
                                                <input class="button" value="Apply coupon" type="submit" onClick={handlerCoupon} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 ml-auto">
                                        <div className="cart-page-total">
                                            <h2>Cart totals</h2>
                                            <ul>
                                                <li>Sub Total <span>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(total_price) + ' VNĐ'}</span></li>
                                                <li>Discount <span>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(discount) + ' VNĐ'}</span></li>
                                                <li>Total <span>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(new_price) + ' VNĐ'}</span></li>
                                            </ul>
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