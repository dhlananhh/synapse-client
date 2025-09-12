"use client";


import React, { use } from "react";
import {
  notFound,
  useSearchParams
} from "next/navigation";
import { mockPosts, mockCommunities } from "@/libs/mock-data";
import CommunityHeader from "@/components/features/community/CommunityHeader";
import CommunityPostFeed from "@/components/features/community/CommunityPostFeed";
import CreatePostWidget from "@/components/shared/CreatePostWidget";


const getCommunityPageData = (slug: string) => {
  const community = mockCommunities.find((c) => c.slug === slug);
  if (!community) return null;

  const posts = mockPosts.filter((p) => p.community.id === community.id);
  return { community, posts };
}


export default function CommunityPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const data = getCommunityPageData(params.slug);
  const searchParams = useSearchParams();
  const activeFlairId = searchParams.get("flair");

  if (!data) {
    notFound();
    return null;
  }
  const { community } = data;

  return (
    <div>
      <CommunityHeader community={ community } />
      <CreatePostWidget />

      <div className="mt-6">
        <CommunityPostFeed communityId={ community.id } flairId={ activeFlairId } />
      </div>
    </div>
  );
}
