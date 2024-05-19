// axiosConfig.js
import axios from "axios";
import { getAccessToken } from "./localStorageService";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTRhYzAyMjFiNGQxMWUwMDZmYTY3NTg3YTFmYjU4YyIsInN1YiI6IjYzOGNhYmM0MTI4M2U5MDA5NzY3MTA3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x0LhdsF7xDIRU7dWFb9S-vPsoqkzNvdM_u-jpzyNUJU";

const axiosRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosRequest;