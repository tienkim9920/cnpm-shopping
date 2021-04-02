import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Product from '../../API/Product';
import queryString from 'query-string'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Home_Product.propTypes = {
    gender: PropTypes.string,
    category: PropTypes.string,
    GET_id_modal: PropTypes.func
};

Home_Product.defaultProps = {
    gender: '',
    category: '',
    GET_id_modal: null
}

function Home_Product(props) {

    const { gender, category, GET_id_modal } = props

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const [products, set_products] = useState([])

    // Hàm này dùng gọi API trả lại dữ liệu product category
    useEffect(() => {

        const fetchData = async () => {

            const params = {
                id_category: category
            }

            const query = '?' + queryString.stringify(params)

            const response = await Product.Get_Category_Product(query)

            set_products(response.splice(0, 7))

        }

        fetchData()

    }, [])


    return (
        <section className="product-area li-laptop-product pt-60 pb-45">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="li-section-title">
                            <h2>
                                <span>{gender}</span>
                            </h2>
                        </div>
                        <Slider {...settings}>
                            {
                                products && products.map(value => (
                                    <div className="col-lg-12" key={value._id}>
                                        <div className="single-product-wrap">
                                            <div className="product-image">
                                                <Link to={`/detail/${value._id}`}>
                                                    <img src={value.image} alt="Li's Product Image" />
                                                </Link>
                                                <span className="sticker">New</span>
                                            </div>
                                            <div className="product_desc">
                                                <div className="product_desc_info">
                                                    <div className="product-review">
                                                        <h5 className="manufacturer">
                                                            <a href="shop-left-sidebar.html">{value.name_product}</a>
                                                        </h5>
                                                        <div className="rating-box">
                                                            <ul className="rating">
                                                                <li><i className="fa fa-star-o"></i></li>
                                                                <li><i className="fa fa-star-o"></i></li>
                                                                <li><i className="fa fa-star-o"></i></li>
                                                                <li className="no-star"><i className="fa fa-star-o"></i></li>
                                                                <li className="no-star"><i className="fa fa-star-o"></i></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="price-box">
                                                        <span className="new-price">${value.price_product}</span>
                                                    </div>
                                                </div>
                                                <div className="add-actions">
                                                    <ul className="add-actions-link">
                                                        <li className="add-cart active"><a href="#">Add to cart</a></li>
                                                        <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o"></i></a></li>
                                                        <li><a href="#"
                                                            title="quick view"
                                                            className="quick-view-btn"
                                                            data-toggle="modal"
                                                            data-target={`#${value._id}`}
                                                            onClick={() => GET_id_modal(`${value._id}`)}><i className="fa fa-eye"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home_Product;