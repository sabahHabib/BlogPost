import axios from "axios";
import { isTokenExpired } from "../helpers/tokenUtils";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiWithFormUrlEncoded = (url: string, data: object) => {
  const formData = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value as string));

  return api.post(url, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export { api, apiWithFormUrlEncoded };
