import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CouponAPI from '../API/CouponAPI';
import './Event.css'

function DetailEvent(props) {

    const { id } = useParams()

    const [coupon, setCoupon] = useState({})

    useEffect(() => {

        const fetchData = async () => {

            const resposne = await CouponAPI.getCoupon(id)
            
            setCoupon(resposne)

        }

        fetchData()

    }, [id])

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
                <h1 className="h4_event">{coupon.describe} CÙNG FEAR OF GOD!!!</h1>
                <div style={{ marginTop: '2rem' }}>
                    <a className="a_event">Khuyến mãi</a>
                </div>
                <div style={{ marginTop: '2rem'}}>
                    <span style={{ fontSize: '1.2rem', color: '#646464', fontWeight: 'bold' }}>Cơ hội nhận ngay phiếu giảm giá đơn hàng của FEAR OF GOD!!!</span>
                    <br />
                    <span style={{ fontSize: '1.05rem' }}>Chỉ cần bạn ghé ngay FEAR OF GOD và mua đơn hàng sẽ được giảm giá theo mã code dưới đây:</span>
                    <li style={{ fontSize: '1.05rem' }}>Mã Code: <i style={{ color: 'red' }}>{coupon.code}</i></li>
                    <li style={{ fontSize: '1.05rem' }}>Còn lại: <i style={{ color: 'red' }}>{coupon.count}</i></li>
                    <span style={{ fontSize: '1.05rem' }}>Bạn sẽ nhập mã code vào ô APPLY COUPON trong giỏ hàng của mình.</span>
                    <br />
                    <span style={{ fontSize: '1.05rem'}}>Lưu ý: <i style={{ color: 'red' }}>Mỗi mã code chỉ sử dụng được 1 lần.</i></span>
                </div>
                <div style={{ padding: '3rem 0' }}>
                    <img style={{ width: '100%' }} src="https://images.squarespace-cdn.com/content/v1/574508273c44d8a75d514007/1551162888839-WVS5KENEESGPQHWU42AZ/ke17ZwdGBToddI8pDm48kBOZh8gzGOBxgrSgZSeuZdJZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PII3qbj4xMsHCFUZnBp1OKu1_zuOkWNtJ6_UyKa7tPS1wKMshLAGzx4R3EDFOm1kBS/JOLLIBEE_750x468_V4.jpg?format=1500w" alt="" />
                </div>
            </div>
        </div>
    );
}

export default DetailEvent;