import axiosClient from "./axiosClient";

class BorrowModel {
    constructor() {
        this.api_url = '/api/borrows';
    }

    async getAllBorrows(data = {}) {
        const res = await axiosClient.get(this.api_url,{ params: data });
        return res.data;
    }
    async getUserBorrows(data = {}) {
        const res = await axiosClient.get(this.api_url,{ params: data });
        return res.data;
    }
    async find(id) {
        const res = await axiosClient.get(`${this.api_url}/${id}`);
        return res.data;
    }
    

    async createBorrow(data) {
        const res = await axiosClient.post(this.api_url, data);
        return res.data;
    } 
    async checkBorrow(data) {
        const res = await axiosClient.post(this.api_url + '/checkBorrow', data);
        return res.data;
    } 

    async destroy(id) {
        const res = await axiosClient.delete(`${this.api_url}/${id}`);
        return res.data;
    }
    
    async update(id,data) {
        const res = await axiosClient.put(`${this.api_url}/${id}`, data);
        return res.data;
    } 
}

export default new BorrowModel;
