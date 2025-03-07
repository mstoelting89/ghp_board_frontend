import axios from 'axios';
import globals from './globals'

export default {
    getInstruments() {
        //const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            /*'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',*/
        }

        return axios.get(globals.HOST_NAME + "/api/v1/instrument/list", {
            headers: header
        });
    },
    insertInstrument(data) {
        const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            /*'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',*/
        }

        return axios.post(globals.HOST_NAME + "/api/v1/instrument", data, {
            headers: header
        });
    },
    updateInstrumentEntry(data) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            /*'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',*/
        }

        return axios.put(globals.HOST_NAME + "/api/v1/instrument", data, {
            headers: header
        });
    },
    deleteInstrumentEntry(id) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            /*'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',*/
        }

        return axios.delete(globals.HOST_NAME + "/api/v1/instrument/" + id, {
            headers: header
        });
    },
}