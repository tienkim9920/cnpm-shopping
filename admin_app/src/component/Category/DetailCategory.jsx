import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import categoryAPI from '../Api/categoryAPI';
import Pagination from '../Shared/Pagination'
import Search from '../Shared/Search'
import ModalCategory from './ModalCategory'

function DetailCategory(props) {
    const [category] = useState(props.match.params.id)
    const [filter, setFilter] = useState({
        page: '1',
        limit: '5',
        search: '',
        status: true,

    })

    const [products, setProducts] = useState([])
    const [totalPage, setTotalPage] = useState()


    useEffect(() => {
        const query = '?' + queryString.stringify(filter)

        const fetchAllData = async () => {
            const response = await categoryAPI.details(category, query)
            setProducts(response.products)
            setTotalPage(response.totalPage)
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

    const handleDelete = async (value) => {


    }


    return (
        <div className="page-wrapper">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{category}</h4>
                                <Search handlerSearch={handlerSearch} />

                                <button type="button" class="btn btn-primary my-3" data-toggle="modal" data-target="#exampleModalCenter">
                                    Add Product
                                </button>
                                <ModalCategory id={category} />

                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Image</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                products && products.map((value, index) => (
                                                    <tr key={index}>
                                                        <td className="name">{value._id}</td>
                                                        <td className="name">{value.name_product}</td>
                                                        <td>{value.price_product}</td>
                                                        <td><img src={value.image} alt="" style={{ width: '70px' }} /></td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <button href="/products/update/<%= product._id %>" className="btn btn-success mr-1">Update</button>

                                                                <button type="button" style={{ cursor: 'pointer', color: 'white' }} onClick={() => handleDelete(value._id)} className="btn btn-danger" >Delete</button>
                                                            </div>
                                                        </td>
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

export default DetailCategory;