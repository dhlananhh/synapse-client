import axios from "axios";

const AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:4000/api/auth";


// Create a configured axios instance for our API
const apiClient = axios.create({
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


// Registers a new user account.
export const registerUser = (data: any) => {
  return apiClient.post('/register', data);
};


// Log in a user
export const loginUser = (data: any) => {
  return apiClient.post('/login', data);
};


// Uses the refresh token to get a new access token
export const refreshToken = (refreshToken: string) => {
  return apiClient.post('/refresh', { refresh_token: refreshToken });
}
