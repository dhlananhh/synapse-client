"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from "react";
import { useTranslation } from "react-i18next";
import { User, Language } from "@/types";
import { TRegisterSchema } from "@/libs/validators/auth-validator";
import {
  TUserProfileSchema,
  TUpdateDisplayNameSchema
} from "@/libs/validators/user-validator";
import { allMockUsers } from "@/libs/mock-data";
import { toast } from "sonner";


type UserVote = "UP" | "DOWN";
type UserVotes = Record<string, UserVote>;


interface AuthContextType {
  currentUser: User | null;
  login: (username: string) => void;
  logout: () => void;
  register: (data: any) => void;
  subscribedCommunityIds: string[];
  isSubscribed: (communityId: string) => boolean;
  subscribeToCommunity: (communityId: string) => void;
  unsubscribeFromCommunity: (communityId: string) => void;
  updateUserProfile: (data: TUserProfileSchema | TUpdateDisplayNameSchema) => void;
  isOnboardingModalOpen: boolean;
  setIsOnboardingModalOpen: (isOpen: boolean) => void;
  userVotes: UserVotes;
  getVoteStatus: (itemId: string) => UserVote | null;
  handleVote: (itemId: string, newVote: UserVote) => void;
  displayLanguage: string;
  contentLanguages: string[];
  setDisplayLanguage: (langCode: string) => void;
  setContentLanguages: (langCodes: string[]) => void;
  mutedCommunityIds: string[];
  isMuted: (communityId: string) => boolean;
  toggleMuteCommunity: (communityId: string) => void;
  blockedUserIds: string[];
  isBlocked: (userId: string) => boolean;
  toggleBlockUser: (userId: string) => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  const [ currentUser, setCurrentUser ] = useState<User | null>(null);
  const [ subscribedCommunityIds, setSubscribedCommunityIds ] = useState<string[]>([]);
  const [ isOnboardingModalOpen, setIsOnboardingModalOpen ] = useState(false);
  const [ userVotes, setUserVotes ] = useState<UserVotes>({});
  const [ displayLanguage, setDisplayLanguage ] = useState<string>(i18n.language.split('-')[ 0 ]);
  const [ contentLanguages, setContentLanguages ] = useState<string[]>([ i18n.language.split('-')[ 0 ] ]);
  const [ mutedCommunityIds, setMutedCommunityIds ] = useState<string[]>([]);
  const [ blockedUserIds, setBlockedUserIds ] = useState<string[]>([]);


  useEffect(() => {
    const currentLang = i18n.language.split('-')[ 0 ];
    if (displayLanguage !== currentLang) {
      i18n.changeLanguage(displayLanguage);
    }
  }, [ displayLanguage, i18n ]);


  const login = (username: string) => {
    const userToLogin = allMockUsers.find(u => u.username === username);

    if (userToLogin) {
      setCurrentUser(userToLogin);
    } else {
      console.warn(`Login failed: User "${username}" not found in mock data.`);
      toast.error("Login Failed", { description: "Invalid username or password." });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (data: TRegisterSchema) => {
    const newUser: User = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      username: data.username,
      displayName: data.displayName,
      gender: data.gender,
      createdAt: new Date().toISOString(),
      karma: 0,
    };
    setCurrentUser(newUser);
    const hasCompletedOnboarding = localStorage.getItem("onboardingComplete");
    if (!hasCompletedOnboarding) {
      setIsOnboardingModalOpen(true);
    }
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

  const updateUserProfile = (data: TUserProfileSchema | TUpdateDisplayNameSchema) => {
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        username: "username" in data ? data.username : currentUser.username,
        displayName: "displayName" in data ? data.displayName : currentUser.displayName,
      };
      setCurrentUser(updatedUser);
    }
  };

  const getVoteStatus = (itemId: string) => {
    return userVotes[ itemId ] || null;
  };

  const handleVote = (itemId: string, newVote: UserVote) => {
    setUserVotes(prevVotes => {
      const currentVote = prevVotes[ itemId ];
      const newVotes = { ...prevVotes };

      if (currentVote === newVote) {
        // User is clicking the same button again, so un-vote
        delete newVotes[ itemId ];
      } else {
        // Set the new vote
        newVotes[ itemId ] = newVote;
      }
      return newVotes;
    });
  };

  const isMuted = (communityId: string): boolean => {
    return mutedCommunityIds.includes(communityId);
  };

  const toggleMuteCommunity = (communityId: string) => {
    setMutedCommunityIds(prevMuted => {
      if (prevMuted.includes(communityId)) {
        // If already muted, unmute it
        return prevMuted.filter(id => id !== communityId);
      } else {
        // If not muted, mute it
        return [ ...prevMuted, communityId ];
      }
    });
  };

  const isBlocked = (userId: string): boolean => {
    return blockedUserIds.includes(userId);
  };

  const toggleBlockUser = (userId: string) => {
    setBlockedUserIds(prevBlocked => {
      if (prevBlocked.includes(userId)) {
        // If already blocked, unblock
        return prevBlocked.filter(id => id !== userId);
      } else {
        // If not blocked, block
        return [ ...prevBlocked, userId ];
      }
    });
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
    isOnboardingModalOpen,
    setIsOnboardingModalOpen,
    userVotes,
    getVoteStatus,
    handleVote,
    displayLanguage,
    contentLanguages,
    setDisplayLanguage,
    setContentLanguages,
    mutedCommunityIds,
    isMuted,
    toggleMuteCommunity,
    blockedUserIds,
    isBlocked,
    toggleBlockUser,
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
