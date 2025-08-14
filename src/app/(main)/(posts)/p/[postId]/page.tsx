import Link from "next/link";
import { mockPosts } from "@/lib/mock-data";
import { Post } from "@/types";
import { notFound } from "next/navigation";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import PostVoteClient from "@/components/features/post/PostVoteClient";
import CommentSection from "@/components/features/comment/CommentSection";


const getPostData = (postId: string): Post | undefined => {
  return mockPosts.find(p => p.id === postId);
}

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  const post = getPostData(params.postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
      <PostVoteClient initialVotes={ post.votes } />

      <div className="w-full rounded-md bg-card p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <UserAvatar user={ post.author } className="h-5 w-5" />
          <p>
            Posted by{ " " }
            <Link href={ `/u/${post.author.username}` } className="font-semibold text-primary hover:underline">
              u/{ post.author.username }
            </Link>{ " " }
            in{ " " }
            <Link href={ `/c/${post.community.slug}` } className="font-semibold text-primary hover:underline">
              c/{ post.community.slug }
            </Link>
          </p>
          <span>•</span>
          <span>{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold leading-tight">{ post.title }</h1>

        <p className="mt-4 text-foreground/80">{ post.content }</p>

        <CommentSection initialComments={ post.comments } />
      </div>
    </div>
  );
}
