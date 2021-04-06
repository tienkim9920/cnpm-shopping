import React from 'react';
import PropTypes from 'prop-types';

Products.propTypes = {
    products: PropTypes.array,
    sort: PropTypes.string
};

Products.defaultProps = {
    products: [],
    sort: ''
}

function Products(props) {

    const { products, sort } = props

    if (sort === 'DownToUp') {
        products.sort((a, b) => {
            return a.price_product - b.price_product
        });
    }
    else if (sort === 'UpToDown') {
        products.sort((a, b) => {
            return b.price_product - a.price_product
        });
    }

    return (
        <div className="row">
            {
                products && products.map(value => (
                    <div className="col-lg-4 col-md-4 col-sm-6 mt-40 animate__animated animate__zoomIn" key={value._id}>
                        <div className="single-product-wrap">
                            <div className="product-image">
                                <a href="single-product.html">
                                    <img src={value.image} alt="Li's Product Image" />
                                </a>
                                <span className="sticker">New</span>
                            </div>
                            <div className="product_desc">
                                <div className="product_desc_info">
                                    <div className="product-review">
                                        <h5 className="manufacturer">
                                            <a href="product-details.html">{value.name_product}</a>
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
                                    <h4><a className="product_name" href="single-product.html">Accusantium dolorem1</a></h4>
                                    <div className="price-box">
                                        <span className="new-price">${value.price_product}</span>
                                    </div>
                                </div>
                                <div className="add-actions">
                                    <ul className="add-actions-link">
                                        <li className="add-cart active"><a href="shopping-cart.html">Add to cart</a></li>
                                        <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye"></i></a></li>
                                        <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Products;