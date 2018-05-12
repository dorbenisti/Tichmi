import axios from 'axios';

export default class ServerDataCache {
    constructor(url) {
        this.url = url;
    }

    GetData() {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return axios.get(this.url).then(res => res.data);
    }
}