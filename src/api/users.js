import axios from 'configs/axios'

export default {
    // eslint-disable-next-line
    login: (credentials) => axios.post("/user/login", credentials),
    merchantLogin: (credentials) => axios.post("/merchant/login", credentials),
    getUserList: () => axios.get("/admin/userList"),
    forgotPassword: (email) => axios.post("/user/forgotPassword", email),
    getProfile: () => axios.get("/merchant/getProfile"),
    getUserDetail: (id) => axios.get("/admin/getProfileUser?userId=" + id),
    getMerchants: () => axios.get('/admin/merchantList'),
    getMerchantDetail: (id) => axios.get('/admin/getMerchantProfileByAdmin?userId=' + id),
    submitMerchantProfile: (data) => axios.post("/admin/submitProfileMerchant", data),
    submitUserProfile: (data) => axios.post("/admin/submitProfileUser", data),
    disableUser: (data) => axios.post("/admin/disableUser", data),
    enableUser: (data) => axios.post("/admin/enableUser", data)
}