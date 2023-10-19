import axiosClient from "./axiosClient";

class DeviceModel {
    constructor() {
        this.api_url = '/api/devices';
        this.root_url = '/api';
    }

    async getAllDevices(data = {}) {
        const res = await axiosClient.get(this.api_url,{ params: data });
        return res.data;
    }
    
    async getDeviceCalendar(id) {
        const res = await axiosClient.get(this.root_url + '/device-calendar/' + id);
        return res.data;
    }

}

export default new DeviceModel;