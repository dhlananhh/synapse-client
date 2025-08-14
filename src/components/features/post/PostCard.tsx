import React from "react";
import Link from "next/link";
import { Post } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowBigUp, ArrowBigDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="text-xs text-muted-foreground">
          Posted by <span className="font-semibold text-primary">u/{ post.author.username }</span> • { formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }
        </div>
        <CardTitle className="mt-1 text-lg leading-tight">
          <Link href={ `/p/${post.id}` } className="hover:underline">
            { post.title }
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">
          { post.content }
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-secondary/50 p-3">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ArrowBigUp className="h-5 w-5" />
            <span className="text-xs">{ post.votes }</span>
          </Button>
        </div>
        <Button asChild variant="ghost" size="sm" className="flex items-center gap-1.5">
          <Link href={ `/p/${post.id}` }>
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{ post.comments.length } Comments</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
export default PostCard;
