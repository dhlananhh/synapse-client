"use client";

import React, { useState, useEffect } from "react";
import { Post } from "@/types";
import { fetchPosts } from "@/lib/api";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import PostCard from "./PostCard";
import PostFeedSkeleton from "./PostFeedSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import { Globe, Loader2 } from "lucide-react";


export default function PostFeed() {
  const [ posts, setPosts ] = useState<Post[]>([]);
  const [ page, setPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isInitialLoading, setIsInitialLoading ] = useState(true);
  const [ hasMore, setHasMore ] = useState(true);

  const loadMorePosts = async (isInitial = false) => {
    if (isLoading || (!hasMore && !isInitial)) return;

    setIsLoading(true);
    if (isInitial) setIsInitialLoading(true);

    const { data: newPosts, hasMore: newHasMore } = await fetchPosts(page);

    setPosts(prevPosts => [ ...prevPosts, ...newPosts ]);
    setPage(prevPage => prevPage + 1);
    setHasMore(newHasMore);

    setIsLoading(false);
    if (isInitial) setIsInitialLoading(false);
  };

  useEffect(() => {
    loadMorePosts(true);
  }, []);

  const { lastElementRef } = useIntersectionObserver({
    onIntersect: () => loadMorePosts(),
    isLoading,
    hasMore
  });

  if (isInitialLoading) {
    return <PostFeedSkeleton />;
  }

  if (!isLoading && posts.length === 0) {
    return (
      <EmptyState
        Icon={ Globe }
        title="The Feed is Empty"
        description="There are no posts to show right now. Why not be the first to create one?"
        action={ {
          label: "Create a Post",
          href: "/submit"
        } }
      />
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          posts.map((post, index) => {
            if (index === posts.length - 1) {
              return (
                <div
                  key={ post.id }
                  ref={ lastElementRef }
                >
                  <PostCard post={ post } />
                </div>
              )
            }
            return (
              <PostCard
                key={ post.id }
                post={ post }
              />
            )
          })
        }
      </div>

      {
        isLoading && !isInitialLoading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )
      }

      {
        !hasMore && posts.length > 0 && (
          <div className="text-center text-muted-foreground py-10">
            <p>You&apos;ve reached the end of the line!</p>
          </div>
        )
      }
    </div>
  );
}
