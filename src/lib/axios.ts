import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // We'll get the token from the auth store later.
    // const token = ...

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }

    if (error.response?.status === 403) {
      console.log("Forbidden");
    }

    if (error.response?.status >= 500) {
      console.log("Server Error");
    }

    return Promise.reject(error);
  }
);

export default api;