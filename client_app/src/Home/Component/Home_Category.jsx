import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string'
import Product from '../../API/Product';
import { Link } from 'react-router-dom';

Home_Category.propTypes = {
    GET_id_modal: PropTypes.func
};

Home_Category.defaultProps = {
    GET_id_modal: null
}

function Home_Category(props) {

    // Lấy func từ component cha chuyển xuống
    const { GET_id_modal } = props

    // state product gà giòn vui vẻ
    const [product_category, set_product_category] = useState([])

    const [load_category, set_load_category] = useState('60615da34c9cac0448b4b9a5')

    useEffect(() => {

        const fetchData = async () => {

            const params = {
                id_category: load_category
            }

            const query = '?' + queryString.stringify(params)

            const response = await Product.Get_Category_Product(query)

            set_product_category(response.splice(0, 3))

        }

        fetchData()

    }, [load_category])

    const handler_change_category = (value) => {

        set_load_category(value)

    }

    return (
        <div className="product-area pt-60 pb-50">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="li-product-tab">
                            <ul className="nav li-product-menu">
                                <li><a className="active" data-toggle="tab" href="#" onClick={() => handler_change_category('60615da34c9cac0448b4b9a5')}><span>New</span></a></li>
                                <li><a data-toggle="tab" href="#" onClick={() => handler_change_category('60615da34c9cac0448b4b9a8')}><span>Hot</span></a></li>
                                <li><a data-toggle="tab" href="#" onClick={() => handler_change_category('60615da34c9cac0448b4b9a4')}><span>Sale</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <div className="tab-pane active show" role="tabpanel">
                        <div className="row">
                            <div className="product-active fix_product_category">
                                {
                                    product_category && product_category.map(value => (
                                        <div className="col-lg-4 animate__animated animate__zoomIn" style={{ zIndex: '999'}} key={value._id}>
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
                                                            <li><a href="#" title="quick view" 
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home_Category;