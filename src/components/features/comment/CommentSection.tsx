"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Comment } from "@/types";
import CommentForm from "./CommentForm";
import CommentItem from "@/components/features/comment/CommentItem";


interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}


export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
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

  const removeCommentFromState = (commentId: string) => {
    const filterRecursive = (comments: Comment[]): Comment[] => {
      return comments
        .filter(c => c.id !== commentId)
        .map(c => ({ ...c, replies: c.replies ? filterRecursive(c.replies) : [] }));
    };
    setComments(filterRecursive);
  }

  const updateCommentInState = (commentId: string, newText: string) => {
    const updateRecursive = (comments: Comment[]): Comment[] => {
      return comments.map(c => {
        if (c.id === commentId) {
          return { ...c, text: newText };
        }
        return { ...c, replies: c.replies ? updateRecursive(c.replies) : [] };
      });
    };
    setComments(updateRecursive);
  }

  return (
    <div className="mt-8">
      <hr className="my-6" />
      { currentUser ? (
        <div>
          <p className="text-sm mb-2">
            Comment as
            <span className="font-semibold text-primary">
              { currentUser.username }
            </span>
          </p>
          <CommentForm onCommentSubmit={ handleAddComment } />
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Log in
          </Link>
          to post a comment.
        </div>
      ) }

      <div className="mt-6 flex flex-col gap-4">
        {
          comments.map(comment => (
            <CommentItem
              key={ comment.id }
              comment={ comment }
              postId={ postId }
              onCommentDeleted={ removeCommentFromState }
              onCommentUpdated={ updateCommentInState }
            />
          ))
        }
      </div>
    </div>
  )
}
