import axios from 'configs/axios'

export default {
    create: (data) => axios.post("/merchant/submitLivestream", data),
    getCategory: () => axios.get("/user/category"),
    getLivestreamDetail: (id) => axios.get("/merchant/getVideosDetail?videoId=" + id),
    getDashboard: () => axios.get("/admin/getDashboard"),
    getLivestream: (param) => axios.post("/admin/listVideos",param),
    deleteLivestream: (data) => axios.post("/admin/deleteLivestream", data),
    submitLivestreamByAdmin: (data) => axios.post("/admin/submitLivestreamByAdmin", data)
    
}

