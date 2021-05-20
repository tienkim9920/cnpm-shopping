import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router';
import CouponAPI from '../Api/CouponAPI';

const defaultValues = {
    code: '',
    count: '',
    promotion: '',
    describe: ''
};

function UpdateCoupon(props) {

    const [showMessage, setShowMessage] = useState('')

    const { id } = useParams()

    const [code, setCode] = useState('')
    const [count, setCount] = useState('')
    const [promotion, setPromotion] = useState('')
    const [describe, setDescribe] = useState('')

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });
    const onSubmit = async (data) => {

        const body = {
            code: code,
            count: count,
            promotion: promotion,
            describe: describe
        }

        const response = await CouponAPI.updateCoupon(id, body)

        setShowMessage(response.msg)

    };

    useEffect(() => {

        const fetchData = async () => {
            const response = await CouponAPI.getCoupon(id)
            setCode(response.code)
            setCount(response.count)
            setPromotion(response.promotion)
            setDescribe(response.describe)
        }

        fetchData()

    }, [])

    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Create Product</h4>
                                {
                                    showMessage === "Bạn đã cập nhật thành công" ?
                                        (
                                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                {showMessage}
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                        ) :
                                        (
                                            <p className="form-text text-danger">{showMessage}</p>
                                        )
                                }


                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group w-50">
                                        <label htmlFor="name">Mã Code</label>
                                        <input type="text" className="form-control" id="code" 
                                        {...register('code')} 
                                        value={code} 
                                        onChange={(e) => setCode(e.target.value)} />
                                        {errors.code && errors.code.type === "required" && <p className="form-text text-danger">Mã Code không được để trống</p>}
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="price">Số lượng</label>
                                        <input type="text" className="form-control" id="count" 
                                        {...register('count')} 
                                        value={count}
                                        onChange={(e) => setCount(e.target.value)} />
                                        {errors.count && errors.count.type === "required" && <p className="form-text text-danger">Số lượng không được để trống</p>}
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="description">Khuyến Mãi</label>
                                        <input type="text" className="form-control" id="promotion" 
                                        {...register('promotion')} 
                                        value={promotion} 
                                        onChange={(e) => setPromotion(e.target.value)} />
                                        {errors.promotion && errors.promotion.type === "required" && <p className="form-text text-danger">Khuyến mãi không được để trống</p>}
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="description">Mô tả</label>
                                        <input type="text" className="form-control" id="describe" 
                                        {...register('describe')} 
                                        value={describe}
                                        onChange={(e) => setDescribe(e.target.value)} />
                                        {errors.describe && errors.describe.type === "required" && <p className="form-text text-danger">Mô tả không được để trống</p>}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update Coupon</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by <a href="https://www.facebook.com/KimTien.9920/">Tiền Kim</a>.
            </footer>
        </div>
    );
}

export default UpdateCoupon;