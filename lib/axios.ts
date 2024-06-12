import { BASE_URL } from "@/constants/api";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie("refreshToken");
        const { data } = await instance.get("/auth/refresh-token", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        const newToken = data.accessToken;
        setCookie("accessToken", newToken, { maxAge: 60 * 60 * 24 });
        instance.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // 로그아웃 로직
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
