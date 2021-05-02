import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import queryString from 'query-string'

import orderAPI from '../Api/orderAPI';
import Pagination from '../Shared/Pagination'
import Search from '../Shared/Search'


function DetailOrder(props) {
    const [idDetail] = useState(props.match.params.id)
    const [filter, setFilter] = useState({
        page: '1',
        limit: '4',
        search: ''
    })

    const [order, setOrder] = useState([])
    const [totalPage, setTotalPage] = useState()

    useEffect(() => {
        const query = '?' + queryString.stringify(filter)

        const fetchAllData = async () => {
            const od = await orderAPI.details(idDetail, query)
            setTotalPage(od.totalPage)
            setOrder(od.details)

        }

        fetchAllData()
    }, [filter])

    const onPageChange = (value) => {
        setFilter({
            ...filter,
            page: value
        })
    }

    const handlerSearch = (value) => {
        setFilter({
            ...filter,
            page: '1',
            search: value
        })
    }
    return (


        <div className="page-wrapper">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Detail Order</h4>
                                <Search handlerSearch={handlerSearch} />

                                <div className="table-responsive mt-3">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Size</th>
                                                <th>Count</th>
                                                <th>Total Money</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                order && order.map((value, index) => (
                                                    <tr key={index}>
                                                        <td><img src={value.image} alt="" style={{ width: '70px' }} /></td>
                                                        <td className="name">{value.name_product}</td>
                                                        <td className="name">{value.price_product}</td>
                                                        <td className="name">{value.size}</td>
                                                        <td className="name">{value.count}</td>
                                                        <td className="name">{value.count * Number(value.price_product)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination filter={filter} onPageChange={onPageChange} totalPage={totalPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by
    <a href="https://www.facebook.com/KimTien.9920/">Tiền Kim</a>.
</footer>
        </div>
    );
}

export default DetailOrder;