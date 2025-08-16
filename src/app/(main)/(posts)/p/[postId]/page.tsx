"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPostById } from "@/lib/api";
import { Post } from "@/types";
import PostCardSkeleton from "@/components/features/post/PostCardSkeleton";
import ErrorDisplay from "@/components/shared/ErrorDisplay";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import VoteClient from "@/components/features/post/VoteClient";
import CommentSection from "@/components/features/comment/CommentSection";


function PostView({ post }: { post: Post }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-10">
      <VoteClient itemId={ post.id } initialVotes={ post.votes } />

      <div className="w-full rounded-md bg-card p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <UserAvatar user={ post.author } className="h-5 w-5" />
          <p>
            Posted by{ " " }
            <Link href={ `/u/${post.author.username}` } className="font-semibold text-primary hover:underline">
              u/{ post.author.username }
            </Link>{ " " }
            in{ " " }
            <Link href={ `/c/${post.community.slug}` } className="font-semibold text-primary hover:underline">
              c/{ post.community.slug }
            </Link>
          </p>
          <span>•</span>
          <span>{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold leading-tight">{ post.title }</h1>
        <p className="mt-4 text-foreground/80">{ post.content }</p>
        <CommentSection initialComments={ post.comments } />
      </div>
    </div>
  );
}


export default function PostDetailPage(props: { params: Promise<{ postId: string }> }) {
  const params = use(props.params);
  const [ post, setPost ] = useState<Post | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  const loadPost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPost = await fetchPostById(params.postId);
      setPost(fetchedPost);
    } catch (err: any) {
      if (err.status === 404) {
        notFound();
      } else {
        setError(err.message || "An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [ params.postId ]);

  if (isLoading) {
    return (
      <div>
        <div className="h-10 w-2/3 bg-muted animate-pulse rounded-md" />
        <div className="h-4 w-1/3 bg-muted animate-pulse rounded-md mt-4" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorDisplay
        message={ error }
        onRetry={ loadPost }
      />
    );
  }

  if (post) {
    return (
      <PostView post={ post } />
    )
  }

  return null;
}
