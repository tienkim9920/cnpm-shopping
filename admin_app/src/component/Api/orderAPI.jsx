import axiosClient from "./axiosClient"

const orderAPI = {
    getAPI: (query) => {
        const url = `/admin/order${query}`
        return axiosClient.get(url)
    },
    details: (id) => {
        const url = `/admin/order/detail/${id}`
        return axiosClient.get(url)
    },
    detailOrder: (id, query) => {
        const url = `/admin/order/detailorder/${id}${query}`
        return axiosClient.get(url)
    },
    confirmOrder: (query) => {
        const url = `/admin/order/confirmorder${query}`
        return axiosClient.patch(url)
    },
    delivery: (query) => {
        const url = `/admin/order/delivery${query}`
        return axiosClient.patch(url)
    },
    confirmDelivery: (query) => {
        const url = `/admin/order/confirmdelivery${query}`
        return axiosClient.patch(url)
    },
    cancelOrder: (query) => {
        const url = `/admin/order/cancelorder${query}`
        return axiosClient.patch(url)
    }
}

export default orderAPI