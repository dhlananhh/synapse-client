import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string): void => {
  // Access token expires in 5 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires });
};

export const removeAccessToken = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};
