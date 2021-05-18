import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import queryString from 'query-string'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'

import userApi from '../Api/userAPI'
import permissionAPI from '../Api/permissionAPI'

function CreateUserCus(props) {
    const [permission, setPermission] = useState([])
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [permissionChoose, setPermissionChoose] = useState('6087dcb5f269113b3460fce4');
    const [validationMsg, setValidationMsg] = useState('');
    const { handleSubmit } = useForm();

    useEffect(() => {
        const fetchAllData = async () => {
            const ps = await permissionAPI.getAPI();
            setPermission(ps)
        }
        fetchAllData()
    }, [])

    const validateAll = () => {
        const phongeRegex = /^0(?=.+[0-9]).{9}$/
        const nameRegex = /^\b[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]+.{1}$/
        const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        let msg = {}
        if (isEmpty(name)) {
            msg.name = "Tên không được để trống"
        } else if (nameRegex.test(name.trim()) === false) {
            msg.name = "Tên sai định dạng (Ít nhất 3 kí tự alphabet)"
        }

        if (isEmpty(email)) {
            msg.email = "Email không được để trống"
        } else if (!isEmail(email)) {
            msg.email = "Email sai định dạng"
        }

        if (isEmpty(password)) {
            msg.password = "Mật khẩu không được để trống"
        }
        if (isEmpty(username.trim())) {
            msg.username = "Username không được để trống"
        } else if (!usernameRegex.test(username.trim())) {
            msg.username = "Username sai định dạng"
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
            name: name,
            email: email,
            password: password,
            username: username,
            permission: permissionChoose
        }
        const query = '?' + queryString.stringify(user)
        const response = await userApi.create(query)

        if (response.msg === "Bạn đã thêm thành công") {
            window.scrollTo(0, 0)
            setName('');
            setUserName('');
            setEmail('');
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
                                <h4 className="card-title">Create User</h4>
                                {
                                    validationMsg.api === "Bạn đã thêm thành công" ?
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
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.name}</p>
                                    </div>

                                    <div className="form-group w-50">
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" className="form-control" id="username" name="username" value={username} onChange={(e) => setUserName(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.username}</p>
                                    </div>

                                    <div className="form-group w-50">
                                        <label htmlFor="email">Email:</label>
                                        <input type="text" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.email}</p>
                                    </div>

                                    <div className="form-group w-50">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.password}</p>
                                    </div>


                                    <button type="submit" className="btn btn-primary">Create</button>
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

export default CreateUserCus;