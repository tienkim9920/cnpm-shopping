import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import queryString from 'query-string'

import orderAPI from '../Api/orderAPI';
import Pagination from '../Shared/Pagination'
import Search from '../Shared/Search'

function CompletedOrder(props) {
    const [filter, setFilter] = useState({
        page: '1',
        limit: '10',
        getDate: '',
    })

    const [order, setOrder] = useState([])
    const [totalPage, setTotalPage] = useState()
    const [totalMoney, setTotalMoney] = useState()

    useEffect(() => {
        const query = '?' + queryString.stringify(filter)

        const fetchAllData = async () => {
            const od = await orderAPI.completeOrder(query)
            setTotalPage(od.totalPage)
            setOrder(od.orders)
            setTotalMoney(od.totalMoney)
        }
        fetchAllData()

    }, [filter])

    const onPageChange = (value) => {
        setFilter({
            ...filter,
            page: value
        })
    }

    const handler_Report = () => {

        // source code HTML table to PDF

        var sTable = document.getElementById('customers').innerHTML;

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=900,width=1000');

        win.document.write('<html><head>');
        win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

        win.print();    // PRINT THE CONTENTS.

    }


    let day = [] 
    let month = []

    for (let i = 1; i < 32; i++){
        day.push(i)
    }

    for (let i = 1; i < 13; i++){
        month.push(i)
    }


    const [getDay, setGetDay] = useState('null')
    const [getMonth, setGetMonth] = useState('null')
    const [getYear, setGetYear] = useState('null')

    const [errMessage, setErrMessage] = useState('')
    const [subMessage, setSubMessage] = useState('')

    const handlerStatistic = (e) => {

        e.preventDefault()

        // Check Validation

        // Kiểm tra ngày tháng năm đều rỗng
        if ((getDay === 'null' && getMonth === 'null' && getYear === 'null')){
            setErrMessage('Vui lòng kiểm tra lại!')
            console.log("123")
            setSubMessage('')
            return
        }

        // Kiểm tra chỉ tháng là rỗng
        if (getDay !== 'null' && getYear !== 'null' && getMonth === 'null'){
            setErrMessage('Vui lòng kiểm tra lại!')
            console.log("456")
            setSubMessage('')
            return
        }

        // Kiểm tra chỉ năm là rỗng
        if (getDay !== 'null' && getMonth !== 'null' && getYear === 'null'){
            setErrMessage('Vui lòng kiểm tra lại!')
            console.log("789")
            setSubMessage('')
            return
        }

        // Kiểm tra năm và tháng là rỗng
        if (getDay !== 'null' && getMonth === 'null' && getYear === 'null'){
            setErrMessage('Vui lòng kiểm tra lại!')
            console.log("11")
            setSubMessage('')
            return
        } 
        
        // Kiểm tra ngày và năm là rỗng
        if (getDay === 'null' && getMonth !== 'null' && getYear === 'null'){
            setErrMessage('Vui lòng kiểm tra lại!')
            console.log("10")
            setSubMessage('')
            return
        }           
        // Check Validation



        //Xử lý thanh toán theo ngày
        if ((getDay !== 'null') && (getMonth !== 'null') && (getYear !== 'null')){

            setFilter({
                ...filter,
                getDate: `${getDay}/${getMonth}/${getYear}`
            })

            setSubMessage('Thống Kê Theo Ngày Thành Công!')
            setErrMessage('')
        }        

        // Xử lý thanh toán theo tháng
        if (getDay === 'null' && getMonth !== 'null' && getYear !== 'null'){

            setFilter({
                ...filter,
                getDate: `/${getMonth}/${getYear}`
            })

            setSubMessage('Thống Kê Theo Tháng Thành Công!')
            setErrMessage('')
        }

        //Xử lý thanh toán theo năm
        if (getDay === 'null' && getMonth === 'null' && getYear !== 'null'){

            setFilter({
                ...filter,
                getDate: `/${getYear}`
            })

            setSubMessage('Thống Kê Năm Thành Công!')
            setErrMessage('')
        }

    }

    return (
        <div className="page-wrapper">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Complete Order</h4>
                                <div className="table-responsive mt-3" id="customers">
                                    <table className="table table-striped table-bordered no-wrap" id="tab_customers">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>Status</th>
                                                <th>Total</th>
                                                <th>Payment</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                order && order.map((value, index) => (
                                                    <tr key={index}>
                                                        <td className="name">{value._id}</td>
                                                        <td className="name">{value.id_note.fullname}</td>
                                                        <td className="name">{value.id_user.email}</td>
                                                        <td className="name">{value.id_note.phone}</td>
                                                        <td className="name">{value.address}</td>
                                                        <td>
                                                            {(() => {
                                                                switch (value.status) {
                                                                    case "1": return "Đang xử lý";
                                                                    case "2": return "Đã xác nhận";
                                                                    case "3": return "Đang giao";
                                                                    case "4": return "Hoàn thành";
                                                                    default: return "Đơn bị hủy";
                                                                }
                                                            })()}
                                                        </td>
                                                        <td className="name">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(value.total)+ ' VNĐ'}</td>
                                                        <td className="name">{value.pay === true ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link to={"/order/detail/" + value._id} className="btn btn-info mr-1">Detail</Link>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <h4 className="card-title">Total Money: {new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(totalMoney)+ ' VNĐ'}</h4>
                                </div>
                                <Pagination filter={filter} onPageChange={onPageChange} totalPage={totalPage} />
                                    <div>
                                        <div className="d-flex">
                                            <h4>Chọn phương thức thống kê</h4>
                                        </div>
                                        <br />
                                        <select className="custom-select" style={{ color: 'gray', width: '85px'}}
                                            value={getDay} onChange={(e) => setGetDay(e.target.value)}>
                                            <option value="null">Ngày</option>
                                            {
                                                day && day.map(d => (
                                                    <option value={d} key={d}>{d}</option>
                                                ))
                                            }
                                        </select>
                                        &nbsp;/&nbsp;
                                        <select className="custom-select" style={{ color: 'gray', width: '85px'}}
                                            value={getMonth} onChange={(e) => setGetMonth(e.target.value)}>
                                            <option value="null" >Tháng</option>
                                            {
                                                month && month.map(m => (
                                                    <option value={m} key={m}>{m}</option>
                                                ))
                                            }
                                        </select>
                                        &nbsp;/&nbsp;
                                        <select className="custom-select" style={{ color: 'gray', width: '85px'}}
                                            value={getYear} onChange={(e) => setGetYear(e.target.value)}>
                                            <option value="null">Năm</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                        </select>
                                        &nbsp;
                                        <input type="submit" className="btn btn-primary" value="Lọc Hóa Đơn" onClick={handlerStatistic} />
                                    </div>
                                    <div>
                                    {
                                        errMessage !== '' && <span className="text-danger">{errMessage}</span>
                                    }
                                    {
                                        subMessage !== '' && <span className="text-success">{subMessage}</span>
                                    }
                                    </div>
                                    <br />
                                    <a className="btn btn-success mb-5"
                                        onClick={handler_Report}
                                        style={{ color: '#fff', cursor: 'pointer' }}>Thống Kê</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by
            <a href="https://www.facebook.com/KimTien.9920/"> Tiền Kim</a>.
        </footer>
        </div>
    );
}

export default CompletedOrder;