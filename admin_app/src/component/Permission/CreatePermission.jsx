import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import queryString from 'query-string'
import isEmpty from 'validator/lib/isEmpty'
import permissionAPI from '../Api/permissionAPI'

function CreatePermission(props) {
    const [name, setName] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const { handleSubmit } = useForm();

    const validateAll = () => {
        let msg = {}
        if (isEmpty(name)) {
            msg.name = "Tên không được để trống"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleCreate = () => {

        const isValid = validateAll();
        if (!isValid) return
        console.log(name)
        addPermission();
    }

    const addPermission = async () => {
        const query = '?' + queryString.stringify({ name: name })
        const response = await permissionAPI.create(query)
        if (response.msg === "Bạn đã thêm thành công") {
            setName('');
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
                                <h4 className="card-title">Create Permission</h4>
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
                                        <label htmlFor="name">Tên quyền</label>
                                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.name}</p>
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

export default CreatePermission;