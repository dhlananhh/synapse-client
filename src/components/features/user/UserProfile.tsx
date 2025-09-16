"use client"


import React from "react";
import { useAuth } from "@/context/MockAuthContext";
import {
  User,
  Post,
  UserComment,
  Activity
} from "@/types";
import ProfileHeader from "./ProfileHeader";
import UserPostFeed from "./UserPostFeed";
import UserCommentFeed from "./UserCommentFeed";
import ActivityCalendar from "./ActivityCalendar";
import FollowingTab from "./FollowingTab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";


interface UserProfileProps {
  user: User;
  userPosts: Post[];
  userComments: UserComment[];
  activity: Activity[];
}

export default function UserProfile({
  user,
  userPosts,
  userComments,
  activity
}: UserProfileProps) {

  const { currentUser } = useAuth();
  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="mt-10 mb-10 space-y-8">
      <ProfileHeader user={ user } postCount={ userPosts.length } />
      <ActivityCalendar activityData={ activity } />

      <div className="mt-6">
        <Tabs defaultValue="posts" className="max-w-full">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            {
              isOwnProfile && <TabsTrigger value="following">Following</TabsTrigger>
            }
          </TabsList>
          <TabsContent value="posts">
            <UserPostFeed posts={ userPosts } />
          </TabsContent>
          <TabsContent value="comments">
            <UserCommentFeed comments={ userComments } />
          </TabsContent>
          {
            isOwnProfile && (
              <TabsContent value="following">
                <FollowingTab />
              </TabsContent>
            )
          }
        </Tabs>
      </div>
    </div>
  )
}
