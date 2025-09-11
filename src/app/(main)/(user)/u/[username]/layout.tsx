"use client";


import React from "react";
import { useParams, notFound } from "next/navigation";
import { allMockUsers, mockPosts } from "@/libs/mock-data";
import ProfileHeader from "@/components/features/user/ProfileHeader";
import TrophyCaseWidget from "@/components/features/user/TrophyCaseWidget";


export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const username = typeof params.username === "string" ? params.username : "";

  const user = allMockUsers.find(u => u.username === username);
  const userPostCount = mockPosts.filter(p => p.author.username === username).length;

  if (!user) {
    return notFound();
  }

  return (
    <div className="space-y-8 mt-10 mb-10">
      <ProfileHeader
        user={ user }
        postCount={ userPostCount }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-6">

        <div className="lg:col-span-2">
          { children }
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-10 space-y-4">
            <TrophyCaseWidget username={ user.username } />
          </div>
        </aside>
      </div>
    </div>
  );
}
