import axios from 'axios';

export default {
    getNews() {
        const token = localStorage.getItem('token');

        const header = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.get("https://api.ghp.stoelting-michael.de/api/v1/news", {
            headers: header
        });
    },
    getNewsDetail(id) {
        const token = localStorage.getItem('token');

        const header = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.get("https://api.ghp.stoelting-michael.de/api/v1/news/" + id, {
            headers: header
        });
    },
    insertNewsEntry(data) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.post("https://api.ghp.stoelting-michael.de/api/v1/news", data, {
            headers: header
        });

    },
    updateNewsEntry(data) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.put("https://api.ghp.stoelting-michael.de/api/v1/news", data, {
            headers: header
        });
    },
    deleteNewsEntry(id) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.delete("https://api.ghp.stoelting-michael.de/api/v1/news/" + id, {
            headers: header
        });
    },
    getAttachment(id) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.get("https://api.ghp.stoelting-michael.de/api/v1/attachment/" + id, {
            headers: header
        });
    }
}