import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import CouponAPI from '../Api/CouponAPI';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import productAPI from '../Api/productAPI';
import SaleAPI from '../Api/SaleAPI';

const defaultValues = {
    promotion: '',
    describe: '',
    start: '',
    end: '',
};

function CreateSale(props) {

    const [showMessage, setShowMessage] = useState('')

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });
    const onSubmit = async (data) => {

        const body = {
            promotion: data.promotion,
            describe: data.describe,
            start: startDate,
            end: endDate,
            status: true,
            id_product: selectProduct
        }

        console.log(body)


        const response = await SaleAPI.postSale(body)

        setShowMessage(response)

        reset({ defaultValues })

    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const [selectProduct, setSelectProduct] = useState("60866d646da8e98ac1e39ba0")

    const [product, setProduct] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const response = await productAPI.getAll()
            setProduct(response)

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
                                    showMessage === "Bạn đã thêm thành công" ?
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
                                        <label htmlFor="description">Khuyến Mãi</label>
                                        <input type="text" className="form-control" id="promotion" {...register('promotion', { required: true })} />
                                        {errors.promotion && errors.promotion.type === "required" && <p className="form-text text-danger">Khuyến mãi không được để trống</p>}
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="description">Mô tả</label>
                                        <input type="text" className="form-control" id="describe" {...register('describe', { required: true })} />
                                        {errors.describe && errors.describe.type === "required" && <p className="form-text text-danger">Mô tả không được để trống</p>}
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="description">Ngày bắt đầu</label><br />
                                        <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="description">Ngày kết thúc</label>
                                        <br />
                                        <DatePicker className="form-control" selected={endDate} onChange={(date) => setEndDate(date)} />
                                    </div>
                                    <div className="form-group w-25">
                                        <select className="form-control" value={selectProduct} onChange={(e) => setSelectProduct(e.target.value)}>
                                            {
                                                product && product.map(value => (
                                                    <option value={value._id} key={value._id}>{value.name_product}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Create Sale</button>
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

export default CreateSale;