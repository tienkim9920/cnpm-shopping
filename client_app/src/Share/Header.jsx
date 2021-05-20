import React, { useEffect, useMemo, useState } from 'react';
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
import { addSearch } from '../Redux/Action/ActionSearch';
import CartsLocal from './CartsLocal';

function Header(props) {

    // State count of cart
    const [count_cart, set_count_cart] = useState(0)

    const [total_price, set_total_price] = useState(0)
    
    const [carts_mini, set_carts_mini] = useState([])

    // Hàm này để khởi tạo localStorage dùng để lưu trữ giỏ hàng
    // Và nó sẽ chạy lần đầu
    useEffect(() => {

        if (localStorage.getItem('carts') !== null) {
            set_carts_mini(JSON.parse(localStorage.getItem('carts')));
        } else {
            localStorage.setItem('carts', JSON.stringify([]))
        }

    }, [])

    // Xử lý thanh navigation
    const [header_navbar, set_header_navbar] = useState('header-bottom header-sticky')

    window.addEventListener('scroll', () => {

        if (window.pageYOffset < 200) {
            set_header_navbar('header-bottom header-sticky')
        } else {
            set_header_navbar('header-bottom header-sticky offset_navigation animate__animated animate__fadeInUp')
        }

    })

    const dispatch = useDispatch()

    //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
    // đưa dữ liệu vào Redux
    if (sessionStorage.getItem('id_user')) {
        const action = addSession(sessionStorage.getItem('id_user'))
        dispatch(action)
    }

    //Get IdUser từ redux khi user đã đăng nhập
    var id_user = useSelector(state => state.Session.idUser)

    // Get carts từ redux khi user chưa đăng nhập
    // const carts = useSelector(state => state.Cart.listCart)

    const [active_user, set_active_user] = useState(false)

    const [user, set_user] = useState({})

    // Hàm này dùng để hiện thị
    useEffect(() => {

        if (!id_user) { // user chưa đăng nhâp

            set_active_user(false)

        } else { // user đã đăng nhâp

            const fetchData = async () => {

                const response = await User.Get_User(sessionStorage.getItem('id_user'))
                set_user(response)

            }

            fetchData()

            set_active_user(true)

        }

    }, [id_user])


    // Hàm này dùng để xử lý phần log out
    const handler_logout = () => {

        const action = deleteSession('')
        dispatch(action)

        sessionStorage.clear()

    }


    // Get trạng thái từ redux khi user chưa đăng nhập
    const count = useSelector(state => state.Count.isLoad)

    // Hàm này dùng để load lại dữ liệu giỏ hàng ở phần header khi có bất kì thay đổi nào
    // Phụ thuộc vào thằng redux count
    useEffect(() => {

        if (count) {

            showData(JSON.parse(localStorage.getItem('carts')), 0, 0)

            const action = changeCount(count)
            dispatch(action)
        }

    }, [count])

    // Hàm này là hàm con chia ra để xử lý
    function showData(carts, sum, price) {

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

        CartsLocal.deleteProduct(id_cart)

        const action_change_count = changeCount(count)
        dispatch(action_change_count)

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


    // state keyword search
    const [keyword_search, set_keyword_search] = useState('')

    const [products, set_products] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const response = await Product.Get_All_Product()

            set_products(response)

        }

        fetchData()

    }, [])

    // Hàm này trả ra list product mà khách hàng tìm kiếm
    // sử dụng useMemo để performance hơn vì nếu mà dữ liệu mới giống với dữ liệu cũ thì nó sẽ lấy cái
    // Không cần gọi API để tạo mới data
    const search_header = useMemo(() => {

        const new_data = products.filter(value => {
            return value.name_product.toUpperCase().indexOf(keyword_search.toUpperCase()) !== -1
        })

        return new_data

    }, [keyword_search])

    const handler_search = (e) => {

        e.preventDefault()

        // Đưa vào redux để qua bên trang search lấy query tìm kiếm
        const action = addSearch(keyword_search)
        dispatch(action)

        // set cho nó cái session
        sessionStorage.setItem('search', keyword_search)

        window.location.replace('/search')

    }

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
                                        {active_user ? (
                                            <ul className="setting_ul collapse" id="collapseExample">
                                                <li className="li_setting"><Link to={`/profile/${sessionStorage.getItem("id_user")}`}>Profile</Link></li>
                                                <li className="li_setting"><Link to="/history">Order Status</Link></li>
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
                                    <img src={logo} style={{ width: '13rem' }} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15 d-flex justify-content-between">
                            <form action="/search" className="hm-searchbox" onSubmit={handler_search}>
                                <input type="text" placeholder="Enter your search key ..." value={keyword_search} onChange={(e) => set_keyword_search(e.target.value)} />
                                <button className="li-btn" type="submit"><i className="fa fa-search"></i></button>
                                {
                                    keyword_search && <div className="show_search_product">
                                        {
                                            search_header && search_header.map(value => (
                                                <div className="hover_box_search d-flex" key={value._id}>
                                                    <Link to={`/detail/${value._id}`} style={{ padding: '.8rem' }}>
                                                        <img className="img_list_search" src={value.image} alt="" />
                                                    </Link>

                                                    <div className="group_title_search" style={{ marginTop: '2.7rem' }}>
                                                        <h6 className="title_product_search">{value.name_product}</h6>
                                                        <span className="price_product_search">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.price_product)+ ' VNĐ'}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </form>
                            <div className="header-middle-right">
                                <ul className="hm-menu">
                                    <li className="hm-wishlist d-flex">
                                        <li className="hm-minicart">
                                            <div className="hm-minicart-trigger"
                                                data-toggle="collapse"
                                                data-target="#collapse_carts"
                                                aria-expanded="false"
                                                aria-controls="collapse_carts">
                                                <span className="item-icon"></span>
                                                <span className="item-text">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(total_price)+ ' VNĐ'}
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
                                                                    <span>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.price_product)+ ' VNĐ'} x {value.count}, {value.size}</span>
                                                                </div>
                                                                <a className="close" onClick={() => handler_delete_mini(value.id_cart)}>
                                                                    <i className="fa fa-close"></i>
                                                                </a>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <p className="minicart-total">SUBTOTAL: <span>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(total_price)+ ' VNĐ'}</span></p>
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
                                            <li><Link to="/event">Event</Link></li>
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