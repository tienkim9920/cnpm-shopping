import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import HistoryAPI from '../../API/HistoryAPI';

DetailHistory.propTypes = {

};

function DetailHistory(props) {

    const { id } = useParams()

    const [history, set_history] = useState({})

    const [detail_history, set_detail_history] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const response = await HistoryAPI.get_history_view(id)
            set_history(response)

            const response_detail = await HistoryAPI.get_detail_history(id)
            set_detail_history(response_detail)
        }

        fetchData()

    }, [])

    return (
        <div>
            <div className="container" style={{ paddingTop: '3rem' }}>
                <h1>Thông Tin Chi Tiết Đơn Hàng</h1>
                <ul>
                    <li style={{ fontSize: '1.1rem' }}>ID Invoice: <span>{history._id}</span></li>
                    <li style={{ fontSize: '1.1rem' }}>Full Name: <span>{history.fullname}</span></li>
                    <li style={{ fontSize: '1.1rem' }}>Phone: <span>{history.phone}</span></li>
                    <li style={{ fontSize: '1.1rem' }}>Address: <span>{history.address}</span></li>
                    <li style={{ fontSize: '1.1rem' }}>Email: <span>{history.email}</span></li>
                    <li style={{ fontSize: '1.1rem' }}>Total: <span>{history.total}$</span></li>
                </ul>
            </div>

            <div className="Shopping-cart-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form action="#">
                                <div className="table-content table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="li-product-remove">Image</th>
                                                <th className="li-product-thumbnail">Name Product</th>
                                                <th className="cart-product-name">Price</th>
                                                <th className="li-product-price">Count</th>
                                                <th className="li-product-price">Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detail_history && detail_history.map(value => (
                                                    <tr key={value._id}>
                                                        <td className="li-product-thumbnail"><img src={value.image} style={{ width: '5rem'}} alt="Li's Product Image" /></td>
                                                        <td className="li-product-name"><a href="#">{value.name_product}</a></td>
                                                        <td className="li-product-price"><span className="amount">${value.price_product}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.count}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.size}</span></td>
                                                    </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailHistory;