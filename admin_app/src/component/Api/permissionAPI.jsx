import axiosClient from "./axiosClient"

const permissionAPI = {

    getAPI: () => {
        const url = '/admin/permission/all'
        return axiosClient.get(url)
    },
    getAPIPage: (query) => {
        const url = `/admin/permission${query}`
        return axiosClient.get(url)
    },
    create: (query) => {
        const url = `/admin/permission/create${query}`
        return axiosClient.post(url)
    },
    delete: (query) => {
        const url = `/admin/permission/delete${query}`
        return axiosClient.delete(url)
    }

}

export default permissionAPI