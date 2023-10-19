import axiosClient from './axiosClient';
class UserModel {
    constructor () {
        this.api_url = '/api/users/';
    }
    async all() {
        const res = await axiosClient.get(this.api_url);
        return res.data.data;
      }
    
      async find(id) {
        const data = await axiosClient.get(this.api_url + id);
        return data.data;
      }
    
      async store(data) {
        const res = await axiosClient.post(this.api_url , data);
        return res;
      }
    
      async update(id, data) {
        const res = await axiosClient.put(this.api_url + id, data);
        return res;
      }
    
      async delete(id) {
        const data = await axiosClient.delete(this.api_url + id);
        return data;
      }
}
export default new UserModel();