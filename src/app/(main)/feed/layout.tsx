"use client";

import React from "react";
import TopCommunitiesWidget from "@/components/features/community/TopCommunitiesWidget";

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-6 py-6">
      <div className="md:col-span-2">
        { children }
      </div>

      <aside className="hidden md:block">
        <div className="sticky top-20 space-y-4">
          <TopCommunitiesWidget />
        </div>
      </aside>
    </div>
  );
}
