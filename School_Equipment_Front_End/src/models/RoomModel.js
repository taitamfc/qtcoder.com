import axiosClient from './axiosClient';


class RoomModel {
      constructor() {
        this.api_url = '/api/rooms';
    }

    async getRoom() {
        const res = await axiosClient.get(this.api_url);
        return res.data;
    }
}

export default new RoomModel;