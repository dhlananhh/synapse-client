"use client";


import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/modules/services/auth-service";
import {
  AuthUser,
  LoginPayload,
  RegisterPayload
} from "@/types/services/auth";
import { toast } from "sonner";


interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [ user, setUser ] = useState<AuthUser | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // We use getProfile (which calls /refresh) to verify the session
        // If it succeeds, the user is logged in, and we get their data.
        // If it fails (HttpOnly refresh token is invalid/expired), it throws an error.
        const { user } = await authService.getProfile();
        setUser(user);
      } catch (error) {
        setUser(null);
        console.log("No active session found.");
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const login = async (payload: LoginPayload) => {
    try {
      const { user } = await authService.login(payload);
      setUser(user);
      toast.success(`Welcome back, ${user.email}!`);
      router.push("/feed");
    } catch (error: any) {
      setUser(null);
      throw error;
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      await authService.register(payload);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push("/");
      toast.info("You have been logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider
      value={ value }
    >
      { !isLoading && children }
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
