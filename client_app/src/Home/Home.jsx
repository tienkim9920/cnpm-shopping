import React, { useEffect, useState } from 'react';
import ProductAPI from '../API/ProductAPI';
import Image from '../Share/img/Image'
import queryString from 'query-string'
import { Link } from 'react-router-dom';

function Home(props) {

    const [products, setProducts] = useState([])

    //Fetch Product
    useEffect(() => {

        const fetchData = async () => {

            const response = await ProductAPI.getAPI()
            console.log(response)

            const data = response.splice(0, 8)

            setProducts(data)
        }

        fetchData()

    }, [])


    return (
        <div className="page-holder">
            <header className="header bg-white">

                {
                    products && products.map(value => (
                        <div className="modal fade show" id={`product_${value._id}`} key={value._id}>
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-body p-0">
                                        <div className="row align-items-stretch">
                                            <div className="col-lg-6 p-lg-0">
                                                <img style={{width: '100%'}} className="product-view d-block h-100 bg-cover bg-center" src={value.img1} data-lightbox={`product_${value._id}`} />
                                                <img className="d-none" href={value.img2} />
                                                <img className="d-none" href={value.img3} />
                                            </div>
                                            <div className="col-lg-6">
                                                {/* Để tắt modal phải có class="close" và data-dissmiss="modal" và aria-label="Close" */}
                                                <a className="close p-4" type="button" href="#section_product" data-dismiss="modal" aria-label="Close">×</a>
                                                <div className="p-5 my-md-4">
                                                    <ul className="list-inline mb-2">
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    </ul>
                                                    <h2 className="h4">{value.name}</h2>
                                                    <p className="text-muted">${value.price}</p>
                                                    <p className="text-small mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
                                                    <div className="row align-items-stretch mb-4">
                                                        <div className="col-sm-5 pl-sm-0 fix_addwish">
                                                            <a className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">
                                                            <i className="far fa-heart mr-2"></i>Add Too Wish List</a>
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
                

                <div className="container">
                    <section className="hero pb-3 bg-cover bg-center d-flex align-items-center" style={{ backgroundImage: `url(${Image.banner})` }}>
                        <div className="container py-5">
                            <div className="row px-4 px-lg-5">
                                <div className="col-lg-6">
                                    <p className="text-muted small text-uppercase mb-2">New Inspiration 2020</p>
                                    <h1 className="h2 text-uppercase mb-3">20% off on new season</h1><a className="btn btn-dark" href="shop.html">Browse collections</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="pt-5">
                        <header className="text-center">
                            <p className="small text-muted small text-uppercase mb-1">Carefully created collections</p>
                            <h2 className="h5 text-uppercase mb-4">Browse our categories</h2>
                        </header>
                        <div className="row">
                            <div className="col-md-4 mb-4 mb-md-0">
                                <Link className="category-item" to={'/shop'}>
                                    <img className="img-fluid" src={Image.img1} alt="" />
                                    <strong className="category-item-title">Clothes</strong>
                                </Link>
                            </div>
                            <div className="col-md-4 mb-4 mb-md-0">
                                <Link className="category-item mb-4" to={'/shop'}>
                                    <img className="img-fluid" src={Image.img2} alt="" />
                                    <strong className="category-item-title">Shoes</strong>
                                </Link>
                                <Link className="category-item" to={'/shop'}>
                                    <img className="img-fluid" src={Image.img3} alt="" />
                                    <strong className="category-item-title">Watches</strong>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link className="category-item" to={'/shop'}>
                                    <img className="img-fluid" src={Image.img4} alt="" />
                                    <strong className="category-item-title">Electronics</strong>
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section className="py-5" id="section_product">
                        <header>
                            <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                            <h2 className="h5 text-uppercase mb-4">Top trending products</h2>
                        </header>
                        <div className="row">
                            {
                                products && products.map(value => (
                                    <div className="col-xl-3 col-lg-4 col-sm-6" key={value._id}>
                                        <div className="product text-center">
                                            <div className="position-relative mb-3">
                                                <div className="badge text-white badge-"></div>
                                                <Link className="d-block" to={`/detail/${value._id}`}>
                                                    <img className="img-fluid w-100" src={value.img1} alt="..." />
                                                </Link>
                                                <div className="product-overlay">
                                                    <ul className="mb-0 list-inline">
                                                        <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark" href="#"><i className="far fa-heart"></i></a></li>
                                                        <li className="list-inline-item m-0 p-0">
                                                            <Link className="btn btn-sm btn-dark" to={`/detail/${value._id}`}>
                                                                Add to cart
                                                            </Link>
                                                        </li>
                                                        <li className="list-inline-item mr-0">
                                                            {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal*/}
                                                            <a className="btn btn-sm btn-outline-dark" href={`#product_${value._id}`} data-toggle="modal">
                                                                <i className="fas fa-expand"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <h6> <a className="reset-anchor" href="detail.html">{value.name}</a></h6>
                                            <p className="small text-muted">${value.price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                    <section className="py-5 bg-light">
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-lg-4 mb-3 mb-lg-0">
                                    <div className="d-inline-block">
                                        <div className="media align-items-end">
                                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                                <use xlinkHref="#delivery-time-1"></use>
                                            </svg>
                                            <div className="media-body text-left ml-3">
                                                <h6 className="text-uppercase mb-1">Free shipping</h6>
                                                <p className="text-small mb-0 text-muted">Free shipping worlwide</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3 mb-lg-0">
                                    <div className="d-inline-block">
                                        <div className="media align-items-end">
                                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                                <use xlinkHref="#helpline-24h-1"> </use>
                                            </svg>
                                            <div className="media-body text-left ml-3">
                                                <h6 className="text-uppercase mb-1">24 x 7 service</h6>
                                                <p className="text-small mb-0 text-muted">Free shipping worlwide</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="d-inline-block">
                                        <div className="media align-items-end">
                                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                                <use xlinkHref="#label-tag-1"> </use>
                                            </svg>
                                            <div className="media-body text-left ml-3">
                                                <h6 className="text-uppercase mb-1">Festival offer</h6>
                                                <p className="text-small mb-0 text-muted">Free shipping worlwide</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-5">
                        <div className="container p-0">
                            <div className="row">
                                <div className="col-lg-6 mb-3 mb-lg-0">
                                    <h5 className="text-uppercase">Let's be friends!</h5>
                                    <p className="text-small text-muted mb-0">Nisi nisi tempor consequat laboris nisi.</p>
                                </div>
                                <div className="col-lg-6">
                                    <form action="#">
                                        <div className="input-group flex-column flex-sm-row mb-3">
                                            <input className="form-control form-control-lg py-3" type="email" placeholder="Enter your email address" aria-describedby="button-addon2" />
                                            <div className="input-group-append">
                                                <button className="btn btn-dark btn-block" id="button-addon2" type="submit">Subscribe</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </header>
        </div>
    );
}

export default Home;