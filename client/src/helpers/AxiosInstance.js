import axios from "axios";

const BASE_URL = 'https://learning-management-system-1-pcf6.onrender.com/api/v1';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;