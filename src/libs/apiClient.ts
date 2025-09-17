import axios from "axios";

const AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:4000/api/auth";


// Create a configured axios instance for our API
export const apiClient = axios.create({
  baseURL: AUTH_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const tokenData = localStorage.getItem("synapse-tokens");
    if (tokenData) {
      const { access_token } = JSON.parse(tokenData);
      if (access_token) {
        config.headers[ "Authorization" ] = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
