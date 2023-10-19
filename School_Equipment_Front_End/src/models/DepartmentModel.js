import axiosClient from "./axiosClient";

class DepartmentModel {
    constructor () {
        this.api_url = '/api/departments/';
    }
    async all() {
        const res = await axiosClient.get(this.api_url);
        return res.data;
      }
    
}
export default new DepartmentModel();