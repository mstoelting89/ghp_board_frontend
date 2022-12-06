import axios from 'axios';
import globals from './globals'

export default {
    sendContactMail(data) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.post(globals.HOST_NAME + "/api/v1/contact", data, {
            headers: header
        });
    }
}