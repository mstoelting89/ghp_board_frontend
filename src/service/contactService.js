import axios from 'axios';

export default {
    sendContactMail(data) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.post(process.env.VUE_APP_BACKEND_URL + "/api/v1/contact", data, {
            headers: header
        });
    }
}