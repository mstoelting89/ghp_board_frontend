import axios from 'axios';

export default {
    getInstruments() {
        //const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            /*'Authorization': `Bearer ${token}`,*/
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.get("https://api.ghp.stoelting-michael.de/api/v1/instrument", {
            headers: header
        });
    },
    insertInstrument(data) {
        const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.post("https://api.ghp.stoelting-michael.de/api/v1/instrument", data, {
            headers: header
        });
    },
    updateInstrumentEntry(data) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.put("https://api.ghp.stoelting-michael.de/api/v1/instrument", data, {
            headers: header
        });
    },
    deleteInstrumentEntry(id) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.delete("https://api.ghp.stoelting-michael.de/api/v1/instrument/" + id, {
            headers: header
        });
    },
}