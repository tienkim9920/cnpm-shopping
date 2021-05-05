import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string'

import permissionAPI from '../Api/permissionAPI';
import Pagination from '../Shared/Pagination'
import Search from '../Shared/Search'

function Permission(props) {
    const [filter, setFilter] = useState({
        page: '1',
        limit: '4',
        search: '',
        status: true
    })

    const [permission, setPermission] = useState([])
    const [totalPage, setTotalPage] = useState()

    useEffect(() => {
        const query = '?' + queryString.stringify(filter)

        const fetchAllData = async () => {
            const ct = await permissionAPI.getAPIPage(query)
            setTotalPage(ct.totalPage)
            setPermission(ct.permission)
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

        const response = await permissionAPI.delete(query)

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
                                <h4 className="card-title">Permission</h4>
                                <Search handlerSearch={handlerSearch} />

                                <Link to="/permission/create" className="btn btn-primary my-3">New create</Link>


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
                                                permission && permission.map((value, index) => (
                                                    <tr key={index}>
                                                        <td className="name">{value._id}</td>
                                                        <td className="name">{value.permission}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link to={"/permission/update/" + value._id} className="btn btn-success mr-1">Update</Link>

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

export default Permission;