import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
const instance = axios.create({
    baseURL: 'https://api.pito.com.sg/'//'https://pito-api.herokuapp.com/'
})
const UNAUTHORIZED = 401;

instance.interceptors.request.use(function (config) {
    debugger;
    let token = localStorage.getItem('PITO:token');
    config.headers.common["x-access-token"] = token

    return config;
})
instance.interceptors.response.use((response) => response.data, error => {
    const { status } = error.response;
    debugger;
    if (status === UNAUTHORIZED) {
        if (localStorage.getItem('PITO:token')) {
            localStorage.removeItem('PITO:token')
            window.location.href = "/"
        }
    } else {
        MySwal.fire('Error!', error?.response?.data?.message, 'error');
    }
})

export {
    default as setAuthorizationHeader
} from './setAuthorizationHeader'
export default instance;