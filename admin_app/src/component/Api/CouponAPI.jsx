import axiosClient from './axiosClient'

const CouponAPI = {

    getCoupons: (query) => {
        const url = `/admin/coupon${query}`
        return axiosClient.get(url)
    },

    getCoupon: (id) => {
        const url = `/admin/coupon/${id}`
        return axiosClient.get(url)
    },

    updateCoupon: (id, data) => {
        const url = `/admin/coupon/${id}`
        return axiosClient.patch(url, data)
    },

    postCoupons: (data) => {
        const url = `/admin/coupon`
        return axiosClient.post(url, data)
    },

    deleteCoupons: (id) => {
        const url = `/admin/coupon/${id}`
        return axiosClient.delete(url)
    },

    

}

export default CouponAPI