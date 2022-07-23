import axios from 'axios';

export default {
    getBlogPosts() {
        const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.get("https://api.ghp.stoelting-michael.de/api/v1/blog", {
            headers: header
        });
    },
    insertBlogEntry(data) {
        const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.post("https://api.ghp.stoelting-michael.de/api/v1/blog", data, {
            headers: header
        });
    },
    updateBlogEntry(data) {
        const token = localStorage.getItem("token");

        const header = {
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.put("https://api.ghp.stoelting-michael.de/api/v1/blog/", data, {
            headers: header
        });
    },
    deleteBlogEntry(id) {
        const token = localStorage.getItem('token');
        const header = {
            //'Content-Type' : 'application/json',
            'Content-Type' : 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }

        return axios.delete("https://api.ghp.stoelting-michael.de/api/v1/blog/" + id, {
            headers: header
        });
    }
}