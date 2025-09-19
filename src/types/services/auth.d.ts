// =================================
// Payloads for API Requests
// =================================


export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  birthday: Date;
  gender: "MALE" | "FEMALE";
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

export interface ChangePasswordPayload {
  email: string;
  current_password: string;
  new_password: string;
}


// =================================
// Responses from API
// =================================

export interface AuthUser {
  id: string;
  email: string;
  role: "USER" | "SYSTEM_ADMIN";
}

export interface Account {
  id: string;
  email: string;
  isEmailVerified: boolean;
  role: "USER" | "SYSTEM_ADMIN";
  status: "ACTIVE" | "PENDING" | "SUSPENDED" | "BANNED";
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  account: Account;
}

export interface LoginResponse {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token: string;
  user: AuthUser;
}

export interface RefreshTokenResponse extends Omit<LoginResponse, 'refresh_token'> {
  refresh_token: string;
}

export interface VerifyResetCodeResponse {
  reset_token: string;
  expires_in: number;
}

export interface GenericMessageResponse {
  message: string;
}
