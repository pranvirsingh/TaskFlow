import axios from "axios";
import { startLoading, stopLoading } from "../utils/loadingBar";

export const apiClient = axios.create({
    baseURL: "https://localhost:7172/api",
    // headers: { "Content-Type": "application/json" }
});

apiClient.interceptors.request.use(config => {
  startLoading();
  const auth = JSON.parse(localStorage.getItem("auth"))
  if(auth?.token){
    config.headers.Authorization = `Bearer ${auth.token}`
  }  
  return config;
});

apiClient.interceptors.response.use(
  response => {
    stopLoading();
    return response;
  },
  error => {
    stopLoading();
    return Promise.reject(error);
  }
);