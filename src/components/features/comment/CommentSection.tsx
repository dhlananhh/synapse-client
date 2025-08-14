"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Comment } from "@/types";
import CommentForm from "./CommentForm";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { formatDistanceToNow } from "date-fns";


function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex items-center gap-2">
        <UserAvatar user={ comment.author } className="h-6 w-6" />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <p className="font-semibold text-primary">{ comment.author.username }</p>
          <span>•</span>
          <p>{ formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }</p>
        </div>
      </div>
      <p className="text-sm ml-8">{ comment.text }</p>

      { comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 pl-4 border-l-2">
          { comment.replies.map(reply => (
            <CommentItem key={ reply.id } comment={ reply } />
          )) }
        </div>
      ) }
    </div>
  )
}


export default function CommentSection({ initialComments }: { initialComments: Comment[] }) {
  const { currentUser } = useAuth();
  const [ comments, setComments ] = useState<Comment[]>(initialComments);

  const handleAddComment = async (text: string) => {
    if (!currentUser) return;
    await new Promise(resolve => setTimeout(resolve, 500));

    const newComment: Comment = {
      id: `c${Math.random()}`,
      text,
      author: currentUser,
      createdAt: new Date().toISOString(),
      votes: 1,
      replies: [],
    };

    setComments(prev => [ newComment, ...prev ]);
  }

  return (
    <div className="mt-8">
      <hr className="my-6" />
      { currentUser ? (
        <div>
          <p className="text-sm mb-2">Comment as <span className="font-semibold text-primary">{ currentUser.username }</span></p>
          <CommentForm onCommentSubmit={ handleAddComment } />
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <Link href="/login" className="text-primary font-semibold hover:underline">Log in</Link> to post a comment.
        </div>
      ) }

      <div className="mt-6 flex flex-col gap-4">
        { comments.map(comment => (
          <CommentItem key={ comment.id } comment={ comment } />
        )) }
      </div>
    </div>
  )
}
