import axios from "axios";
import { IP } from "./IP";

const axiosClient = axios.create({
  baseURL: IP
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers['token'] = token
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
