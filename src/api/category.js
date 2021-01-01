import axios from 'configs/axios'

export default {
    getListCategory: () => axios.get("/admin/listCategory?page=1"),
    deleteCategory: (param) => axios.post("/admin/deleteCategory", param),
    insertCategory: (param) => axios.post("/admin/insertCategory", param),
    updateCategory: (param) => axios.post("/admin/updateCategory", param)
}