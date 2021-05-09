import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string'

import categoryAPI from '../Api/categoryAPI';
import Pagination from '../Shared/Pagination'
import Search from '../Shared/Search'

function Category(props) {
    const [filter, setFilter] = useState({
        page: '1',
        limit: '4',
        search: '',
        status: true
    })

    const [category, setCategory] = useState([])
    const [totalPage, setTotalPage] = useState()


    useEffect(() => {
        const query = '?' + queryString.stringify(filter)

        const fetchAllData = async () => {
            const ct = await categoryAPI.getAPIPage(query)
            setTotalPage(ct.totalPage)
            setCategory(ct.categories)
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
        const query = '?' + queryString.stringify({ id: value._id })

        const response = await categoryAPI.delete(query)

        if (response.msg === "Thanh Cong") {
            setFilter({
                ...filter,
                status: !filter.status
            })
        }
    }

    return (
        <div className="page-wrapper">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Category</h4>
                                {/* <h4 className="card-title">Producer</h4> */}
                                <Search handlerSearch={handlerSearch} />

                                <Link to="/category/create" className="btn btn-primary my-3">New create</Link>
                                {/* <Link to="/producer/create" className="btn btn-primary my-3">New create</Link> */}


                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                category && category.map((value, index) => (
                                                    <tr key={index}>
                                                        <td className="name">{value._id}</td>
                                                        <td className="name">{value.category}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link to={"/category/" + value.category} className="btn btn-info mr-1">Detail</Link>
                                                                <Link to={"/category/update/" + value._id} className="btn btn-success mr-1">Update</Link>
                                                                {/* <Link to={"/producer/" + value.category} className="btn btn-info mr-1">Detail</Link>
                                                                <Link to={"/producer/update/" + value._id} className="btn btn-success mr-1">Update</Link> */}

                                                                <button type="button" onClick={() => handleDelete(value)} style={{ cursor: 'pointer', color: 'white' }} className="btn btn-danger" >Delete</button>
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
                All Rights Reserved by Adminmart. Designed and Developed by <a
                    href="https://www.facebook.com/KimTien.9920/">Tiền Kim</a>.
        </footer>
        </div>
    );
}

export default Category;