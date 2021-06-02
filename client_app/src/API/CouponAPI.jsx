import axiosClient from './axiosClient'

const CouponAPI = {

    checkCoupon: (query) => {
        const url = `/api/admin/coupon/promotion/checking${query}`
        return axiosClient.get(url)
    },

    updateCoupon: (id) => {
        const url = `/api/admin/coupon/promotion/${id}`
        return axiosClient.patch(url)
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