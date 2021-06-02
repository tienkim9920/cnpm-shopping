import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import queryString from 'query-string'
import Product from '../API/Product';
import './Search.css'
import { Link } from 'react-router-dom';

Search.propTypes = {

};

function Search(props) {

    const [products, set_products] = useState([])
    const [page, set_page] = useState(1)

    const [show_load, set_show_load] = useState(true)

    useEffect(() => {

        setTimeout(() => {

            const fetchData = async () => {

                const params = {
                    page: page,
                    count: '6',
                    search: sessionStorage.getItem('search')
                }

                const query = '?' + queryString.stringify(params)

                const response = await Product.get_search_list(query)

                if (response.length < 1) {
                    set_show_load(false)
                }

                set_products(prev => [...prev, ...response])

            }

            fetchData()

        }, 2500)

    }, [page])


    return (

        <div className="content-wraper pt-60 pb-60">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-top-bar">
                            <div className="product-select-box">
                                <div className="product-short">
                                    <p>Sort By:</p>
                                    <select className="nice-select">
                                        <option value="trending">Relevance</option>
                                        <option value="rating">Price (Low &gt; High)</option>
                                        <option value="rating">Price (High &gt; Low)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="shop-products-wrapper">
                            <div className="row">
                                <div className="col">
                                    <InfiniteScroll
                                        style={{ overflow: 'none' }}
                                        dataLength={products.length}
                                        next={() => set_page(page + 1)}
                                        hasMore={true}
                                        loader={show_load ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                            : <h4 className="text-center" style={{ paddingTop: '3rem', color: '#FED700' }}>Yay! You have seen it all</h4>}
                                    >
                                        {
                                            products && products.map(value => (
                                                <div className="row product-layout-list" key={value._id}>
                                                    <div className="col-lg-3 col-md-5 ">
                                                        <div className="product-image">
                                                            <Link to={`/detail/${value._id}`}>
                                                                <img src={value.image} alt="Li's Product Image" />
                                                            </Link>
                                                            <span className="sticker">New</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5 col-md-7">
                                                        <div className="product_desc">
                                                            <div className="product_desc_info">
                                                                <div className="product-review">
                                                                    <h5 className="manufacturer">
                                                                        <a href="product-details.html">{value.name_product}</a>
                                                                    </h5>
                                                                    <div className="rating-box">
                                                                        <ul className="rating">
                                                                            <li><i className="fa fa-star" /></li>
                                                                            <li><i className="fa fa-star" /></li>
                                                                            <li><i className="fa fa-star" /></li>
                                                                            <li><i className="fa fa-star" /></li>
                                                                            <li><i className="fa fa-star" /></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <h4><a className="product_name" href="product-details.html">{value.name_product}</a></h4>
                                                                <div className="price-box">
                                                                    <span className="new-price">${value.price_product}</span>
                                                                </div>
                                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere assumenda ea quia magnam, aspernatur earum quidem eum et illum dolorem commodi sunt delectus totam blanditiis doloremque at voluptates nisi iusto!</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="shop-add-action mb-xs-30">
                                                            <ul className="add-actions-link">
                                                                <li className="add-cart"><a href="#">Add to cart</a></li>
                                                                <li className="wishlist"><a href="wishlist.html"><i className="fa fa-heart-o" />Add to wishlist</a></li>
                                                                <li><a className="quick-view" data-toggle="modal" data-target={`#${value._id}`} href="#"><i className="fa fa-eye" />Quick view</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </InfiniteScroll>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    products && products.map(value => (
                        <div className="modal fade modal-wrapper" key={value._id} id={value._id} >
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
                                                            <img src={value.image} alt="product image" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-7 col-md-6 col-sm-6">
                                                <div className="product-details-view-content pt-60">
                                                    <div className="product-info">
                                                        <h2>{value.name_product}</h2>
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
                                                            <span className="new-price new-price-2">${value.price_product}</span>
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
                    ))
                }

            </div>
        </div>
    )
}

export default Search;