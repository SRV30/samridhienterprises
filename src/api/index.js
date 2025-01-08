import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/se",
  withCredentials: true,
});

export default axiosInstance;
