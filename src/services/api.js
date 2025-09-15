import axios from "axios";
import { toast } from "react-toastify";

import { isTokenExpired } from "../utils/authUtils";
import { baseURL } from "./baseURL";
import { endpoints } from "./urls";

const api = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

// Function to refresh access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await axios.post(baseURL + endpoints.refresh, {
      refreshToken,
    });
    const newAccessToken = response.data["access_token"];
    const newRefreshToken = response.data["refresh_token"];

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    return newAccessToken;
  } catch (error) {
    toast.error("Refresh token expired. Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
    console.error(error);
    return null;
  }
};

// Attach accessToken to requests, refresh if needed
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");

    if (token && isTokenExpired(token)) {
      token = await refreshAccessToken();
    }

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle failed requests due to expired token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired, attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loop

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry failed request
      }
    }

    return Promise.reject(error);
  }
);

export default api;
