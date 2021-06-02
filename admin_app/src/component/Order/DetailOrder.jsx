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

    const [order, setOrder] = useState()
    const [totalPage, setTotalPage] = useState()
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            const res = await orderAPI.details(idDetail)
            // console.log(res)
            setOrder(res)
        }

        fetchAllData()
    }, [])

    useEffect(() => {
        const query = '?' + queryString.stringify(filter)

        const fetchAllData = async () => {
            const od = await orderAPI.detailOrder(idDetail, query)
            console.log(od)
            setTotalPage(od.totalPage)
            setDetails(od.details)
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
                                <h4 className="card-title ml-1">Detail Order</h4>
                                {
                                    order ?
                                        (
                                            <div className="mt-3 ml-1">
                                                <h5>Address: {order.address}</h5>
                                                <h5>FeeShip: {new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(order.feeship)+ ' VNĐ'}</h5>
                                                <h5>Total: {new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(order.total)+ ' VNĐ'}</h5>
                                                <h5>Payment: {order.id_payment.pay_name}</h5>
                                                <h5>Create Time: {order.create_time}</h5>
                                            </div>

                                        ) :
                                        (
                                            <div></div>
                                        )
                                }

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
                                                details && details.map((value, index) => (
                                                    <tr key={index}>
                                                        <td><img src={value.id_product.image} alt="" style={{ width: '70px' }} /></td>
                                                        <td className="name">{value.name_product}</td>
                                                        <td className="name">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.price_product)+ ' VNĐ'}</td>
                                                        <td className="name">{value.size}</td>
                                                        <td className="name">{value.count}</td>
                                                        <td className="name">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.count * Number(value.price_product))+ ' VNĐ'}</td>
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
        </div >
    );
}

export default DetailOrder;