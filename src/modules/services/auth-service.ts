import apiClient from "@/libs/apiClient";
import {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  VerifyEmailPayload,
  ResendVerificationPayload,
  RequestPasswordResetPayload,
  VerifyResetCodePayload,
  VerifyResetCodeResponse,
  SetNewPasswordPayload
} from "@/types/auth";


const AUTH_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:4000/api/auth";

const authApiClient = apiClient;


export const authService = {
  register: (payload: RegisterPayload): Promise<RegisterResponse> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/register`, payload).then(res => res.data);
  },

  login: (payload: LoginPayload): Promise<LoginResponse> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/login`, payload).then(res => res.data);
  },

  logout: (refreshToken: string): Promise<{ message: string }> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/logout`, { refresh_token: refreshToken }).then(res => res.data);
  },

  refresh: (refreshToken: string): Promise<LoginResponse> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/refresh`, { refresh_token: refreshToken }).then(res => res.data);
  },

  verifyEmail: (payload: VerifyEmailPayload): Promise<{ message: string }> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/verify-email`, payload).then(res => res.data);
  },

  resendVerification: (payload: ResendVerificationPayload): Promise<{ message: string }> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/resend-verification`, payload).then(res => res.data);
  },

  requestPasswordReset: (payload: RequestPasswordResetPayload): Promise<{ message: string }> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/request-password-reset`, payload).then(res => res.data);
  },

  verifyPasswordResetCode: (payload: VerifyResetCodePayload): Promise<VerifyResetCodeResponse> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/verify-reset-code`, payload).then(res => res.data);
  },

  setNewPassword: (payload: SetNewPasswordPayload): Promise<{ message: string }> => {
    return authApiClient.post(`${AUTH_SERVICE_BASE_URL}/set-new-password`, payload).then(res => res.data);
  },

};
