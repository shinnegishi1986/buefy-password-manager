const APIURL = "http://localhost:3000";
const axios = require("axios");
export const requestsMixin = {
  methods: {
    getPasswords() {
      return axios.get(`${APIURL}/passwords`);
    },
    addPassword(data) {
      return axios.post(`${APIURL}/passwords`, data);
    },
    editPassword(data) {
      return axios.put(`${APIURL}/passwords/${data.id}`, data);
    },
    deletePassword(id) {
      return axios.delete(`${APIURL}/passwords/${id}`);
    }
  }
};