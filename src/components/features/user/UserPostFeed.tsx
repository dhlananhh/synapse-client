// File: src/components/features/user/UserPostFeed.tsx
import { Post } from '@/types';
import PostCard from '@/components/features/post/PostCard';

export default function UserPostFeed({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      { posts.length > 0 ? (
        posts.map(post => <PostCard key={ post.id } post={ post } />)
      ) : (
        <p className="col-span-full text-center text-muted-foreground mt-8">This user hasn't made any posts yet.</p>
      ) }
    </div>
  )
}
