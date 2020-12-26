import axios from 'configs/axios'

export default {
    create: (data) => axios.post("/merchant/submitLivestream", data),
    getCategory: () => axios.get("/admin/userList"),
    getLivestreamDetail: (id) => axios.get("/merchant/getVideosDetail?videoId=" + id),
}

