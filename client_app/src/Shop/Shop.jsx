import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string'
import Product from '../API/Product';
import { Link, useParams } from 'react-router-dom';
import Products from './Component/Products';
import Pagination from './Component/Pagination';
import Search from './Component/Search';

Shop.propTypes = {

};

function Shop(props) {

    const { id } = useParams()

    const [products, setProducts] = useState([])

    //Tổng số trang
    const [totalPage, setTotalPage] = useState()

    //Từng trang hiện tại
    const [pagination, setPagination] = useState({
        page: '1',
        count: '9',
        search: '',
        category: id
    })


    //Hàm này dùng để thay đổi state pagination.page
    //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
    const handlerChangePage = (value) => {
        console.log("Value: ", value)

        //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
        setPagination({
            page: value,
            count: pagination.count,
            search: pagination.search,
            category: pagination.category
        })
    }

    //Gọi hàm để load ra sản phẩm theo pagination dữ vào id params 
    useEffect(() => {

        const fetchData = async () => {

            const params = {
                page: pagination.page,
                count: pagination.count,
                search: pagination.search,
                category: id
            }

            const query = '?' + queryString.stringify(params)

            const response = await Product.Get_Pagination(query)
            console.log(response)

            setProducts(response)


            // Gọi API để tính tổng số trang cho từng loại sản phẩm
            const params_total_page = {
                id_category: id
            }

            const query_total_page = '?' + queryString.stringify(params_total_page)

            const response_total_page = await Product.Get_Category_Product(query_total_page)

            //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
            const totalPage = Math.ceil(parseInt(response_total_page.length) / parseInt(pagination.count))
            console.log(totalPage)

            setTotalPage(totalPage)

        }

        fetchData()

    }, [id])

    //Gọi hàm để load ra sản phẩm theo pagination dữ vào id params 
    useEffect(() => {

        const fetchData = async () => {

            const params = {
                page: pagination.page,
                count: pagination.count,
                search: pagination.search,
                category: id
            }

            const query = '?' + queryString.stringify(params)

            const response = await Product.Get_Pagination(query)
            console.log(response)

            setProducts(response)

        }

        fetchData()

    }, [pagination])


    const [male, set_male] = useState([])
    const [female, set_female] = useState([])

    // Gọi API theo phương thức GET để load category
    useEffect(() => {

        const fetchData = async () => {

            // gender = male
            const params_male = {
                gender: 'male'
            }

            const query_male = '?' + queryString.stringify(params_male)

            const response_male = await Product.Get_Category_Gender(query_male)

            set_male(response_male)

            // gender = female
            const params_female = {
                gender: 'female'
            }

            const query_female = '?' + queryString.stringify(params_female)

            const response_female = await Product.Get_Category_Gender(query_female)

            set_female(response_female)

        }

        fetchData()

    }, [])


    const handler_Search = (value) => {
        console.log("Search: ", value)
        
        setPagination({
            page: pagination.page,
            count: pagination.count,
            search: value,
            category: pagination.category
        })

    }



    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Shop</li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="li-main-blog-page li-main-blog-details-page pt-60 pb-60 pb-sm-45 pb-xs-45">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 order-lg-1 order-2">
                            <div className="li-blog-sidebar-wrapper">
                                <div className="li-blog-sidebar">
                                    <div className="li-sidebar-search-form">
                                        <Search handler_Search={handler_Search} />
                                    </div>
                                </div>
                                <div className="li-blog-sidebar pt-25">
                                    <h4 className="li-blog-sidebar-title">All Product</h4>
                                    <ul className="li-blog-archive">
                                        <li><Link to="/shop/all" style={id === 'all' ? { cursor: 'pointer', color: '#fed700' } : { cursor: 'pointer' }}>All</Link></li>
                                    </ul>
                                </div>
                                <div className="li-blog-sidebar pt-25">
                                    <h4 className="li-blog-sidebar-title">Male</h4>
                                    <ul className="li-blog-archive">
                                        {
                                            male && male.map(value => (
                                                <li key={value._id}>
                                                    <Link to={`/shop/${value._id}`} style={id === value._id ? { cursor: 'pointer', color: '#fed700' } : { cursor: 'pointer' }}>{value.category}</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Female</h4>
                                    <ul className="li-blog-archive">
                                        {
                                            female && female.map(value => (
                                                <li key={value._id}>
                                                    <Link to={`/shop/${value._id}`} style={id === value._id ? { cursor: 'pointer', color: '#fed700' } : { cursor: 'pointer' }}>{value.category}</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2">
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
                                <div className="tab-content">
                                    <div id="grid-view" className="tab-pane active" role="tabpanel">
                                        <div className="product-area shop-product-area">
                                            <Products products={products} />
                                        </div>
                                    </div>
                                    <div className="paginatoin-area">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <p>Showing 1-9 of 9 item(s)</p>
                                            </div>
                                            <Pagination pagination={pagination} handlerChangePage={handlerChangePage} totalPage={totalPage} />
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

export default Shop;