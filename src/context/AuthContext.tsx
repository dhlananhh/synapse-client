"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "@/types";
import { TRegisterSchema } from "@/lib/validators/auth-validator";

interface AuthContextType {
  currentUser: User | null;
  login: (username: string) => void;
  logout: () => void;
  register: (data: any) => void;
  subscribedCommunityIds: string[];
  isSubscribed: (communityId: string) => boolean;
  subscribeToCommunity: (communityId: string) => void;
  unsubscribeFromCommunity: (communityId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ currentUser, setCurrentUser ] = useState<User | null>(null);
  const [ subscribedCommunityIds, setSubscribedCommunityIds ] = useState<string[]>([]);

  const login = (username: string) => {
    const mockUser = { id: "u_dev", username: "dev_guru" };
    setCurrentUser({ ...mockUser, username });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (data: TRegisterSchema) => {
    const newUser: User = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      username: data.username,
    };
    setCurrentUser(newUser);
  };

  const isSubscribed = (communityId: string) => {
    return subscribedCommunityIds.includes(communityId);
  };

  const subscribeToCommunity = (communityId: string) => {
    setSubscribedCommunityIds(prev => [ ...prev, communityId ]);
  };

  const unsubscribeFromCommunity = (communityId: string) => {
    setSubscribedCommunityIds(prev => prev.filter(id => id !== communityId));
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    subscribedCommunityIds,
    isSubscribed,
    subscribeToCommunity,
    unsubscribeFromCommunity
  };

  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
