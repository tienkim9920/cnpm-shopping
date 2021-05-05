import React, { useState, useEffect } from 'react';
import queryString from 'query-string'

import productAPI from '../Api/productAPI';
import Pagination from '../Shared/Pagination'
import Search from '../Shared/Search'

function ModalCategory({ id }) {
    const [filter, setFilter] = useState({
        page: '1',
        limit: '5',
        search: '',
        status: true
    })

    const [products, setProducts] = useState([])
    const [totalPage, setTotalPage] = useState()


    useEffect(() => {
        const query = '?' + queryString.stringify(filter)

        const fetchAllData = async () => {
            const response = await productAPI.getAPI(query)
            setProducts(response.products)
            setTotalPage(response.totalPage)
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

    return (
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Products</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <Search handlerSearch={handlerSearch} />

                        <form action="/action_page.php" className="my-3">
                            {
                                products && products.map((item, index) => {
                                    return item.id_category && item.id_category.category !== id ?
                                        (
                                            <div>
                                                <input type="checkbox" id={index} name={index} defaultChecked value={item._id} className="mr-3" />
                                                <label for={index}>{item.name_product}</label>
                                            </div>
                                        ) :
                                        (
                                            <div>
                                                <input type="checkbox" id={index} name={index} value={item._id} className="mr-3" />
                                                <label for={index}>{item.name_product}</label>
                                            </div>
                                        )
                                })
                            }

                        </form>

                        <Pagination filter={filter} onPageChange={onPageChange} totalPage={totalPage} />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCategory;