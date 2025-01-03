import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
