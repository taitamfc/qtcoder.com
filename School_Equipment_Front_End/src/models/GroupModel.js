import axiosClient from "./axiosClient";

class GroupModel {
    constructor () {
        this.api_url = '/api/groups/';
    }
    async all() {
        const res = await axiosClient.get(this.api_url);
        return res.data;
      }
    
      async find(id) {
        const data = await axiosClient.get(this.api_url + id);
        return data.data;
      }
}
export default new GroupModel();