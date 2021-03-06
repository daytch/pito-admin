import axios from 'configs/axios'

export default {
    getListTicket: () => axios.get("/admin/listTicket?page=1"),
    getListMessage: (param) => axios.get("/admin/listMessage?ticket_id=" + param + '&page=1'),
    ReplyTicket: (param) => axios.post("/admin/insertMessageTicket", param),

    delete: (id) => axios.post('/merchant/closeTicket', id)
}