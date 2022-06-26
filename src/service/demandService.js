import axios from 'axios';

export default {
    getDemand() {
        const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.get(process.env.VUE_APP_BACKEND_URL + "/api/v1/demand", {
            headers: header
        });
    },
    getDemandDetail(id) {
        const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.get(process.env.VUE_APP_BACKEND_URL + "/api/v1/demand/" + id, {
            headers: header
        });
    }
}