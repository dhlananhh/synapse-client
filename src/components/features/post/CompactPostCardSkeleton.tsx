"use client";


import React from "react";
import { Skeleton } from "@/components/ui/skeleton";


export default function CompactPostCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-5 w-8" />
        <Skeleton className="h-6 w-6" />
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}
