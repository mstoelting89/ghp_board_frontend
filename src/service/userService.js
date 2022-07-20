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
    },
    requestNewPassword(data) {
        const header = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        return axios.post(process.env.VUE_APP_BACKEND_URL + "/api/v1/login/password/request", data, {
            headers: header
        });
    },
    getAllUser() {
        const token = localStorage.getItem("token");
        const header = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        const data = {
            "email": localStorage.getItem('userEmail'),
            "userToken": token
        }
        return axios.post(process.env.VUE_APP_BACKEND_URL + "/api/v1/user/list", data, {
            headers: header
        });
    },
    getAllUserRoles() {
        const token = localStorage.getItem("token");
        const header = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.get(process.env.VUE_APP_BACKEND_URL + "/api/v1/user/user_roles", {
            headers: header
        });
    },
    changeUserLevel(data) {
        const token = localStorage.getItem("token");
        const header = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.put(process.env.VUE_APP_BACKEND_URL + "/api/v1/user/role", data, {
            headers: header
        });
    },
    deleteUser(id) {
        const token = localStorage.getItem("token");
        const header = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.delete(process.env.VUE_APP_BACKEND_URL + "/api/v1/user/" + id, {
            headers: header
        });
    }
}