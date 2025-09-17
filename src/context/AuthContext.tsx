"use client";


import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/modules/services/auth-service";
import {
  getRefreshToken,
  clearAuthCookies
} from "@/libs/cookies";
import { toast } from "sonner";


interface AuthUser {
  id: string;
  email: string;
  role: "USER" | "SYSTEM_ADMIN";
}


interface AuthContextType {
  currentUser: AuthUser | null;
  isLoading: boolean;
  revalidateUser: () => Promise<void>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [ currentUser, setCurrentUser ] = useState<AuthUser | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const router = useRouter();

  const checkUserSession = useCallback(async () => {
    const currentRefreshToken = getRefreshToken();

    if (!currentRefreshToken) {
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.refresh(currentRefreshToken);
      if (response && response.user) {
        setCurrentUser(response.user);
      } else {
        throw new Error("Invalid session.");
      }
    } catch (error) {
      console.error("Session check failed, logging out.", error);
      clearAuthCookies();
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserSession();
  }, [ checkUserSession ]);

  const logout = useCallback(async () => {
    const currentRefreshToken = getRefreshToken();
    if (currentRefreshToken) {
      try {
        await authService.logout(currentRefreshToken);
      } catch (error) {
        console.error("Logout API call failed, but clearing client-side session anyway.", error);
      }
    }

    clearAuthCookies();
    setCurrentUser(null);
    router.push("/");
    toast.info("You have been logged out.");
  }, [ router ]);

  const revalidateUser = useCallback(async () => {
    setIsLoading(true);
    await checkUserSession();
  }, [ checkUserSession ]);

  const value: AuthContextType = {
    currentUser,
    isLoading,
    logout,
    revalidateUser,
  };

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
