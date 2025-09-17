"use client";


import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback
} from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/libs/apiClient";
import { refreshToken as refreshApi } from "@/libs/api";
import { toast } from "sonner";


interface AuthTokens {
  access_token: string;
  refresh_token: string;
}


interface UserFromJwt {
  sub: string;
  email: string;
  role: string;
}


interface AuthContextType {
  currentUser: UserFromJwt | null;
  isLoading: boolean;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Helper function to decode the JWT payload
const parseJwt = (token: string): UserFromJwt | null => {
  try {
    return JSON.parse(atob(token.split(".")[ 1 ]));
  } catch (e) {
    return null;
  }
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [ currentUser, setCurrentUser ] = useState<UserFromJwt | null>(null);
  const [ tokens, setTokens ] = useState<AuthTokens | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedTokens = localStorage.getItem("synapse-tokens");
    if (storedTokens) {
      const parsedTokens = JSON.parse(storedTokens) as AuthTokens;
      const user = parseJwt(parsedTokens.access_token);

      setTokens(parsedTokens);
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((newTokens: AuthTokens) => {
    localStorage.setItem("synapse-tokens", JSON.stringify(newTokens));
    setTokens(newTokens);
    setCurrentUser(parseJwt(newTokens.access_token));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("synapse-tokens");
    setTokens(null);
    setCurrentUser(null);
    router.push("/login");
    toast.info("You have been logged out.");
  }, [ router ]);

  useEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const storedTokens = localStorage.getItem("synapse-tokens");
          const refreshToken = storedTokens ? JSON.parse(storedTokens).refresh_token : null;

          if (refreshToken) {
            try {
              const { data } = await refreshApi(refreshToken);
              login(data);
              originalRequest.headers[ "Authorization" ] = `Bearer ${data.access_token}`;
              return apiClient(originalRequest);
            } catch (refreshError) {
              logout();
              return Promise.reject(refreshError);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [
    login,
    logout
  ]);

  const value = {
    currentUser,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
