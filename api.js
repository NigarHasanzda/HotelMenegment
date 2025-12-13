import axios from "axios";

const api = axios.create({
  baseURL: "http://hospitalmanage.runasp.net/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
