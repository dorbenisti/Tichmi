import axios from 'axios';

export default class ServerDataCache {
    constructor(url) {
        this.url = url;
    }

    GetOrFetchData(callback, errCallback) {
        if (this.data) {
            callback(this.data);
        }

        axios.get(this.url).then(res => {
            this.data = res.data;

            callback(res.data);
        }, err => errCallback(err));
    }
}