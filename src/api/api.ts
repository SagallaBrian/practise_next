import { QueryClient } from "@tanstack/react-query";
import axios, { CreateAxiosDefaults } from "axios";

const DEFAULT_API_CONFIG: CreateAxiosDefaults = {
  baseURL: process.env.API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(DEFAULT_API_CONFIG);

axiosInstance.interceptors.request.use(
  (config) => {
    const auth_token = localStorage.getItem("token") || "";

    if (auth_token) {
      config.headers["Authorization"] = `Bearer ${auth_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (
      (err.response && err.response.status === 401) ||
      err.response.status === 403
    ) {
      console.log("Perform a redirect here");
    }
    return Promise.reject(err);
  }
);

axiosInstance.defaults.data = {};

const myQueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export { axiosInstance, myQueryClient };
