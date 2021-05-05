import React from 'react';

function Pagination({ filter, onPageChange, totalPage }) {
    const { page } = filter
    let indexPage = []

    //Tạo ra số nút bấm cho từng trang
    for (var i = 1; i <= totalPage; i++) {
        indexPage.push(i)
    }

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage)
        }
    }

    return (
        <nav aria-label="Page navigation example" className="pt-5">
            <ul className="pagination justify-content-center justify-content-lg-end">
                <li className="page-item">
                    <button className="page-link"
                        onClick={() => handlePageChange(parseInt(page) - 1)}
                        disabled={page <= 1}
                    >
                        <span>«</span>
                    </button>
                </li>

                <div className="d-flex">
                    {
                        indexPage && indexPage.map(value => (
                            <li className={value === parseInt(page) ? 'page-item active' : 'page-item'}
                                key={value}
                                onClick={() => handlePageChange(parseInt(value))}>

                                <button className="page-link">{value}</button>

                            </li>
                        ))
                    }
                </div>

                <li className="page-item">
                    <button className="page-link"
                        onClick={() => handlePageChange(parseInt(page) + 1)}
                        disabled={page >= totalPage}
                    >
                        <span>»</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;