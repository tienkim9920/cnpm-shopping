import axiosClient from './axiosClient'

const User = {

    Get_All_User: () => {
        const url = '/api/User'
        return axiosClient.get(url)
    },

    Get_User: (id) => {
        const url = `/api/User/${id}`
        return axiosClient.get(url)
    },

    Put_User: (data) => {
        const url = `/api/User`
        return axiosClient.put(url, data)
    },

    Get_Detail_User: (query) => {
        const url = `/api/User/detail/login${query}`
        return axiosClient.get(url)
    },

    Post_User: (data) => {
        const url = '/api/User'
        return axiosClient.post(url, data)
    }

}

export default User