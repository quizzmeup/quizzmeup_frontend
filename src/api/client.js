import axios from "axios";
import Cookies from "js-cookie";
import { QUIZZMEUP_FRONTEND_AUTH_TOKEN_COOKIE_NAME } from "../config";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get(QUIZZMEUP_FRONTEND_AUTH_TOKEN_COOKIE_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
