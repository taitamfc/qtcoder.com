import axiosClient from './axiosClient';


class DeviceTypeModel {
      constructor() {
        this.api_url = '/api/device_types';
    }

    async getDeviceType() {
        const res = await axiosClient.get(this.api_url);
        return res.data;
    }
}

export default new DeviceTypeModel;