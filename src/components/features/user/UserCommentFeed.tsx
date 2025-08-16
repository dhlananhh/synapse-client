"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { UserComment } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/UserAvatar";
import EmptyState from "@/components/shared/EmptyState";
import { MessageCircleOff } from "lucide-react";


function UserCommentCard({ comment }: { comment: UserComment }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground mb-2">
          <span>{ comment.author.username }</span> commented on
          <Link
            href={ `/p/${comment.postId}` }
            className="font-semibold text-primary hover:underline ml-1"
          >
            { comment.postTitle }
          </Link>
        </div>
        <Link
          href={ `/p/${comment.postId}#comment-${comment.id}` }
          className="hover:bg-secondary/50 block rounded-md p-3 -mx-3"
        >
          <p className="text-sm">{ comment.text }</p>
          <p className="text-xs text-muted-foreground mt-2">
            { formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }
          </p>
        </Link>
      </CardContent>
    </Card>
  )
}


export default function UserCommentFeed({ comments }: { comments: UserComment[] }) {
  if (comments.length === 0) {
    return (
      <div className="mt-6">
        <EmptyState
          Icon={ MessageCircleOff }
          title="No Comments Yet"
          description="This user hasn't made any comments. When they do, their comments will appear here."
        />
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {
        comments.map(
          comment => (
            <UserCommentCard key={ comment.id } comment={ comment } />
          )
        )
      }
    </div>
  );
}
