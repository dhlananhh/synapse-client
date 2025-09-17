// Payloads for API requests
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface ResendVerificationPayload {
  email: string;
}

export interface RequestPasswordResetPayload {
  email: string;
}

export interface VerifyResetCodePayload {
  email: string;
  code: string;
}

export interface SetNewPasswordPayload {
  reset_token: string;
  new_password: string;
}

// Responses from API
interface AuthUser {
  id: string;
  email: string;
  role: "USER" | "SYSTEM_ADMIN";
}

export interface RegisterResponse {
  account: {
    id: string;
    email: string;
    isEmailVerified: boolean;
    role: "USER" | "SYSTEM_ADMIN";
    status: "ACTIVE" | "PENDING";
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginResponse {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token: string;
  user: AuthUser;
}

export interface VerifyResetCodeResponse {
  reset_token: string;
  expires_in: number;
}
