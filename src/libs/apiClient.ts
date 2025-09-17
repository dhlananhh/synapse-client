import axios from "axios";
import { getRefreshToken, setAccessToken } from "./cookies";
import { authService } from "@/modules/services/auth-service";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const currentRefreshToken = getRefreshToken();
      if (!currentRefreshToken) {
        console.error("No refresh token available. User needs to log in again.");
        return Promise.reject(error);
      }

      try {
        console.log("Access token expired. Attempting to refresh...");
        const refreshResponse = await authService.refresh(currentRefreshToken);

        if (refreshResponse?.access_token) {
          console.log("Token refreshed successfully.");


          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
