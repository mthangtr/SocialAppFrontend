import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080", // Replace with your API URL
  withCredentials: true, // This ensures cookies are included with requests
});

export default axiosInstance;
