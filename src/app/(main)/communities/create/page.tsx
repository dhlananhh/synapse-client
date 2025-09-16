"use client";


import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CreateCommunityForm from "@/components/features/community/CreateCommunityForm";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHS } from "@/libs/paths";


export default function CreateCommunityPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      router.push(`${PATHS.login}?from=${PATHS.createCommunity}`);
    }
  }, [ currentUser, router ]);

  if (currentUser === undefined) {
    return (
      <Skeleton className="h-96 w-full" />
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <CreateCommunityForm />
    </div>
  );
}
