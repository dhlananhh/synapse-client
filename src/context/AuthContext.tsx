"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "@/types";
import { TRegisterSchema } from "@/lib/validators/auth-validator";
import { TUserProfileSchema } from '@/lib/validators/user-validator';

interface AuthContextType {
  currentUser: User | null;
  login: (username: string) => void;
  logout: () => void;
  register: (data: any) => void;
  subscribedCommunityIds: string[];
  isSubscribed: (communityId: string) => boolean;
  subscribeToCommunity: (communityId: string) => void;
  unsubscribeFromCommunity: (communityId: string) => void;
  updateUserProfile: (data: TUserProfileSchema) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ currentUser, setCurrentUser ] = useState<User | null>(null);
  const [ subscribedCommunityIds, setSubscribedCommunityIds ] = useState<string[]>([]);

  const login = (username: string) => {
    const mockUser = { id: "u_dev", username: "dev_guru", createdAt: new Date().toISOString(), karma: 0 };
    setCurrentUser({ ...mockUser, username });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (data: TRegisterSchema) => {
    const newUser: User = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      username: data.username,
      createdAt: new Date().toISOString(),
      karma: 0,
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

  const updateUserProfile = (data: TUserProfileSchema) => {
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        username: data.username,
      };
      setCurrentUser(updatedUser);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    subscribedCommunityIds,
    isSubscribed,
    subscribeToCommunity,
    unsubscribeFromCommunity,
    updateUserProfile,
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
