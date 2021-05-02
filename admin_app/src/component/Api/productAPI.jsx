import axiosClient from "./axiosClient"

const productAPI = {

    getAPI: (query) => {
        const url = `/admin/product${query}`
        return axiosClient.get(url)
    },
    delete: (query) => {
        const url = `/admin/product/delete${query}`
        return axiosClient.delete(url)
    }

}

export default productAPI