import axios from "axios";
import { getToken } from "../services/authServices";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL, // Set your base URL here
  headers: {
    common: {
      "Content-Type": "application/json",
      // Add any other common headers here
    },
  },
});

// Add a request interceptor to set the Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, token has expired or is invalid
      // Perform the logout action here
      localStorage.removeItem("Auth"); // Clear the token and user-related data
      window.location.replace("/login"); // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default instance;
