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
        <div class="row">
            {
                products && products.map(value => (
                    <div class="col-lg-4 col-md-4 col-sm-6 mt-40 animate__animated animate__zoomIn" key={value._id}>
                        <div class="single-product-wrap">
                            <div class="product-image">
                                <a href="single-product.html">
                                    <img src={value.image} alt="Li's Product Image" />
                                </a>
                                <span class="sticker">New</span>
                            </div>
                            <div class="product_desc">
                                <div class="product_desc_info">
                                    <div class="product-review">
                                        <h5 class="manufacturer">
                                            <a href="product-details.html">{value.name_product}</a>
                                        </h5>
                                        <div class="rating-box">
                                            <ul class="rating">
                                                <li><i class="fa fa-star-o"></i></li>
                                                <li><i class="fa fa-star-o"></i></li>
                                                <li><i class="fa fa-star-o"></i></li>
                                                <li class="no-star"><i class="fa fa-star-o"></i></li>
                                                <li class="no-star"><i class="fa fa-star-o"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h4><a class="product_name" href="single-product.html">Accusantium dolorem1</a></h4>
                                    <div class="price-box">
                                        <span class="new-price">${value.price_product}</span>
                                    </div>
                                </div>
                                <div class="add-actions">
                                    <ul class="add-actions-link">
                                        <li class="add-cart active"><a href="shopping-cart.html">Add to cart</a></li>
                                        <li><a href="#" title="quick view" class="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a></li>
                                        <li><a class="links-details" href="wishlist.html"><i class="fa fa-heart-o"></i></a></li>
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