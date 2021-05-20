import axiosClient from './axiosClient'

const CouponAPI = {

    checkCoupon: (query) => {
        const url = `/api/admin/coupon/promotion/checking${query}`
        return axiosClient.get(url)
    },

    postCoupon: (data) => {
        const url = `/api/admin/coupon/promotion/checking`
        return axiosClient.post(url, data)
    },

    getCoupons: (query) => {
        const url = `/api/admin/coupon${query}`
        return axiosClient.get(url)
    },

    getCoupon: (id) => {
        const url = `/api/admin/coupon/${id}`
        return axiosClient.get(url)
    },

}

export default CouponAPI