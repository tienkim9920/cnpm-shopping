import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

Pagination.propTypes = {
    pagination: PropTypes.object,
    handlerChangePage: PropTypes.func,
    totalPage: PropTypes.number
};

Pagination.defaultProps = {
    pagination: {},
    handlerChangePage: null,
    totalPage: null
}

function Pagination(props) {

    const { pagination, handlerChangePage, totalPage } = props

    const { page } = pagination

    let indexPage = []

    //Tạo ra số nút bấm cho từng trang
    for (var i = 1; i <= totalPage; i++) {
        indexPage.push(i)
    }

    const onDownPage = (value) => {

        if (!handlerChangePage) {
            return
        }

        const newPage = parseInt(value) - 1
        handlerChangePage(newPage)

    }

    const onUpPage = (value) => {

        if (!handlerChangePage) {
            return
        }

        const newPage = parseInt(value) + 1
        handlerChangePage(newPage)
    }

    const onChangeIndex = (value) => {
        if (!handlerChangePage) {
            return
        }

        handlerChangePage(value)
    }

    return (
        <ul className="pagination-box">
            <li>
                <button className="btn btn-secondary Previous" style={{ cursor: 'pointer' }}
                    onClick={() => onDownPage(page)}
                    disabled={page <= 1}
                >
                    <i className="fa fa-chevron-left"></i>
                </button>
            </li>
            {
                indexPage && indexPage.map(value => (
                    <li className={value === parseInt(page) ? "active" : ''}>
                        <a style={{ cursor: 'pointer' }} onClick={() => onChangeIndex(value)}>{value}</a>
                    </li>
                ))
            }
            <li>
                <button className="btn btn-secondary Next" style={{ cursor: 'pointer' }}
                    onClick={() => onUpPage(page)}
                    disabled={page >= totalPage}
                >
                    <i className="fa fa-chevron-right"></i>
                </button>
            </li>
        </ul>
    );
}

export default Pagination;