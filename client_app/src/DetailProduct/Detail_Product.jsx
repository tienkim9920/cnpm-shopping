import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import Product from '../API/Product';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from 'query-string';
import { addCart } from '../Redux/Action/ActionCart';
import { changeCount } from '../Redux/Action/ActionCount';
import { Link } from 'react-router-dom';
import Cart from '../API/CartAPI';

Detail_Product.propTypes = {

};

function Detail_Product(props) {

    const { id } = useParams()

    const [product, set_product] = useState({})

    const dispatch = useDispatch()

    //id_user được lấy từ redux
    const id_user = useSelector(state => state.Cart.id_user)

    // Get count từ redux khi user chưa đăng nhập
    const count_change = useSelector(state => state.Count.isLoad)

    // Hàm này dùng để gọi API hiển thị sản phẩm
    useEffect(() => {

        const fetchData = async () => {

            const response = await Product.Get_Detail_Product(id)

            set_product(response)

        }

        fetchData()

    }, [id])


    const [count, set_count] = useState(1)

    const [show_success, set_show_success] = useState(false)

    const [size, set_size] = useState('S')

    // Hàm này dùng để thêm vào giỏ hàng
    const handler_addcart = (e) => {

        e.preventDefault()

        const data = {
            id_user: sessionStorage.getItem('id_user') ? sessionStorage.getItem('id_user') : id_user,
            id_product: id,
            name_product: product.name_product,
            price_product: product.price_product,
            count: count,
            image: product.image,
            size: size,
            id_cart: Math.random().toString()
        }

        if (sessionStorage.getItem('id_user')){ // User đã đăng nhập
            // Khi đăng nhập thành công thì nó sẽ gọi API phương thức POST
            const postData = async () => {

                const response = await Cart.Post_Cart(data)
                console.log(response)

            }

            postData()

            const action_count_change = changeCount(count_change)
            dispatch(action_count_change)

            set_show_success(true)

        }else{ // User chưa đăng nhập

            const action = addCart(data)
            dispatch(action)

            const action_count_change = changeCount(count_change)
            dispatch(action_count_change)

            set_show_success(true)

        }

        setTimeout(() => {
            set_show_success(false)
        }, 1000)

    }

    // Hàm này dùng để giảm số lượng
    const downCount = () => {
        if (count === 1){
            return
        }

        set_count(count - 1)
    }

    const upCount = () => {
        set_count(count + 1)
    }


    return (
        <div>

            {
                show_success && 
                    <div className="modal_success">
                        <div className="group_model_success pt-3">
                            <div className="text-center p-2">
                                <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff' }}></i>
                            </div>
                            <h4 className="text-center p-3" style={{ color: '#fff' }}>Bạn Đã Thêm Hàng Thành Công!</h4>
                        </div>
                    </div>
            }

            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Detail</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="content-wraper">
                <div className="container">
                    <div className="row single-product-area">
                        <div className="col-lg-5 col-md-6">
                            <div className="product-details-left">
                                <div className="product-details-images slider-navigation-1">
                                    <div className="lg-image">
                                        <a className="popup-img venobox vbox-item" href="images/product/large-size/1.jpg" data-gall="myGallery">
                                            <img src={product.image} alt="product image" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-6">
                            <div className="product-details-view-content pt-60">
                                <div className="product-info">
                                    <h2>{product.name_product}</h2>
                                    <div className="price-box pt-20">
                                        <span className="new-price new-price-2">${product.price_product}</span>
                                    </div>
                                    <div className="product-desc">
                                        <p>
                                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel harum tenetur delectus nam quam assumenda? Soluta vitae tempora ratione excepturi doloremque, repudiandae ullam, eum corporis, itaque dolor aperiam enim aspernatur.
                                            </span>
                                        </p>
                                    </div>
                                    <div class="product-variants">
                                        <div class="produt-variants-size">
                                            <label>Size</label>
                                            <select class="nice-select" onChange={(e) => set_size(e.target.value)}>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="single-add-to-cart">
                                        <form action="#" className="cart-quantity">
                                            <div className="quantity">
                                                <label>Quantity</label>
                                                <div className="cart-plus-minus">
                                                    <input className="cart-plus-minus-box" value={count} type="text" onChange={(e) => set_count(e.target.value)} />
                                                    <div className="dec qtybutton" onClick={downCount}><i className="fa fa-angle-down"></i></div>
                                                    <div className="inc qtybutton" onClick={upCount}><i className="fa fa-angle-up"></i></div>
                                                </div>
                                            </div>
                                            <a href="#" className="add-to-cart" type="submit" onClick={handler_addcart}>Add to cart</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-area pt-35">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-product-tab">
                                <ul className="nav li-product-menu">
                                    <li><a className="active" data-toggle="tab" href="#description"><span>Description</span></a></li>
                                    <li><a data-toggle="tab" href="#reviews"><span>Reviews</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="description" className="tab-pane active show" role="tabpanel">
                            <div className="product-description">
                                <span>The best is yet to come! Give your walls a voice with a framed poster. This aesthethic, optimistic poster will look great in your desk or in an open-space office. Painted wooden frame with passe-partout for more depth.</span>
                            </div>
                        </div>
                        <div id="reviews" className="tab-pane" role="tabpanel">
                            <div className="product-reviews">
                                <div className="product-details-comment-block">
                                    <div className="comment-author-infos pt-25">
                                        <span>HTML 5</span>
                                        <em>01-12-18</em>
                                        <ul className="rating">
                                            <li><i className="fa fa-star"></i></li>
                                            <li><i className="fa fa-star"></i></li>
                                            <li><i className="fa fa-star"></i></li>
                                            <li className="no-star"><i className="fa fa-star-o"></i></li>
                                            <li className="no-star"><i className="fa fa-star-o"></i></li>
                                        </ul>
                                    </div>
                                    <div className="comment-details">
                                        <h4 className="title-block">Demo</h4>
                                        <p>Plaza</p>
                                    </div>
                                    <div className="review-btn">
                                        <a className="review-links" href="#" data-toggle="modal" data-target="#mymodal">Write Your Review!</a>
                                    </div>
                                    <div className="modal fade modal-wrapper" id="mymodal" >
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <h3 className="review-page-title">Write Your Review</h3>
                                                    <div className="modal-inner-area row">
                                                        <div className="col-lg-6">
                                                            <div className="li-review-product">
                                                                <img src="images/product/large-size/3.jpg" alt="Li's Product" />
                                                                <div className="li-review-product-desc">
                                                                    <p className="li-product-name">Today is a good day Framed poster</p>
                                                                    <p>
                                                                        <span>Beach Camera Exclusive Bundle - Includes Two Samsung Radiant 360 R3 Wi-Fi Bluetooth Speakers. Fill The Entire Room With Exquisite Sound via Ring Radiator Technology. Stream And Control R3 Speakers Wirelessly With Your Smartphone. Sophisticated, Modern Design </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="li-review-content">
                                                                <div className="feedback-area">
                                                                    <div className="feedback">
                                                                        <h3 className="feedback-title">Our Feedback</h3>
                                                                        <form action="#">
                                                                            <p className="your-opinion">
                                                                                <label>Your Rating</label>
                                                                                <span>
                                                                                    <select className="star-rating">
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                        <option value="4">4</option>
                                                                                        <option value="5">5</option>
                                                                                    </select>
                                                                                </span>
                                                                            </p>
                                                                            <p className="feedback-form">
                                                                                <label htmlFor="feedback">Your Review</label>
                                                                                <textarea id="feedback" name="comment" cols="45" rows="8" aria-required="true"></textarea>
                                                                            </p>
                                                                            <div className="feedback-input">
                                                                                <p className="feedback-form-author">
                                                                                    <label htmlFor="author">Name<span className="required">*</span>
                                                                                    </label>
                                                                                    <input id="author" name="author" size="30" aria-required="true" type="text" />
                                                                                </p>
                                                                                <p className="feedback-form-author feedback-form-email">
                                                                                    <label htmlFor="email">Email<span className="required">*</span>
                                                                                    </label>
                                                                                    <input id="email" name="email" size="30" aria-required="true" type="text" />
                                                                                    <span className="required"><sub>*</sub> Required fields</span>
                                                                                </p>
                                                                                <div className="feedback-btn pb-15">
                                                                                    <a href="#" className="close" data-dismiss="modal" aria-label="Close">Close</a>
                                                                                    <a href="#">Submit</a>
                                                                                </div>
                                                                            </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail_Product;