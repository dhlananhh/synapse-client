"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Cake, Zap, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function ProfileHeader({ user, postCount }: { user: User, postCount: number }) {
  const { currentUser } = useAuth();
  const { openChatWith } = useChatStore();

  const canChat = currentUser && currentUser.id !== user.id;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        <UserAvatar user={ user } className="h-24 w-24 sm:h-32 sm:w-32 text-4xl" />

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">{ user.username }</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>{ user.karma.toLocaleString() } Karma</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>{ postCount } Posts</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Cake className="h-4 w-4" />
              <span>Joined { format(new Date(user.createdAt), "MMM d, yyyy") }</span>
            </div>
          </div>
        </div>
      </div>

      {
        canChat && (
          <Button onClick={ () => openChatWith(user) }>
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
        )
      }
    </div>
  )
}
