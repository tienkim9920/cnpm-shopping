import axiosClient from "./axiosClient"

const userAPI = {

    getAPI: (query) => {
        const url = `/admin/user${query}`
        return axiosClient.get(url)
    },
    details: (id) => {
        const url = `/admin/user/${id}`
        return axiosClient.get(url)
    },
    login: (data) => {
        const url = `/admin/user/login`
        return axiosClient.post(url, data)
    },
    loginNV: (data) => {
        const url = `/admin/user/loginnv`
        return axiosClient.post(url, data)
    },
    create: (query) => {
        const url = `/admin/user/create${query}`
        return axiosClient.post(url)
    },
    update: (query) => {
        const url = `/admin/user/update${query}`
        return axiosClient.patch(url)
    },
    delete: (query) => {
        const url = `/admin/user/delete${query}`
        return axiosClient.delete(url)
    }

}

export default userAPI