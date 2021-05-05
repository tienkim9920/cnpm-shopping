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
    details: (id) => {
        const url = `/admin/permission/${id}`
        return axiosClient.get(url)
    },
    create: (query) => {
        const url = `/admin/permission/create${query}`
        return axiosClient.post(url)
    },
    update: (query) => {
        const url = `/admin/permission/update${query}`
        return axiosClient.put(url)
    },
    delete: (query) => {
        const url = `/admin/permission/delete${query}`
        return axiosClient.delete(url)
    }

}

export default permissionAPI