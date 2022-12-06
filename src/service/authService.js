import axios from 'axios';
import globals from './globals'

export default {
    login(data) {
        const header = {
            "Content-Type": "application/json",
            "Accept": "*/*",
        }
        return axios.post(globals.HOST_NAME + "/api/v1/login", data, header);
    }
}