"use client";


import React, { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotificationStore } from "@/store/useNotificationStore";
import { mockPosts } from "@/libs/mock-data";
import { Notification, NotificationType, User } from "@/types";


const mockActors: User[] = [
  {
    id: "u1",
    username: "john_doe",
    displayName: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?u=u1",
    createdAt: "2023-05-10T12:00:00Z",
    karma: {
      post: 900,
      comment: 350
    },
    gender: "Male",
    bannerUrl: "https://placehold.co/1200x400/1f2937/d1d5db?text=John+Doe",
  },
  {
    id: "u2",
    username: "dev_guru",
    displayName: "Dev Guru",
    avatarUrl: "https://i.pravatar.cc/150?u=u2",
    createdAt: "2022-11-20T15:30:00Z",
    karma: {
      post: 2800,
      comment: 600
    },
    gender: "Male",
    bannerUrl: "https://placehold.co/1200x400/1f2937/d1d5db?text=Dev+Guru",
  },
];


const generateRandomNotification = (currentUser: User): Notification => {
  const type: NotificationType = [ "NEW_COMMENT", "POST_UPVOTE", "NEW_FOLLOWER" ][ Math.floor(Math.random() * 3) ] as NotificationType;
  const actor = mockActors[ Math.floor(Math.random() * mockActors.length) ];
  const randomPost = mockPosts[ Math.floor(Math.random() * mockPosts.length) ];

  let message = "";
  let entityUrl = "";

  switch (type) {
    case "NEW_COMMENT":
      message = `commented on your post: "${randomPost.title.substring(0, 20)}..."`;
      entityUrl = `/p/${randomPost.id}`;
      break;
    case "POST_UPVOTE":
      message = `upvoted your post: "${randomPost.title.substring(0, 20)}..."`;
      entityUrl = `/p/${randomPost.id}`;
      break;
    case "NEW_FOLLOWER":
      message = "started following you.";
      entityUrl = `/u/${actor.username}`;
      break;
  }

  return {
    id: `notif_${Date.now()}`,
    type,
    actor,
    message,
    entityUrl,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
}


export default function NotificationSimulator() {
  const { currentUser } = useAuth();
  const { addNotification } = useNotificationStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentUser && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const newNotif = generateRandomNotification(currentUser);
        addNotification(newNotif);
      }, 10000);
    }

    if (!currentUser && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [ currentUser, addNotification ]);

  return null;
}
