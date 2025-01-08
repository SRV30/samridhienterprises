import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://samridhienterprises-server-xyhd.onrender.com/api/se",
  withCredentials: true,
});

export default axiosInstance;
