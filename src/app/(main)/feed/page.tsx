"use client"

import CreatePostWidget from "@/components/shared/CreatePostWidget";
import PostFeed from "@/components/features/post/PostFeed";

export default function FeedPage() {
  return (
    <div>
      <CreatePostWidget />
      <PostFeed />
    </div>
  )
}
