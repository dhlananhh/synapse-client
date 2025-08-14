import PostCard from "@/components/features/post/PostCard";
import CreatePostWidget from "@/components/shared/CreatePostWidget";
import { mockPosts } from "@/lib/mock-data";

export default function HomePage() {
  const posts = mockPosts;

  return (
    <div className="mt-10">
      {/* <h1 className="text-3xl font-bold md:text-4xl">Homepage</h1>
      <p className="mt-2 text-lg text-muted-foreground mb-10">
        Welcome to Synapse. Discover the discussions below.
      </p> */}

      <CreatePostWidget />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { posts.map(post => (
          <PostCard key={ post.id } post={ post } />
        )) }
      </div>
    </div>
  )
} 
