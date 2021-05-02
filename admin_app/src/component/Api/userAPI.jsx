import axiosClient from "./axiosClient"

const userAPI = {

    getAPI: (query) => {
        const url = `/admin/user${query}`
        return axiosClient.get(url)
    },
    create: (query) => {
        const url = `/admin/user/create${query}`
        return axiosClient.post(url)
    },
    delete: (query) => {
        const url = `/admin/user/delete${query}`
        return axiosClient.delete(url)
    }

}

export default userAPI