"use client";

import { useEffect, useState, use } from "react";
import { useRouter, notFound } from "next/navigation";
import { useAuth } from "@/context/MockAuthContext";
import { fetchPostById } from "@/libs/mock-api";
import { Post } from "@/types";
import EditPostForm from "@/components/features/post/EditPostForm";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorDisplay from "@/components/shared/ErrorDisplay";


function EditPageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}


export default function EditPostPage(props: { params: Promise<{ postId: string }> }) {
  const params = use(props.params);
  const { currentUser } = useAuth();
  const router = useRouter();
  const [ post, setPost ] = useState<Post | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    const loadPostForEdit = async () => {
      try {
        const fetchedPost = await fetchPostById(params.postId);

        if (!currentUser || currentUser.id !== fetchedPost.author.id) {
          return router.push(`/p/${params.postId}`);
        }

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

    if (currentUser !== undefined) {
      loadPostForEdit();
    }

  }, [ params.postId, currentUser, router ]);

  if (isLoading || currentUser === undefined) {
    return <EditPageSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={ error } onRetry={ () => router.refresh() } />;
  }

  if (post) {
    return <EditPostForm post={ post } />;
  }

  return null;
}
