import axiosClient from './axiosClient'

const Detail_OrderAPI = {

    post_detail_order: (data) => {
        const url = `/api/DetailOrder`
        return axiosClient.post(url, data)
    },

    get_detail_order: (id) => {
        const url = `/api/DetailOrder/${id}`
        return axiosClient.get(url)
    }

}

export default Detail_OrderAPI