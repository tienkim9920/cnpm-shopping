import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Image/1.jpg'

function Header(props) {

    const [header_navbar, set_header_navbar] = useState('header-bottom header-sticky')

    window.addEventListener('scroll', () => {

        if (window.pageYOffset < 200){
            set_header_navbar('header-bottom header-sticky')
        }else{
            set_header_navbar('header-bottom header-sticky offset_navigation animate__animated animate__fadeInUp')
        }

    })

    return (
        <header>
            <div className="header-top">
                <div className="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-4">
                            <li><span>Telephone Enquiry:</span><a href="#">(+123) 123 321 345</a></li>
                        </div>
                        <div class="col-lg-9 col-md-8">
                            <ul className="d-flex justify-content-end" >
                                <li>
                                    <div class="ht-setting-trigger">
                                        <span
                                            data-toggle="collapse"
                                            data-target="#collapseExample"
                                            aria-expanded="false"
                                            aria-controls="collapseExample">Setting</span>
                                    </div>
                                    <div className="ul_setting">
                                        <ul class="setting_ul collapse" id="collapseExample">
                                            <li className="li_setting"><a href="login-register.html">Sign In</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
                <div class="container pb_header">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="logo pb-sm-30 pb-xs-30">
                                <a href="/">
                                    <img src={logo} alt="" />
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-9 pl-0 ml-sm-15 ml-xs-15 d-flex justify-content-between">
                            <form action="#" class="hm-searchbox">
                                <input type="text" placeholder="Enter your search key ..." />
                                <button class="li-btn" type="submit"><i class="fa fa-search"></i></button>
                            </form>
                            <div class="header-middle-right">
                                <ul class="hm-menu">
                                    <li class="hm-wishlist d-flex">
                                        <Link to="/favorite" className="ml-2 mr-2">
                                            <span class="cart-item-count wishlist-item-count">0</span>
                                            <i class="fa fa-heart-o"></i>
                                        </Link>
                                        <li class="hm-minicart">
                                            <div class="hm-minicart-trigger"
                                                data-toggle="collapse"
                                                data-target="#collapse_carts"
                                                aria-expanded="false"
                                                aria-controls="collapse_carts">
                                                <span class="item-icon"></span>
                                                <span class="item-text">£80.00
                                                <span class="cart-item-count">2</span>
                                                </span>
                                            </div>
                                            <span></span>
                                            <div class="minicart collapse" id="collapse_carts">
                                                <ul class="minicart-product-list">
                                                    <li>
                                                        <a href="single-product.html" class="minicart-product-image">
                                                            <img src="images/product/small-size/5.jpg" alt="cart products" />
                                                        </a>
                                                        <div class="minicart-product-details">
                                                            <h6><a href="single-product.html">Aenean eu tristique</a></h6>
                                                            <span>£40 x 1</span>
                                                        </div>
                                                        <button class="close" title="Remove">
                                                            <i class="fa fa-close"></i>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <a href="single-product.html" class="minicart-product-image">
                                                            <img src="images/product/small-size/6.jpg" alt="cart products" />
                                                        </a>
                                                        <div class="minicart-product-details">
                                                            <h6><a href="single-product.html">Aenean eu tristique</a></h6>
                                                            <span>£40 x 1</span>
                                                        </div>
                                                        <button class="close" title="Remove">
                                                            <i class="fa fa-close"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                                <p class="minicart-total">SUBTOTAL: <span>£80.00</span></p>
                                                <div class="minicart-button">
                                                    <Link to="/cart" class="li-button li-button-fullwidth li-button-dark">
                                                        <span>View Full Cart</span>
                                                    </Link>
                                                    <Link to="/checkout" class="li-button li-button-fullwidth li-button-dark">
                                                        <span>Checkout</span>
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
                <div class={header_navbar}>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="hb-menu">
                                    <nav>
                                        <ul>

                                            <li class="dropdown-holder"><a href="/">Home</a></li>
                                            <li class="megamenu-holder"><Link to="/shop">Shop</Link>
                                                <ul class="megamenu hb-megamenu">
                                                    <li><a href="shop-left-sidebar.html">Male</a>
                                                        <ul>
                                                            <li><a href="shop-3-column.html">T-Shirts</a></li>
                                                            <li><a href="shop-4-column.html">Pants</a></li>
                                                            <li><a href="shop-left-sidebar.html">Watchs</a></li>
                                                            <li><a href="shop-right-sidebar.html">Sneakers</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="single-product-gallery-left.html">Female</a>
                                                        <ul>
                                                            <li><a href="single-product-carousel.html">T-Shirts</a></li>
                                                            <li><a href="single-product-gallery-left.html">Pants</a></li>
                                                            <li><a href="single-product-gallery-right.html">Dress</a></li>
                                                            <li><a href="single-product-tab-style-top.html">Sneakers</a></li>
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