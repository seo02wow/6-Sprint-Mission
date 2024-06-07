import { BASE_URL } from "@/constants/api";
import axios, { Axios } from "axios";

const instance: Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default instance;
