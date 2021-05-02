import axiosClient from "./axiosClient"

const categoryAPI = {

    getAPI: () => {
        const url = '/category'
        return axiosClient.get(url)
    },
    getAPIPage: (query) => {
        const url = `/admin/category${query}`
        return axiosClient.get(url)
    },
    details: (id, query) => {
        const url = `/admin/category/${id}${query}`
        return axiosClient.get(url)
    },
    create: (query) => {
        const url = `/admin/category/create${query}`
        return axiosClient.post(url)
    },
    delete: (query) => {
        const url = `/admin/category/delete${query}`
        return axiosClient.delete(url)
    }

}

export default categoryAPI