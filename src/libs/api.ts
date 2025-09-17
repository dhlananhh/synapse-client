import { apiClient } from "@/libs/apiClient"


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
