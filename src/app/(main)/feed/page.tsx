"use client"

import React from "react";
import CreatePostWidget from "@/components/shared/CreatePostWidget";
import PostFeed from "@/components/features/post/PostFeed";

export default function FeedPage() {
  return (
    <div className="mt-10">
      <CreatePostWidget />
      <PostFeed />
    </div>
  )
}
