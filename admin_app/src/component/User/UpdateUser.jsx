import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import queryString from 'query-string'
import isEmpty from 'validator/lib/isEmpty'

import userApi from '../Api/userAPI'
import permissionAPI from '../Api/permissionAPI'

function UpdateUser(props) {
    const [id] = useState(props.match.params.id)
    const [permission, setPermission] = useState([])
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [permissionChoose, setPermissionChoose] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const { handleSubmit } = useForm();

    useEffect(() => {
        const fetchAllData = async () => {
            const ps = await permissionAPI.getAPI();
            const rs = await userApi.details(id)
            console.log(rs)
            setEmail(rs.email)
            setUserName(rs.username)
            setName(rs.fullname)
            setPermissionChoose(rs.id_permission)
            setPermission(ps)
        }
        fetchAllData()
    }, [])

    const validateAll = () => {
        const nameRegex = /^\b[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]+.{1}$/
        let msg = {}
        if (isEmpty(name)) {
            msg.name = "Tên không được để trống"
        } else if (nameRegex.test(name.trim()) === false) {
            msg.name = "Tên sai định dạng (Ít nhất 3 kí tự alphabet)"
        }


        if (isEmpty(permissionChoose)) {
            msg.permission = "Vui lòng chọn quyền"
        }
        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleCreate = () => {

        const isValid = validateAll();
        if (!isValid) return
        addUser();
    }


    const addUser = async () => {
        const user = {
            id: id,
            name: name,
            password: password,
            permission: permissionChoose
        }
        const query = '?' + queryString.stringify(user)
        const response = await userApi.update(query)

        if (response.msg === "Bạn đã update thành công") {
            window.scrollTo(0, 0)
            setPassword('');
        }
        setValidationMsg({ api: response.msg })

    }

    return (
        <div className="page-wrapper">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Update User</h4>
                                {
                                    validationMsg.api === "Bạn đã update thành công" ?
                                        (
                                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                {validationMsg.api}
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                        ) :
                                        (
                                            <p className="form-text text-danger">{validationMsg.api}</p>
                                        )
                                }


                                <form onSubmit={handleSubmit(handleCreate)}>

                                    <div className="form-group w-50">
                                        <label htmlFor="email">Email:</label>
                                        <input type="text" className="form-control" id="email" name="email" value={email} disabled />
                                    </div>

                                    <div className="form-group w-50">
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" className="form-control" id="username" name="username" value={username} disabled />
                                    </div>

                                    <div className="form-group w-50">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.name}</p>
                                    </div>

                                    <div className="form-group w-50">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <p className="form-text text-danger">{validationMsg.password}</p>
                                    </div>

                                    <div className="form-group w-50">
                                        <label htmlFor="categories" className="mr-2">Chọn quyền:</label>
                                        <select name="categories" id="categories" value={permissionChoose} onChange={(e) => setPermissionChoose(e.target.value)}>
                                            <option>Chọn quyền</option>
                                            {
                                                permission && permission.map((item, index) => (
                                                    <option value={item._id} key={index} >{item.permission}</option>
                                                ))
                                            }
                                        </select>
                                        <p className="form-text text-danger">{validationMsg.permission}</p>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by <a href="https://wrappixel.com">WrapPixel</a>.
    </footer>
        </div>
    );
}

export default UpdateUser;