import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import bg1 from '../CSS/Image/1.jpg'
import bg2 from '../CSS/Image/2.jpg'
import bg3 from '../CSS/Image/3.jpg'
import Home_Category from './Component/Home_Category';
import Home_Product from './Component/Home_Product';

Home.propTypes = {

};

function Home(props) {

    return (
        <div className="container">
            <div class="slider-with-banner">
                <div class="row">
                    <div class="col-lg-8 col-md-8">
                        <div>
                            <div class="carousel-inner">
                                <div class="single-slide align-center-left animation-style-01 bg-1"
                                    style={{ backgroundImage: `url(${bg1})` }}>
                                    <div class="slider-progress"></div>
                                    <div class="slider-content">
                                        <h5>Sale Offer <span>-20% Off</span> This Week</h5>
                                        <h2>Chamcham Galaxy S9 | S9+</h2>
                                        <h3>Starting at <span>$1209.00</span></h3>
                                        <div class="default-btn slide-btn">
                                            <a class="links" href="shop-left-sidebar.html">Shopping Now</a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 text-center pt-xs-30">
                        <div class="li-banner">
                            <a href="#">
                                <img src={bg2} alt="" />
                            </a>
                        </div>
                        <div class="li-banner mt-15 mt-sm-30 mt-xs-30">
                            <a href="#">
                                <img src={bg3} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Home_Category />

            <div class="li-static-banner">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 text-center">
                            <div class="single-banner">
                                <a href="#">
                                    <img src={bg1} alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div class="single-banner">
                                <a href="#">
                                    <img src={bg2} alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div class="single-banner">
                                <a href="#">
                                    <img src={bg3} alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Home_Product gender={`Male`} />

            <Home_Product gender={`Female`} />

            <div class="modal fade modal-wrapper" id="exampleModalCenter" >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div class="modal-inner-area row">
                                <div class="col-lg-5 col-md-6 col-sm-6">
                                    <div class="product-details-left">
                                        <div class="product-details-images slider-navigation-1">
                                            <div class="lg-image">
                                                <img src="images/product/large-size/1.jpg" alt="product image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-7 col-md-6 col-sm-6">
                                    <div class="product-details-view-content pt-60">
                                        <div class="product-info">
                                            <h2>Today is a good day Framed poster</h2>
                                            <span class="product-details-ref">Reference: demo_15</span>
                                            <div class="rating-box pt-20">
                                                <ul class="rating rating-with-review-item">
                                                    <li><i class="fa fa-star-o"></i></li>
                                                    <li><i class="fa fa-star-o"></i></li>
                                                    <li><i class="fa fa-star-o"></i></li>
                                                    <li class="no-star"><i class="fa fa-star-o"></i></li>
                                                    <li class="no-star"><i class="fa fa-star-o"></i></li>
                                                    <li class="review-item"><a href="#">Read Review</a></li>
                                                    <li class="review-item"><a href="#">Write Review</a></li>
                                                </ul>
                                            </div>
                                            <div class="price-box pt-20">
                                                <span class="new-price new-price-2">$57.98</span>
                                            </div>
                                            <div class="product-desc">
                                                <p>
                                                    <span>100% cotton double printed dress. Black and white striped top and orange high waisted skater skirt bottom. Lorem ipsum dolor sit amet, consectetur adipisicing elit. quibusdam corporis, earum facilis et nostrum dolorum accusamus similique eveniet quia pariatur.
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="product-variants">
                                                <div class="produt-variants-size">
                                                    <label>Size</label>
                                                    <select class="nice-select">
                                                        <option value="1" title="S" selected="selected">S</option>
                                                        <option value="2" title="M">M</option>
                                                        <option value="3" title="L">L</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="single-add-to-cart">
                                                <form action="#" class="cart-quantity">
                                                    <div class="quantity">
                                                        <label>Quantity</label>
                                                        <div class="cart-plus-minus">
                                                            <input class="cart-plus-minus-box" value="1" type="text" />
                                                            <div class="dec qtybutton"><i class="fa fa-angle-down"></i></div>
                                                            <div class="inc qtybutton"><i class="fa fa-angle-up"></i></div>
                                                        </div>
                                                    </div>
                                                    <button class="add-to-cart" type="submit">Add to cart</button>
                                                </form>
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

export default Home;