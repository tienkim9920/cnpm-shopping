import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bg1 from '../CSS/Image/1.jpg'
import bg2 from '../CSS/Image/2.jpg'
import bg3 from '../CSS/Image/3.jpg'
import bg5 from '../CSS/Image/5.jpg'
import bg6 from '../CSS/Image/6.jpg'
import bg7 from '../CSS/Image/7.jpg'
import Home_Category from './Component/Home_Category';
import Home_Product from './Component/Home_Product';
import Product from '../API/Product';

Home.propTypes = {

};

function Home(props) {

    // state dùng để thay đổi và hiển thị modal
    const [id_modal, set_id_modal] = useState('')

    const [product_detail, set_product_detail] = useState([])

    const GET_id_modal = (value) => {

        set_id_modal(value)

    }

    useEffect(() => {

        if (id_modal !== ''){

            const fetchData = async () => {

                const response = await Product.Get_Detail_Product(id_modal)

                set_product_detail(response)

            }

            fetchData()

        }

    }, [id_modal])



    return (
        <div className="container">
            <div className="slider-with-banner">
                <div className="row">
                    <div className="col-lg-8 col-md-8">
                        <div>
                            <div className="carousel-inner">
                                <div className="single-slide align-center-left animation-style-01 bg-1"
                                    style={{ backgroundImage: `url(https://cdn.shopify.com/s/files/1/2598/6284/files/3rd_Banner_5_1600x.jpg?v=1593522251)` }}>
                                    <div className="slider-progress"></div>

                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                        <div className="li-banner">
                            <a href="#">
                                <img src="https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-fashion_113854663.jpg" alt="" />
                            </a>
                        </div>
                        <div className="li-banner mt-15 mt-sm-30 mt-xs-30">
                            <a href="#">
                                <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/114148366/original/624c3d3004215425a321fa7378f0228beb349e65/do-shopify-store-banner-header-and-slider-image-design-1906.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Home_Category GET_id_modal={GET_id_modal} />

            <div className="li-static-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 text-center">
                            <div className="single-banner">
                                <a href="#">
                                    <img src="https://image.freepik.com/free-vector/fashion-banner-design-with-shirt-bag-camera-case_83728-1865.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner">
                                <a href="#">
                                    <img src="https://image.freepik.com/free-vector/fashion-sale-banner-collection_23-2148161688.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner">
                                <a href="#">
                                    <img src="https://image.freepik.com/free-vector/fashion-sale-banners_52683-11557.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Home_Product gender={`Male`} category={'60615da34c9cac0448b4b9a2'} GET_id_modal={GET_id_modal} />

            <Home_Product gender={`Female`} category={'60615da34c9cac0448b4b9a6'} GET_id_modal={GET_id_modal} />

            <div className="modal fade modal-wrapper" id={id_modal} >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-inner-area row">
                                <div className="col-lg-5 col-md-6 col-sm-6">
                                    <div className="product-details-left">
                                        <div className="product-details-images slider-navigation-1">
                                            <div className="lg-image">
                                                <img src={product_detail.image} alt="product image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-md-6 col-sm-6">
                                    <div className="product-details-view-content pt-60">
                                        <div className="product-info">
                                            <h2>{product_detail.name_product}</h2>
                                            <div className="rating-box pt-20">
                                                <ul className="rating rating-with-review-item">
                                                    <li><i className="fa fa-star-o"></i></li>
                                                    <li><i className="fa fa-star-o"></i></li>
                                                    <li><i className="fa fa-star-o"></i></li>
                                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <div className="price-box pt-20">
                                                <span className="new-price new-price-2">${product_detail.price_product}</span>
                                            </div>
                                            <div className="product-desc">
                                                <p>
                                                    <span>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis reiciendis hic voluptatibus aperiam culpa ullam dolor esse error ducimus itaque ipsa facilis saepe rem veniam exercitationem quos magnam, odit perspiciatis.
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="single-add-to-cart">
                                                <form action="#" className="cart-quantity">
                                                    <div className="quantity">
                                                        <label>Quantity</label>
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" value="1" type="text" />
                                                            <div className="dec qtybutton"><i className="fa fa-angle-down"></i></div>
                                                            <div className="inc qtybutton"><i className="fa fa-angle-up"></i></div>
                                                        </div>
                                                    </div>
                                                    <button className="add-to-cart" type="submit">Add to cart</button>
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