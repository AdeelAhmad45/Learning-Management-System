import axios from "axios";

const BASE_URL = 'https://learning-management-system-2-xhu6.onrender.com';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;