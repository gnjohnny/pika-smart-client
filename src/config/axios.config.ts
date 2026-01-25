import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL!,
  timeout: 150000,
  withCredentials: true,
});
