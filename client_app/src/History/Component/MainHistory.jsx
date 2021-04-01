import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HistoryAPI from '../../API/HistoryAPI';
import queryString from 'query-string'

MainHistory.propTypes = {
    
};

function MainHistory(props) {
    const [listCart, setListCart] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const params = {
                idUser: sessionStorage.getItem('id_user')
            }

            const query = '?' + queryString.stringify(params)

            const response = await HistoryAPI.getHistoryAPI(query)
            console.log(response)

            setListCart(response)

        }

        fetchData()

    }, [])

    return (
        <div className="container">
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                        <div className="col-lg-6">
                            <h1 className="h2 text-uppercase mb-0">History</h1>
                        </div>
                        <div className="col-lg-6 text-lg-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                                    <li className="breadcrumb-item active">History</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <div className="table-responsive pt-5 pb-5">
                <table className="table">
                    <thead className="bg-light">
                        <tr className="text-center">
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">ID Order</strong></th>
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">ID User</strong></th>
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Name</strong></th>
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Phone</strong></th>
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Address</strong></th>
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Total</strong></th>
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Delivery</strong></th>
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Status</strong></th>
                            <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Detail</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listCart && listCart.map((value) => (
                                <tr className="text-center" key={value._id}>
                                    <td className="align-middle border-0">
                                        <p className="mb-0 small">{value._id}</p>
                                    </td>
                                    <td className="align-middle border-0">
                                        <p className="mb-0 small">{value.idUser}</p>
                                    </td>
                                    <td className="align-middle border-0">
                                        <p className="mb-0 small">{value.fullname}</p>
                                    </td>
                                    <td className="align-middle border-0">
                                        <p className="mb-0 small">{value.phone}</p>
                                    </td>
                                    <td className="align-middle border-0">
                                        <p className="mb-0 small">{value.address}</p>
                                    </td>
                                    <td className="align-middle border-0">
                                        <p className="mb-0 small">${value.total}</p>
                                    </td>
                                    <td className="align-middle border-0">
                                        <p className="mb-0 small">{!value.delivery ? 'Waiting for progressing' : 'Processed'}</p>
                                    </td>
                                    <td className="align-middle border-0">
                                        <p className="mb-0 small">{!value.status ? 'Waiting for pay' : 'Paid'}</p>
                                    </td>
                                    <td className="align-middle border-0">
                                        <Link className="btn btn-outline-dark btn-sm" to={`/history/${value._id}`}>
                                            View<i className="fas fa-long-arrow-alt-right ml-2"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MainHistory;