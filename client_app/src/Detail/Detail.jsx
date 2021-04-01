import React, { useEffect, useState } from 'react';
import ProductAPI from '../API/ProductAPI';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import alertify from 'alertifyjs'
import { addCart } from '../Redux/Action/ActionCart';
import CartAPI from '../API/CartAPI';
import queryString from 'query-string'
import CommentAPI from '../API/CommentAPI';

function Detail(props) {

    const [detail, setDetail] = useState({})

    const dispatch = useDispatch()

    //id params cho từng sản phẩm
    const { id } = useParams()

    //id_user được lấy từ redux
    const id_user = useSelector(state => state.Cart.id_user)

    //listCart được lấy từ redux
    const listCart = useSelector(state => state.Cart.listCart)

    const [product, setProduct] = useState([])

    const [star, setStar] = useState(1)

    const [comment, setComment] = useState('')

    // id_user đã đăng nhập
    const idUser = useSelector(state => state.Session.idUser)

    // Listcomment
    const [list_comment, set_list_comment] = useState([])

    // state này dùng để load lại comment khi user gửi comment lên
    const [load_comment, set_load_comment] = useState(false)

    // Hàm này dùng để lấy dữ liệu comment
    // Hàm này sẽ chạy lại phụ thuộc vào id Param
    useEffect(() => {

        const fetchData = async () => {

            const params = {
                idProduct: id
            }

            const query = '?' + queryString.stringify(params)

            const response = await CommentAPI.getCommentProduct(query)
            console.log(response)

            set_list_comment(response)

        }

        fetchData()

    }, [id])


    // Hàm thay đổi sao đánh giá
    const onChangeStar = (e) => {

        setStar(e.target.value)
        
    }

    // Hàm thay đổi comment
    const onChangeComment = (e) => {

        setComment(e.target.value)

    }

    // Hàm này dùng để bình luận
    const handlerComment = () => {

        if (idUser === ''){
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Vui Lòng Kiểm Tra Đăng Nhập!');
            return
        }

        const fetchSendComment = async () => {

            const params = {
                idProduct: id,
                idUser: sessionStorage.getItem('id_user'),
                fullname: sessionStorage.getItem('name_user'),
                content: comment,
                star: star
            }
    
            const query = '?' + queryString.stringify(params)
    
            const response = await CommentAPI.postCommentProduct(query)
            console.log(response)
    
            set_load_comment(true)

        }

        fetchSendComment()

        setComment('')

    }


    // Hàm này dùng để load lại dữ liệu comment
    // Phụ thuộc vào state load_comment
    useEffect(() => {

        if (load_comment){

            const fetchData = async () => {

                const params = {
                    idProduct: id
                }
    
                const query = '?' + queryString.stringify(params)
    
                const response = await CommentAPI.getCommentProduct(query)
                console.log(response)
    
                set_list_comment(response)
    
            }
    
            fetchData()

            set_load_comment(false)
        }

    }, [load_comment])


    //Hàm này gọi API và cắt chỉ lấy 4 sản phẩm
    useEffect(() => {

        const fetchData = async () => {

            const response = await ProductAPI.getAPI()

            const data = response.splice(0, 4)

            setProduct(data)

        }

        fetchData()

    }, [])

    //Phần này là để thay đổi số lượng khi mua sản phẩm
    const [text, setText] = useState(1)
    const onChangeText = (e) => {
        setText(e.target.value)
    }

    //Tăng lên 1 đơn vị
    const upText = () => {
        const value = parseInt(text) + 1

        setText(value)
    }

    //Giảm 1 đơn vị
    const downText = () => {

        const value = parseInt(text) - 1

        if (value === 0)
            return

        setText(value)
    }

    //Hàm này để lấy dữ liệu chi tiết sản phẩm
    useEffect(() => {

        const fetchData = async () => {

            const response = await ProductAPI.getDetail(id)
            console.log(response)
            setDetail(response)

        }

        fetchData()

    }, [id])


    //Phần này dùng để xem review hay description
    const [review, setReview] = useState('description')
    const handlerReview = (value) => {
        setReview(value)
    }


    //Hàm này là Thêm Sản Phẩm
    const addToCart = () => {

        let id_user_cart = ''

        if (sessionStorage.getItem('id_user')) {

            id_user_cart = sessionStorage.getItem('id_user')

        } else {

            id_user_cart = id_user

        }

        const data = {
            idUser: id_user_cart,
            idProduct: detail._id,
            nameProduct: detail.name,
            priceProduct: detail.price,
            count: text,
            img: detail.img1
        }

        if (sessionStorage.getItem('id_user')) {

            console.log("Bạn Đã Đăng Nhập!")

            const fetchPost = async () => {

                const params = {
                    idUser: id_user_cart, //sessionStorage.getItem('id_user')
                    idProduct: detail._id, // Lấy idProduct
                    count: text, // Lấy số lượng
                }

                const query = '?' + queryString.stringify(params)

                const response = await CartAPI.postAddToCart(query)

                console.log(response)

            }

            fetchPost()

        } else {

            const action = addCart(data)
            dispatch(action)

        }

        alertify.set('notifier', 'position', 'bottom-left');
        alertify.success('Bạn Đã Thêm Hàng Thành Công!');
    }


    return (
        <section className="py-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-6">
                        <div className="row m-sm-0">
                            <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                                <div className="owl-thumbs d-flex flex-row flex-sm-column" data-slider-id="1">
                                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0"><img className="w-100" src={detail.img1} alt="..." /></div>
                                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0"><img className="w-100" src={detail.img2} alt="..." /></div>
                                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0"><img className="w-100" src={detail.img3} alt="..." /></div>
                                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0"><img className="w-100" src={detail.img4} alt="..." /></div>
                                </div>
                            </div>

                            <div id="carouselExampleControls" className="carousel slide col-sm-10 order-1 order-sm-2" data-ride="carousel">
                                <div className="carousel-inner owl-carousel product-slider">
                                    <div className="carousel-item active">
                                        <img className="d-block w-100" src={detail.img1} alt="First slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src={detail.img2} alt="Second slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src={detail.img3} alt="Third slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src={detail.img4} alt="Third slide" />
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className="list-inline mb-2">
                            <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                            <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                            <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                            <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                            <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                        </ul>
                        <h1>{detail.name}</h1>
                        <p className="text-muted lead">${detail.price}</p>
                        <p className="text-small mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
                        <div className="row align-items-stretch mb-4">
                            <div className="col-sm-5 pr-sm-0">
                                <div className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                                    <span className="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                                    <div className="quantity">
                                        <button className="dec-btn p-0" style={{ cursor: 'pointer' }}><i className="fas fa-caret-left" onClick={downText}></i></button>
                                        <input className="form-control border-0 shadow-0 p-0" type="text" value={text} onChange={onChangeText} />
                                        <button className="inc-btn p-0" style={{ cursor: 'pointer' }}><i className="fas fa-caret-right" onClick={upText}></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3 pl-sm-0">
                                <a className="btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white"
                                    onClick={addToCart} >Add to cart</a>
                            </div>
                            <a className="btn btn-link text-dark p-1 mb-4" href="#">
                                <i className="far fa-heart mr-2"></i>Add to wish list
                        </a>
                            <br></br>
                            <ul className="list-unstyled small d-inline-block">
                                <li className="px-3 py-2 mb-1 bg-white"><strong className="text-uppercase">SKU:</strong><span className="ml-2 text-muted">039</span></li>
                                <li className="px-3 py-2 mb-1 bg-white text-muted"><strong className="text-uppercase text-dark">Category:</strong><a className="reset-anchor ml-2">{detail.category}s</a></li>
                                <li className="px-3 py-2 mb-1 bg-white text-muted"><strong className="text-uppercase text-dark">Tags:</strong><a className="reset-anchor ml-2">Innovation</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Comment:</label>
                    <textarea className="form-control" rows="3" onChange={onChangeComment} value={comment}></textarea>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex w-25">
                        <span className="mt-2">Evaluate: </span>
                        &nbsp;
                        &nbsp;
                        <input className="form-control w-25" type="number" min="1" max="5" value={star} onChange={onChangeStar} />
                        &nbsp;
                        &nbsp;
                        <span className="mt-2">Star</span>
                    </div>
                    <div>
                    <a className="btn btn-dark btn-sm btn-block px-0 text-white" 
                        style={{width: '12rem', }} onClick={handlerComment}>Send</a>
                    </div>

                </div>
                <br/>
                <ul className="nav nav-tabs border-0">
                    <li className="nav-item">
                        <a
                            className="nav-link fix_comment"
                            onClick={() => handlerReview('description')}
                            style={review === 'description' ? { backgroundColor: '#383838', color: '#ffffff' } : { color: '#383838' }}>
                            Description</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fix_comment"
                            onClick={() => handlerReview('review')}
                            style={review === 'review' ? { backgroundColor: '#383838', color: '#ffffff' } : { color: '#383838' }}>
                            Reviews</a>
                    </li>
                </ul>
                <div className="tab-content mb-5">
                    {
                        review === 'description' ? (
                            <div className="tab-pane fade show active">
                                <div className="p-4 p-lg-5 bg-white">
                                    <h6 className="text-uppercase">Product description </h6>
                                    <p className="text-muted text-small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                        ) : (<div className="tab-pane fade show active">
                            <div className="p-4 p-lg-5 bg-white">
                                <div className="row">
                                    <div className="col-lg-8">
                                        {
                                            list_comment && list_comment.map(value => (
                                                <div className="media mb-3" key={value._id}>
                                                    <img className="rounded-circle" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="" width="50" />
                                                    <div className="media-body ml-3">
                                                        <h6 className="mb-0 text-uppercase">{value.fullname}</h6>
                                                        <p className="small text-muted mb-0 text-uppercase">dd/mm/yyyy</p>
                                                        <ul className="list-inline mb-1 text-xs">
                                                            <li className="list-inline-item m-0"><i className={value.star1}></i></li>            
                                                            <li className="list-inline-item m-0"><i className={value.star2}></i></li>            
                                                            <li className="list-inline-item m-0"><i className={value.star3}></i></li>            
                                                            <li className="list-inline-item m-0"><i className={value.star4}></i></li>            
                                                            <li className="list-inline-item m-0"><i className={value.star5}></i></li>                    
                                                         </ul>
                                                        <p className="text-small mb-0 text-muted">{value.content}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <h2 className="h5 text-uppercase mb-4">Related products</h2>
                <div className="row">
                    {
                        product && product.map(value => (
                            <div className="col-lg-3 col-sm-6" key={value._id}>
                                <div className="product text-center skel-loader">
                                    <div className="d-block mb-3 position-relative">
                                        <Link className="d-block" to={`/detail/${value._id}`}>
                                            <img className="img-fluid w-100" src={value.img1} alt="..." />
                                        </Link>
                                        <div className="product-overlay">
                                            <ul className="mb-0 list-inline">
                                                <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark text-white"><i className="far fa-heart"></i></a></li>
                                                <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-dark text-white">Add to cart</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h6> <a className="reset-anchor" href="detail.html">Kui Ye Chen’s AirPods</a></h6>
                                    <p className="small text-muted">$250</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section >
    );
}

export default Detail;