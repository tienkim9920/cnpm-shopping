import axiosClient from './axiosClient'

const OrderAPI = {

    // post_paypal: (data) => {
    //     const url = `/api/Payment/paypal`
    //     return axiosClient.post(url, data)
    // },

    post_order: (data) => {
        const url = `/api/Payment/order`
        return axiosClient.post(url, data)
    }

}

export default OrderAPI