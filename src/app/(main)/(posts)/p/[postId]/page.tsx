"use client";


import React, {
  use,
  useState,
  useEffect,
  useCallback,
} from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { fetchPostById, deletePost } from "@/libs/api";
import { Post } from "@/types";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import ReportDialog from "@/components/features/report/ReportDialog";
import ErrorDisplay from "@/components/shared/ErrorDisplay";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import VoteClient from "@/components/features/post/VoteClient";
import CommentSection from "@/components/features/comment/CommentSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Flag
} from "lucide-react";


function PostView({ post }: { post: Post }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  const isAuthor = currentUser?.id === post.author.id;

  const [ isDeleting, setIsDeleting ] = useState(false);
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);
  const [ isReportDialogOpen, setIsReportDialogOpen ] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      toast.success("Post deleted successfully.");
      router.push(`/c/${post.community.slug}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete post.");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-10">
        <VoteClient itemId={ post.id } initialVotes={ post.votes } />

        <div className="w-full rounded-md bg-card p-4 sm:p-6">
          <div className="flex justify-start items-center gap-1 text-xs text-muted-foreground">
            <UserAvatar user={ post.author } className="h-5 w-5" />
            <p>
              Posted by { " " }
              <Link
                href={ `/u/${post.author.username}` }
                className="font-semibold text-primary hover:underline"
              >
                u/{ post.author.username }
              </Link>
              { " " } in{ " " }
              <Link
                href={ `/c/${post.community.slug}` }
                className="font-semibold text-primary hover:underline"
              >
                c/{ post.community.slug }
              </Link>
            </p>
            <span>•</span>
            <span>
              { formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }
            </span>
          </div>

          {
            isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={ `/p/${post.id}/edit` }>
                      <Pencil className="mr-2 h-4 w-4" /> Edit Post
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={ () => setIsDeleteDialogOpen(true) }
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }

          { !isAuthor && (
            <DropdownMenuItem onClick={ () => setIsReportDialogOpen(true) }>
              <Flag className="mr-2 h-4 w-4" />Report
            </DropdownMenuItem>
          ) }

          <h1 className="mt-2 text-2xl font-bold leading-tight">{ post.title }</h1>
          <p className="mt-4 text-foreground/80">{ post.content }</p>
          <CommentSection postId={ post.id } initialComments={ post.comments } />
        </div>
      </div>


      <ConfirmDialog
        open={ isDeleteDialogOpen }
        onOpenChange={ setIsDeleteDialogOpen }
        onConfirm={ handleDelete }
        title="Are you sure you want to delete this post?"
        description={ `This action cannot be undone. All comments and votes associated with this post will be permanently lost.` }
        confirmText="Delete Post"
        isConfirming={ isDeleting }
      />

      <ReportDialog
        isOpen={ isReportDialogOpen }
        onOpenChange={ setIsReportDialogOpen }
        itemId={ post.id }
        itemType="POST"
      />
    </>
  );
}


export default function PostDetailPage(props: { params: Promise<{ postId: string }> }) {
  const params = use(props.params);
  const [ post, setPost ] = useState<Post | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
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
  }, [ params.postId ]);

  useEffect(() => {
    loadPost();
  }, [ params.postId, loadPost ]);

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
