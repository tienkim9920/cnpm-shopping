import axiosClient from './axiosClient'

const SaleAPI = {

    getList: () => {
        const url = `/api/admin/sale/list/product`
        return axiosClient.get(url)
    },

    checkSale: (id) => {
        const url = `/api/admin/sale/list/${id}`
        return axiosClient.get(url)
    }

}

export default SaleAPI