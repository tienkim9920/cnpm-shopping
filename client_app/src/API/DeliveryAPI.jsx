import axiosClient from './axiosClient'

const DeliveryAPI = {

    post_delivery: (data) => {
        const url = `/api/Delivery`
        return axiosClient.post(url, data)
    },

    get_delivery: (id) => {
        const url = `/api/Delivery/${id}`
        return axiosClient.post(url)
    }

}

export default DeliveryAPI