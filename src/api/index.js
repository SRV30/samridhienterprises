import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://samridhienterprises-server.vercel.app/api/se",
  withCredentials: true,
});

export default axiosInstance;
