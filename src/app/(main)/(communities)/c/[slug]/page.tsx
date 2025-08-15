"use client";

import React from "react";
import { notFound } from "next/navigation";
import { mockPosts, mockCommunities } from "@/lib/mock-data";
import CommunityHeader from "@/components/features/community/CommunityHeader";
import CreatePostWidget from "@/components/shared/CreatePostWidget";
import PostCard from "@/components/features/post/PostCard";
import EmptyState from "@/components/shared/EmptyState";
import { Telescope } from "lucide-react";


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

      <div className="mt-6">
        {
          posts.length > 0 ? (
            <div className="flex flex-col gap-4">
              { posts.map(post => <PostCard key={ post.id } post={ post } />) }
            </div>
          ) : (
            <EmptyState
              Icon={ Telescope }
              title="Be the First to Post"
              description={
                `This community is quiet... for now. 
                Create the first post in c/${community.slug} and get the conversation started.`
              }
              action={ {
                label: "Create Post",
                href: `/submit?community=${community.slug}`
              } }
            />
          )
        }
      </div>
    </div>
  );
}
