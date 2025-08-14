import { notFound } from "next/navigation";
import { mockPosts, mockCommunities } from "@/lib/mock-data";
import CommunityHeader from "@/components/features/community/CommunityHeader";
import CreatePostWidget from "@/components/shared/CreatePostWidget";
import PostCard from "@/components/features/post/PostCard";

const getCommunityPageData = (slug: string) => {
  const community = mockCommunities.find((c) => c.slug === slug);
  if (!community) return null;

  const posts = mockPosts.filter((p) => p.community.id === community.id);
  return { community, posts };
}

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const data = getCommunityPageData(params.slug);

  if (!data) {
    notFound();
  }

  const { community, posts } = data;

  return (
    <div>
      <CommunityHeader community={ community } />
      <CreatePostWidget />

      <div className="mt-6 flex flex-col gap-4">
        {
          posts.length > 0 ? (
            posts.map(post => <PostCard key={ post.id } post={ post } />)
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              <p>No posts in this community yet.</p>
              <p className="text-sm">Be the first one to create a post!</p>
            </div>
          )
        }
      </div>
    </div>
  )
}
