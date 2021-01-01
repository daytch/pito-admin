import axios from 'configs/axios'

export default {
    getListTicket: () => axios.get("/admin/listTicket?page=1"),
    getListMessage:(param) => axios.get("/admin/listMessage?ticket_id="+param+'&page=1')
}