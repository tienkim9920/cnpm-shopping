import axiosClient from './axiosClient'

const HistoryAPI = {

    get_history: (query) => {
        const url = `/api/History${query}`
        return axiosClient.get(url)
    },

    get_history_view: (id) => {
        const url = `/api/History/view/${id}`
        return axiosClient.get(url)
    },

    get_detail_history: (id) => {
        const url = `/api/History/${id}`
        return axiosClient.get(url)
    }

}

export default HistoryAPI