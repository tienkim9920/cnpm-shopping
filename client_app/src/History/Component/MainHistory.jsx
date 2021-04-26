import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import OrderAPI from '../../API/OrderAPI';

MainHistory.propTypes = {

};

function MainHistory(props) {

    const [history, set_history] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const response = await OrderAPI.get_order(sessionStorage.getItem('id_user'))

            console.log(response)

            set_history(response)

        }

        fetchData()

    }, [])

    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">History</li>
                        </ul>
                    </div>
                </div>
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
                                                <th className="li-product-remove">ID Invoice</th>
                                                <th className="li-product-thumbnail">Name</th>
                                                <th className="cart-product-name">Phone</th>
                                                <th className="li-product-price">Address</th>
                                                <th className="li-product-price">Email</th>
                                                <th className="li-product-quantity">Total</th>
                                                <th className="li-product-subtotal">Payment</th>
                                                <th className="li-product-subtotal">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                history && history.map(value => (
                                                    <tr key={value._id}>
                                                        <td className="li-product-price"><span className="amount"><Link to={`/history/${value._id}`}>View</Link></span></td>
                                                        <td className="li-product-price"><span className="amount">{value.id_user.fullname}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.phone}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.id_delivery.to}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.email}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.total}</span></td>
                                                        <td className="li-product-price"><span className="amount" style={value.status ? { color: 'green'} : { color: 'red'}}>{value.status ? 'Paid' : 'Unpaid'}</span></td>
                                                        <td className="li-product-price"><span className="amount">
                                                            {
                                                            value.delivery === 0 ? 'X' : 
                                                            (value.delivery === 1 ? 'Confirmed' : 
                                                            (value.delivery === 2 ? 'Shipping' : 
                                                            (value.delivery === 3 ? 'Finished' : 'Undifine'))) }
                                                            </span>
                                                        </td>
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

export default MainHistory;