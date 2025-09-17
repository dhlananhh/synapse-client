import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError
} from "axios";
import Cookies from "js-cookie";


// Constants for cookie names
const ACCESS_TOKEN_KEY = "synapse_access_token";
const REFRESH_TOKEN_KEY = "synapse_refresh_token";

// --- Token Management Utilities ---
export const getAccessToken = (): string | null => {
  return Cookies.get(ACCESS_TOKEN_KEY) || null;
};

export const getRefreshToken = (): string | null => {
  return Cookies.get(REFRESH_TOKEN_KEY) || null;
};

export const setAuthTokens = (accessToken: string, refreshToken: string): void => {
  // Set access token to expire in 5 minutes (300 seconds) to match the backend
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 5 / (24 * 60) });
  // Set refresh token to expire in 5 minutes (300 seconds)
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 5 / (24 * 60) });
};

export const clearAuthTokens = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

// --- HttpClient Class ---
class HttpClient {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{ resolve: (value: unknown) => void; reject: (reason?: any) => void }> = [];

  constructor (baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // Request Interceptor: Add Authorization header before sending request
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Handle token refresh logic
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // If error is 401, token is invalid/expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If already refreshing, add the request to a queue to be re-tried later
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            clearAuthTokens();
            window.location.href = "/login";
            return Promise.reject(error);
          }

          try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
              refresh_token: refreshToken,
            });

            const { access_token, refresh_token } = data;
            setAuthTokens(access_token, refresh_token);

            // Update the Authorization header of the original request
            this.axiosInstance.defaults.headers.common[ "Authorization" ] = `Bearer ${access_token}`;
            if (originalRequest.headers) {
              originalRequest.headers[ "Authorization" ] = `Bearer ${access_token}`;
            }

            // Retry all requests in the queue
            this.processQueue(null, access_token);

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            clearAuthTokens();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  public get<T = any>(url: string, config = {}) {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: object, config = {}) {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: object, config = {}) {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public patch<T = any>(url: string, data?: object, config = {}) {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  public delete<T = any>(url: string, config = {}) {
    return this.axiosInstance.delete<T>(url, config);
  }
}

const apiHttpClient = new HttpClient(process.env.NEXT_PUBLIC_API_BASE_URL!);

export default apiHttpClient;
