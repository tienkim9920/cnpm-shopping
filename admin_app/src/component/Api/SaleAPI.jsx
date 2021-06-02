import axiosClient from './axiosClient'

const SaleAPI = {

    getAll: (query) => {
        const url = `/admin/sale/${query}`
        return axiosClient.get(url)
    },

    postSale: (data) => {
        const url = `/admin/sale`
        return axiosClient.post(url, data)
    },

    detailSale: (id) => {
        const url = `/admin/sale/${id}`
        return axiosClient.get(url)
    },

    updateSale: (id, data) => {
        const url = `/admin/sale/${id}`
        return axiosClient.patch(url, data)
    }

}

export default SaleAPI