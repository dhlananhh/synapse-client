
import React from "react";
import Link from 'next/link';
import { Post } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Ribbon, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import VoteClient from './VoteClient';

interface PostCardProps {
  post: Post;
}

const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  ({ post }, ref) => {
    return (
      <Card
        ref={ ref }
        className="flex flex-col h-full overflow-hidden shadow-sm hover:border-primary/50 transition-colors min-w-[500px]"
      >
        <CardHeader className="p-4">
          <div className="text-xs text-muted-foreground">
            Posted by{ ' ' }
            <Link href={ `/u/${post.author.username}` } className="font-medium text-foreground hover:underline">
              u/{ post.author.username }
            </Link>{ ' ' }
            • { formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) } in { ' ' }
            <Link href={ `/c/${post.community.slug}` } className="font-medium text-foreground hover:underline">
              c/{ post.community.slug }
            </Link>
          </div>
          <CardTitle className="mt-1 text-xl font-semibold leading-tight">
            <Link href={ `/p/${post.id}` } className="hover:underline">
              { post.title }
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-4">
            { post.content }
          </p>
        </CardContent>

        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground p-2 px-4 border-t">

          <VoteClient itemId={ post.id } initialVotes={ post.votes } />

          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href={ `/p/${post.id}` } className="flex items-center gap-1.5">
              <MessageCircle className="h-5 w-5" />
              <span>{ post.comments.length } Comments</span>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" className="rounded-full flex items-center gap-1.5">
            <Ribbon className="h-5 w-5" />
            <span>Award</span>
          </Button>

          <Button variant="ghost" size="sm" className="rounded-full flex items-center gap-1.5">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </Button>
        </div>
      </Card>
    )
  }
)

PostCard.displayName = "PostCard";

export default PostCard;
