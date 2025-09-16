"use client";


import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/MockAuthContext";
import { fetchPostsByIds } from "@/libs/mock-api";
import { Post } from "@/types";
import PostCard from "@/components/features/post/PostCard";
import PostFeedSkeleton from "@/components/features/post/PostFeedSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";


export default function HistoryPage() {
  const { viewedPostIds, clearHistory } = useAuth();
  const [ historyPosts, setHistoryPosts ] = useState<Post[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isClearDialogOpen, setIsClearDialogOpen ] = useState(false);

  useEffect(() => {
    const loadHistoryPosts = async () => {
      if (viewedPostIds.length === 0) {
        setHistoryPosts([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const posts = await fetchPostsByIds(viewedPostIds);
        setHistoryPosts(posts);
      } catch (error) {
        console.error("Failed to fetch history posts:", error);
        setHistoryPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadHistoryPosts();
  }, [ viewedPostIds ]);

  const handleClearHistory = () => {
    clearHistory();
    toast.success("Browsing history cleared.");
    setIsClearDialogOpen(false);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-10">
        <h1 className="text-3xl font-bold">Browsing History</h1>
        {
          historyPosts.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={ () => setIsClearDialogOpen(true) }
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear History
            </Button>
          )
        }
      </div>

      {
        isLoading ? (
          <PostFeedSkeleton />
        ) : historyPosts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {
              historyPosts.map(post =>
                <PostCard key={ post.id } post={ post } />
              )
            }
          </div>
        ) : (
          <EmptyState
            Icon={ Clock }
            title="No Browsing History"
            description={ `Posts you've recently viewed will show up here. Start exploring to build your history.` }
            action={ {
              label: "Explore the Feed",
              href: "/feed"
            } }
          />
        )
      }


      <ConfirmDialog
        open={ isClearDialogOpen }
        onOpenChange={ setIsClearDialogOpen }
        onConfirm={ handleClearHistory }
        title="Are you sure you want to clear your history?"
        description="This will permanently delete your list of viewed posts. This action cannot be undone."
        confirmText="Yes, clear history"
      />
    </>
  );
}
