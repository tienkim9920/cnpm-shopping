import React, { useEffect, useState } from 'react';
import './Event.css'
import queryString from 'query-string'
import CouponAPI from '../API/CouponAPI';
import Pagination from '../Shop/Component/Pagination';
import { Link } from 'react-router-dom';

function Event(props) {

    const [pagination, setPagination] = useState({
        page: '1',
        limit: '6',
        search: ''
    })

    const [coupons, setCoupons] = useState([])
    const [totalPage, setTotalPage] = useState()


    useEffect(() => {
        const query = '?' + queryString.stringify(pagination)

        const fetchAllData = async () => {
            const response = await CouponAPI.getCoupons(query)
            setCoupons(response.coupons)
            setTotalPage(response.totalPage)
        }
        fetchAllData()
    }, [pagination])


    const handlerChangePage = (value) => {
        setPagination({
            ...pagination,
            page: value
        })
    }

    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Event</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container" style={{ marginTop: '3rem' }}>
                <div className="grid-container" style={{ padding: '2rem'}}>
                    {
                        coupons && coupons.map(value => (
                            <div className="bg_event animate__animated animate__zoomIn col_product">
                                <div>
                                    <div>
                                        <img style={{ width: '100%' }} src="https://images.squarespace-cdn.com/content/v1/574508273c44d8a75d514007/1551162888839-WVS5KENEESGPQHWU42AZ/ke17ZwdGBToddI8pDm48kBOZh8gzGOBxgrSgZSeuZdJZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PII3qbj4xMsHCFUZnBp1OKu1_zuOkWNtJ6_UyKa7tPS1wKMshLAGzx4R3EDFOm1kBS/JOLLIBEE_750x468_V4.jpg?format=1500w" alt="" />
                                    </div>
                                    <div style={{ padding: '1rem 1.2rem' }}>
                                        <h4 className="h4_event">{value.describe}</h4>
                                        <div style={{ marginTop: '2rem' }}>
                                            <a className="a_event">Khuyến mãi</a>
                                        </div>
                                        <div style={{ marginTop: '2rem' }}>
                                            <span style={{ fontSize: '1rem', color: 'gray' }}>Còn lại: <i style={{ color: '#fed700' }}>{value.count} lần</i></span>
                                        </div>
                                        <hr />
                                        <div style={{ marginTop: '.5rem' }}>
                                            <span style={{ fontSize: '1rem', color: 'gray' }}>
                                                Cơ hội nhận nhiều ưu đãi khi mua sản phẩm tại shop của chúng tôi
                                    </span>
                                        </div>
                                        <div style={{ marginTop: '1rem' }} className="d-flex justify-content-center">
                                            <Link to={`/event/${value._id}`} className="a_promotion">Xem Ngay</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="d-flex justify-content-center" style={{ padding: '2rem 0' }}>
                    <Pagination pagination={pagination} handlerChangePage={handlerChangePage} totalPage={totalPage} />
                </div>

            </div>
        </div>
    );
}

export default Event;