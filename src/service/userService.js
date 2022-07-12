import axios from 'axios';

export default {
    insertNewUser(data) {
        const token = localStorage.getItem("token");

        const header = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        return axios.post(process.env.VUE_APP_BACKEND_URL + "/api/v1/user", data, {
            headers: header
        });
    }
}