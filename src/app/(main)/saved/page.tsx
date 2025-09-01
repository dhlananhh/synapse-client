"use client";


import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchPostsByIds } from "@/libs/api";
import { Post } from "@/types";
import PostCard from "@/components/features/post/PostCard";
import PostFeedSkeleton from "@/components/features/post/PostFeedSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import { Bookmark } from "lucide-react";


export default function SavedPostsPage() {
  const { savedPostIds } = useAuth();
  const [ savedPosts, setSavedPosts ] = useState<Post[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const loadSavedPosts = async () => {
      if (savedPostIds.length === 0) {
        setSavedPosts([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const posts = await fetchPostsByIds(savedPostIds);
        setSavedPosts(posts.reverse());
      } catch (error) {
        console.error("Failed to fetch saved posts:", error);
        setSavedPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadSavedPosts();
  }, [ savedPostIds ]);


  return (
    <div className="mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6">
        Saved Posts
      </h1>

      {
        isLoading ? (
          <PostFeedSkeleton />
        ) : savedPosts.length > 0 ? (
          <div className="flex flex-col gap-4">
            { savedPosts.map(post => <PostCard key={ post.id } post={ post } />) }
          </div>
        ) : (
          <EmptyState
            Icon={ Bookmark }
            title="You haven't saved any posts yet"
            description={ `Find a post you want to read later and click the 'Save' button. It will show up here.` }
            action={ {
              label: "Explore the Feed",
              href: "/feed"
            } }
          />
        )
      }
    </div>
  );
}
