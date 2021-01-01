import axios from './index'

export default (token) => {
    if (token) {
        axios.defaults.headers.common["x-access-token"] = token
    }
    else {
        delete axios.defaults.headers.common.authorization
    }
}