import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Cart from '../API/CartAPI';
import User from '../API/User';
import logo from '../Image/1.jpg'
import { addUser, deleteCart } from '../Redux/Action/ActionCart';
import { changeCount } from '../Redux/Action/ActionCount';
import { addSession, deleteSession } from '../Redux/Action/ActionSession';
import queryString from 'query-string'
import Product from '../API/Product';

function Header(props) {

    // Xử lý thanh navigation
    const [header_navbar, set_header_navbar] = useState('header-bottom header-sticky')

    window.addEventListener('scroll', () => {

        if (window.pageYOffset < 200){
            set_header_navbar('header-bottom header-sticky')
        }else{
            set_header_navbar('header-bottom header-sticky offset_navigation animate__animated animate__fadeInUp')
        }

    })

    const dispatch = useDispatch()

    //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
    // đưa dữ liệu vào Redux
    if (sessionStorage.getItem('id_user')){
        const action = addSession(sessionStorage.getItem('id_user'))
        dispatch(action)
    }else{
        //Đưa idTemp vào Redux temp để tạm lưu trữ
        sessionStorage.setItem('id_temp', 'abc999')
        const action = addUser(sessionStorage.getItem('id_temp'))
        dispatch(action)
    }

    //Get IdUser từ redux khi user đã đăng nhập
    var id_user = useSelector(state => state.Session.idUser)

    // Get carts từ redux khi user chưa đăng nhập
    const carts = useSelector(state => state.Cart.listCart)

    const [active_user, set_active_user] = useState(false)

    const [user, set_user] = useState({})

    // Hàm này dùng để hiện thị
    useEffect(() => {

        if (!id_user){ // user chưa đăng nhâp

            set_active_user(false)

        }else{ // user đã đăng nhâp

            set_active_user(true)

            const fetchData = async () => {

                const response = await User.Get_User(sessionStorage.getItem('id_user'))

                set_user(response)

                const params = {
                    id_user: sessionStorage.getItem('id_user')
                }
    
                const query = '?' + queryString.stringify(params)
    
                const response_carts = await Cart.Get_Cart(query)
    
                showData(response_carts, 0, 0)

            }

            fetchData()
        }

    }, [id_user])

    
    // Hàm này dùng để xử lý phần log out
    const handler_logout = () => {

        const action = deleteSession('')
        dispatch(action)

        sessionStorage.clear()

    }


    // State count of cart
    const [count_cart, set_count_cart] = useState(0)

    const [total_price, set_total_price] = useState(0)

    const [carts_mini, set_carts_mini] = useState([])

    // Get trạng thái từ redux khi user chưa đăng nhập
    const count = useSelector(state => state.Count.isLoad)

    // Hàm này dùng để load lại dữ liệu giỏ hàng ở phần header khi có bất kì thay đổi nào
    // Phụ thuộc vào thằng redux count
    useEffect(() => {

        if (count){

            if (sessionStorage.getItem('id_user')){ // khách hàng đã đăng nhập thì lại tiếp tục gọi API GET data

                const fetchData = async () => {
                    const params = {
                        id_user: sessionStorage.getItem('id_user')
                    }
        
                    const query = '?' + queryString.stringify(params)
        
                    const response_carts = await Cart.Get_Cart(query)
        
                    showData(response_carts, 0, 0)

                }

                fetchData()

            }else{ // khách hàng chưa đăng nhập
                
                showData(carts, 0, 0)

            }

            const action = changeCount(count)
            dispatch(action)
        }

    }, [count])

    // Hàm này là hàm con chia ra để xử lý
    function showData(carts, sum, price){

        carts.map(value => {
            sum += value.count
            price += parseInt(value.price_product) * parseInt(value.count)
        })

        set_count_cart(sum)

        set_total_price(price)

        set_carts_mini(carts)

    }

    
    // Hàm này dùng để xóa carts_mini
    const handler_delete_mini = (id_cart) => {

        if (sessionStorage.getItem('id_user')){ // Khi khách hàng đã đăng nhập thì gọi API với phương thức DELETE

            const deleteData = async () => {

                const response = await Cart.Delete_Cart(id_cart)

                console.log("Xoa " + response)

            }

            deleteData()

            const action_change_count = changeCount(count)
            dispatch(action_change_count)
            
        }else{

            const action = deleteCart(id_cart)
            dispatch(action)

            const action_change_count = changeCount(count)
            dispatch(action_change_count)

        }

    }


    const [male, set_male] = useState([])
    const [female, set_female] = useState([])

    // Gọi API theo phương thức GET để load category
    useEffect(() => {

        const fetchData = async () => {

            // gender = male
            const params_male = {
                gender: 'male'
            }

            const query_male = '?' + queryString.stringify(params_male)

            const response_male = await Product.Get_Category_Gender(query_male)

            set_male(response_male)

            // gender = female
            const params_female = {
                gender: 'female'
            }

            const query_female = '?' + queryString.stringify(params_female)

            const response_female = await Product.Get_Category_Gender(query_female)

            set_female(response_female)

        }

        fetchData()

    }, [])


    return (
        <header>
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <li><span>Telephone Enquiry:</span><a href="#">(+123) 123 321 345</a></li>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <ul className="d-flex justify-content-end" >
                                <li>
                                    <div className="ht-setting-trigger">
                                        {
                                            active_user ? (
                                            <span
                                                data-toggle="collapse"
                                                data-target="#collapseExample"
                                                aria-expanded="false"
                                                aria-controls="collapseExample">{user.fullname}</span>) : (
                                            <span
                                                data-toggle="collapse"
                                                data-target="#collapseExample"
                                                aria-expanded="false"
                                                aria-controls="collapseExample">Setting</span>
                                            )
                                        }
                                    </div>
                                    <div className="ul_setting">
                                        { active_user ? (
                                            <ul className="setting_ul collapse" id="collapseExample">
                                                <li className="li_setting"><Link to="/profile/123">Profile</Link></li>
                                                <li className="li_setting"><Link to="/history">History</Link></li>
                                                <li className="li_setting"><a onClick={handler_logout} href="#">Log Out</a></li>
                                            </ul>
                                        ) : (
                                            <ul className="setting_ul collapse" id="collapseExample">
                                                <li className="li_setting"><Link to="/signin">Sign In</Link></li>
                                            </ul>
                                        )}
                                        
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
                <div className="container pb_header">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="logo pb-sm-30 pb-xs-30">
                                <Link to="/">
                                    <img src={logo} style={{ width: '13rem'}} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15 d-flex justify-content-between">
                            <form action="#" className="hm-searchbox">
                                <input type="text" placeholder="Enter your search key ..." />
                                <button className="li-btn" type="submit"><i className="fa fa-search"></i></button>
                            </form>
                            <div className="header-middle-right">
                                <ul className="hm-menu">
                                    <li className="hm-wishlist d-flex">
                                        <Link to="/favorite" className="ml-2 mr-2">
                                            <span className="cart-item-count wishlist-item-count">0</span>
                                            <i className="fa fa-heart-o"></i>
                                        </Link>
                                        <li className="hm-minicart">
                                            <div className="hm-minicart-trigger"
                                                data-toggle="collapse"
                                                data-target="#collapse_carts"
                                                aria-expanded="false"
                                                aria-controls="collapse_carts">
                                                <span className="item-icon"></span>
                                                <span className="item-text">${total_price}
                                                <span className="cart-item-count">{count_cart}</span>
                                                </span>
                                            </div>
                                            <span></span>
                                            <div className="minicart collapse" id="collapse_carts">
                                                <ul className="minicart-product-list">
                                                    {
                                                        carts_mini && carts_mini.map((value, index) => (
                                                            <li key={index}>
                                                                <Link to={`/detail/${value.id_product}`} className="minicart-product-image">
                                                                    <img src={value.image} alt="cart products" />
                                                                </Link>
                                                                <div className="minicart-product-details">
                                                                    <h6><a>{value.name_product}</a></h6>
                                                                    <span>${value.price_product} x {value.count}, {value.size}</span>
                                                                </div>
                                                                <a className="close" onClick={() => handler_delete_mini(value._id)}>
                                                                    <i className="fa fa-close"></i>
                                                                </a>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <p className="minicart-total">SUBTOTAL: <span>${total_price}</span></p>
                                                <div className="minicart-button">
                                                    <Link to="/cart" className="li-button li-button-fullwidth li-button-dark">
                                                        <span>View Full Cart</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={header_navbar}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="hb-menu">
                                    <nav>
                                        <ul>

                                            <li className="dropdown-holder"><Link to="/">Home</Link></li>
                                            <li className="megamenu-holder"><Link to="/shop/all">Menu</Link>
                                                <ul class="megamenu hb-megamenu">
                                                    <li><Link to="/shop/all">Male</Link>
                                                        <ul>
                                                            {
                                                                male && male.map(value => (
                                                                    <li key={value._id}>
                                                                        <Link to={`/shop/${value._id}`} style={{ cursor: 'pointer' }}>{value.category}</Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </li>
                                                    <li><Link to="/shop">Female</Link>
                                                        <ul>
                                                            {
                                                                female && female.map(value => (
                                                                    <li key={value._id}>
                                                                        <Link to={`/shop/${value._id}`} style={{ cursor: 'pointer' }}>{value.category}</Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><Link to="/about">About Us</Link></li>
                                            <li><Link to="/contact">Contact</Link></li>
                                        </ul>

                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;