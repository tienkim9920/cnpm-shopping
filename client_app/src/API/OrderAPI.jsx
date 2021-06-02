import axiosClient from './axiosClient'

const OrderAPI = {

    post_order: (data) => {
        const url = `/api/Payment/order`
        return axiosClient.post(url, data)
    },

    get_order: (id) => {
        const url = `/api/Payment/order/${id}`
        return axiosClient.get(url)
    },

    get_detail: (id) => {
        const url = `/api/Payment/order/detail/${id}`
        return axiosClient.get(url)
    },

    post_email: (data) => {
        const url = `/api/Payment/email`
        return axiosClient.post(url, data)
    },

    cancel_order: (query) => {
        const url = `/api/admin/Order/cancelorder${query}`
        return axiosClient.patch(url)
    }

}

export default OrderAPI