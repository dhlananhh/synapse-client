"use client";


import React from "react";
import {
  notFound,
  useParams
} from "next/navigation";
import { useAuth } from "@/context/MockAuthContext";
import {
  mockPosts,
  allMockUsers
} from "@/libs/mock-data";
import {
  getAllComments,
  generateUserActivity,
} from "@/libs/mock-api"
import UserProfile from "@/components/features/user/UserProfile";
import UserPostFeed from "@/components/features/user/UserPostFeed";
import UserCommentFeed from "@/components/features/user/UserCommentFeed";
import FollowingTab from "@/components/features/user/FollowingTab";
import { Activity } from "@/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import ActivityCalendar from "@/components/features/user/ActivityCalendar";


export default function ProfilePage() {
  const params = useParams();
  const username = typeof params.username === "string" ? params.username : "";
  const { currentUser } = useAuth();

  const user = allMockUsers.find(u => u.username === username);

  if (!user) {
    return notFound();
  }

  const userPosts = mockPosts.filter(p => p.author.id === user.id);
  const userComments = getAllComments().filter(c => c.author.id === user.id);
  const activityData: Activity[] = generateUserActivity(user.username);
  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="space-y-6">
      <ActivityCalendar activityData={ activityData } />
      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">
            Posts
          </TabsTrigger>
          <TabsTrigger value="comments">
            Comments
          </TabsTrigger>
          {
            isOwnProfile && (
              <TabsTrigger value="following">
                Following
              </TabsTrigger>
            )
          }
        </TabsList>

        <TabsContent value="posts" className="mt-4">
          <UserPostFeed posts={ userPosts } />
        </TabsContent>

        <TabsContent value="comments" className="mt-4">
          <UserCommentFeed comments={ userComments } />
        </TabsContent>

        {
          isOwnProfile && (
            <TabsContent value="following" className="mt-4">
              <FollowingTab />
            </TabsContent>
          )
        }
      </Tabs>
    </div>
  );
} 
