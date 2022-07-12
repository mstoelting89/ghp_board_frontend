import axios from 'axios';

export default {
    login(data) {
        const header = {
            "Content-Type": "application/json",
            "Accept": "*/*",
        }

        return axios.post(process.env.VUE_APP_BACKEND_URL +"/api/v1/login", data, header);
    },
    setNewPassword(data) {
        const header = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        return axios.post(process.env.VUE_APP_BACKEND_URL + "/api/v1/login/password/reset", data, {
            headers: header
        });
    }
}