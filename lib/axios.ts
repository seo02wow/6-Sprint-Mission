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
      console.log("401 에러 토근 만료");
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie("refreshToken");
        console.log("refreshToken 요청");
        const res = await instance.post("/auth/refresh-token", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        console.log(" refreshToken 요청 응답 : " + res);
        const newToken = res.data.accessToken;
        console.log("401 newToken : " + newToken);
        setCookie("accessToken", newToken, { maxAge: 60 * 60 * 24 });
        instance.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
