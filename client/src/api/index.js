import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL || "http://localhost:5000/api/se",
  withCredentials: true,
});

export default axiosInstance;
