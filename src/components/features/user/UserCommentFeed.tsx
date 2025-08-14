import { UserComment } from "@/types";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { formatDistanceToNow } from "date-fns";

function UserCommentCard({ comment }: { comment: UserComment }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground mb-2">
          <span>{ comment.author.username }</span> commented on
          <Link href={ `/p/${comment.postId}` } className="font-semibold text-primary hover:underline ml-1">
            { comment.postTitle }
          </Link>
        </div>
        <Link href={ `/p/${comment.postId}#comment-${comment.id}` } className="hover:bg-secondary/50 block rounded-md p-3 -mx-3">
          <p className="text-sm">{ comment.text }</p>
          <p className="text-xs text-muted-foreground mt-2">{ formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }</p>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function UserCommentFeed({ comments }: { comments: UserComment[] }) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      { comments.length > 0 ? (
        comments.map(comment => <UserCommentCard key={ comment.id } comment={ comment } />)
      ) : (
        <p className="text-center text-muted-foreground mt-8">This user hasn"t made any comments yet.</p>
      ) }
    </div>
  )
}
