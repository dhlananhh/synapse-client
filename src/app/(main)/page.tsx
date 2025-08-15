import PostCard from "@/components/features/post/PostCard";
import CreatePostWidget from "@/components/shared/CreatePostWidget";
import PostFeed from "@/components/features/post/PostFeed";
import { mockPosts } from "@/lib/mock-data";

export default function HomePage() {
  const posts = mockPosts;

  return (
    <div className="mt-10">

      <CreatePostWidget />
      <PostFeed />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { posts.map(post => (
          <PostCard key={ post.id } post={ post } />
        )) }
      </div>
    </div>
  )
} 
