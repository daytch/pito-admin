import axios from 'configs/axios';

export default {
    //  create: (data) => axios.post("/merchant/submitLivestream", data),
    create: (data) => axios.post("/admin/submitLivestreamByAdmin", data),
    getCategory: () => axios.get("/user/category"),
    getLivestreamDetail: (id) => axios.get("/admin/getVideosDetail?videoId=" + id),
    getDashboard: () => axios.get("/admin/getDashboard"),
    // getLivestream: (param) => axios.post("/admin/listVideos", param),
    getLivestreamByKeyword: (keyword, page) => axios.get("/admin/getVideosByKeyword?keyword=" + keyword + "&page=" + page),
    getLivestream: (param) => axios.post("/admin/listVideos", param),
    deleteLivestream: (data) => axios.post("/admin/deleteLivestream", data),
    submitLivestreamByAdmin: (data) => axios.post("/admin/submitLivestreamByAdmin", data),
    getDashboardPaging: (tipe, page) => axios.get("/admin/getDashboardPaging?type=" + tipe + "&page=" + page),
}

