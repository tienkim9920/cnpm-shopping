import axiosClient from "./axiosClient"

const orderAPI = {
    getAPI: (query) => {
        const url = `/admin/order${query}`
        return axiosClient.get(url)
    },
    details: (id, query) => {
        const url = `/admin/order/detail/${id}${query}`
        return axiosClient.get(url)
    }
}

export default orderAPI