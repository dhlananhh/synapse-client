"use client";


import React from "react";
import { useAuth } from "@/context/AuthContext";
import FeedPage from "@/components/features/feed/FeedPage";
import LandingPage from "@/components/features/landing/LandingPage";
import { Skeleton } from "@/components/ui/skeleton";


export default function HomePage() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  if (currentUser) {
    return (
      <FeedPage />
    )
  }

  return (
    <LandingPage />
  )
}
