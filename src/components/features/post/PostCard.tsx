"use client";

import React from "react";
import Link from "next/link";
import { Post } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import VoteClient from "./VoteClient";


interface PostCardProps {
  post: Post;
}


const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  ({ post }, ref) => {
    return (
      <Card
        ref={ ref }
        className="flex flex-col h-full overflow-hidden shadow-sm hover:border-primary/50 transition-colors
        w-full max-w-xl mx-auto rounded-2xl sm:rounded-xl border bg-card
        min-w-0 sm:min-w-[300px]"
      >
        <CardHeader className="p-3 sm:p-4">
          <div className="text-xs text-muted-foreground flex flex-wrap gap-x-1">
            Posted by { " " }
            <Link
              href={ `/u/${post.author.username}` }
              className="font-medium text-foreground hover:underline"
            >
              u/{ post.author.username }
            </Link>
            • { formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) } in { " " }
            <Link
              href={ `/c/${post.community.slug}` }
              className="font-medium text-foreground hover:underline"
            >
              c/{ post.community.slug }
            </Link>
          </div>
          <CardTitle className="mt-1 text-lg sm:text-xl font-semibold leading-tight break-words">
            <Link
              href={ `/p/${post.id}` }
              className="hover:underline"
            >
              { post.title }
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 pt-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-4 break-words">
            { post.content }
          </p>
        </CardContent>

        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-sm font-medium text-muted-foreground p-2 sm:px-4 border-t">
          <VoteClient itemId={ post.id } initialVotes={ post.votes } />

          <Button asChild variant="ghost" size="lg" className="rounded-full flex items-center gap-1.5 px-2">
            <Link href={ `/p/${post.id}` }>
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">{ post.comments.length } Comments</span>
              <span className="inline sm:hidden">{ post.comments.length }</span>
            </Link>
          </Button>

          <Button variant="ghost" size="lg" className="rounded-full flex items-center gap-1.5 px-2">
            <Share2 className="h-5 w-5" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </Card>
    )
  }
)

PostCard.displayName = "PostCard";

export default PostCard;
