import axios from 'axios';

export default {
    login(data) {
        const header = {
            "Content-Type": "application/json",
            "Accept": "*/*",
        }
        return axios.post("https://api.ghp.stoelting-michael.de/api/v1/login", data, header);
    }
}