"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { mockCommunities } from "@/libs/mock-data";
import AboutCommunityWidget from "@/components/features/community/AboutCommunityWidget";

interface CommunityLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

const getCommunity = (slug: string) => {
  return mockCommunities.find((c) => c.slug === slug);
}

export default function CommunityLayout(props: CommunityLayoutProps) {
  const params = use(props.params);

  const {
    children
  } = props;

  const community = getCommunity(params.slug);

  if (!community) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
      <div className="col-span-2">
        { children }
      </div>

      <aside className="hidden md:block">
        <div className="sticky top-20">
          <AboutCommunityWidget community={ community } />
        </div>
      </aside>
    </div>
  )
}
