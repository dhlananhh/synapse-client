import Cookies from "js-cookie";

// Define cookie names as constants to avoid typos
export const COOKIE_NAMES = {
  ACCESS_TOKEN: "synapse_access_token",
  REFRESH_TOKEN: "synapse_refresh_token",
};

// Access Token
export const getAccessToken = (): string | undefined => {
  return Cookies.get(COOKIE_NAMES.ACCESS_TOKEN);
};

export const setAccessToken = (token: string, options?: Cookies.CookieAttributes): void => {
  Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, token, {
    expires: 1 / 96, // 15 minutes
    ...options,
  });
};

export const removeAccessToken = (): void => {
  Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN);
};

// Refresh Token
export const getRefreshToken = (): string | undefined => {
  return Cookies.get(COOKIE_NAMES.REFRESH_TOKEN);
};

export const setRefreshToken = (token: string, options?: Cookies.CookieAttributes): void => {
  Cookies.set(COOKIE_NAMES.REFRESH_TOKEN, token, {
    expires: 1 / 96, // 15 minutes
    ...options,
  });
};

export const removeRefreshToken = (): void => {
  Cookies.remove(COOKIE_NAMES.REFRESH_TOKEN);
};

// Clear all auth-related cookies on logout
export const clearAuthCookies = (): void => {
  removeAccessToken();
  removeRefreshToken();
};
