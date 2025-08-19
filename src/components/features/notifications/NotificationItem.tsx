"use client";

import Link from "next/link";
import { Notification } from "@/types";
import { useNotificationStore } from "@/store/useNotificationStore";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { cn } from "@/libs/utils";
import { MessageSquare, ThumbsUp, UserPlus } from "lucide-react";


const notificationIcons = {
  NEW_COMMENT: <MessageSquare className="h-4 w-4 text-blue-500" />,
  POST_UPVOTE: <ThumbsUp className="h-4 w-4 text-green-500" />,
  NEW_FOLLOWER: <UserPlus className="h-4 w-4 text-purple-500" />,
};


export default function NotificationItem({ notification }: { notification: Notification }) {
  const { markAsRead } = useNotificationStore();

  return (
    <Link
      href={ notification.entityUrl }
      onClick={ () => markAsRead(notification.id) }
    >
      <div className={
        cn(
          "flex items-start gap-3 p-3 hover:bg-secondary/80",
          !notification.isRead && "bg-secondary"
        )
      }
      >
        <div className="relative">
          <UserAvatar user={ notification.actor } className="h-8 w-8" />
          <div className="absolute -bottom-1 -right-1 bg-background p-0.5 rounded-full">
            { notificationIcons[ notification.type ] }
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-bold">
              { notification.actor.username } { " " }
            </span>
            { notification.message }
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            { new Date(notification.createdAt).toLocaleTimeString() }
          </p>
        </div>
        {
          !notification.isRead && (
            <div className="w-2 h-2 rounded-full bg-blue-500 self-center" />
          )
        }
      </div>
    </Link>
  );
}
