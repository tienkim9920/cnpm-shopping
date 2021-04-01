import React from 'react';
import PropTypes from 'prop-types';
import IndexPage from './IndexPage';

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
    for (var i = 1; i <= totalPage; i++){
        indexPage.push(i)
    }

    const onDownPage = (value) => {
        
        if (!handlerChangePage){
            return
        }

        const newPage = parseInt(value) - 1
        handlerChangePage(newPage)

    }

    const onUpPage = (value) => {
                
        if (!handlerChangePage){
            return
        }

        const newPage = parseInt(value) + 1
        handlerChangePage(newPage)
    }

    return (
        <nav aria-label="Page navigation example" className="pt-5">
            <ul className="pagination justify-content-center justify-content-lg-end">
                <li className="page-item">
                    <button className="page-link" 
                        onClick={() => onDownPage(page)} 
                        disabled={page <= 1 }>
                        <span>«</span>
                    </button>
                </li>
                <IndexPage indexPage={indexPage} handlerChangePage={handlerChangePage} pagination={pagination}/>
                <li className="page-item">
                    <button className="page-link" 
                        onClick={() => onUpPage(page)} 
                        disabled={page >= totalPage}>
                            <span>»</span>
                    </button>
                </li>
            </ul>
            <div className="pagination justify-content-center justify-content-lg-end">
                <p className="text-small text-muted mb-0">Showing 1–9 of {parseInt(totalPage) * 9} results</p>
            </div>
        </nav>
    );
}

export default Pagination;