"use client";


import React, { useEffect, useState } from "react";
import {
  Community,
  CommunityMemberWithRole,
} from "@/types";
import { fetchCommunityModerators } from "@/libs/api";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Crown, Shield } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


function ModeratorItem({ user }: { user: CommunityMemberWithRole }) {
  return (
    <li className="flex items-center justify-between">
      <Link
        href={ `/u/${user.username}` }
        className="flex items-center gap-3 group"
      >
        <UserAvatar
          user={ user }
          className="h-8 w-8"
        />
        <span className="font-semibold group-hover:underline">
          { user.username }
        </span>
      </Link>

      {
        user.role && (
          <TooltipProvider delayDuration={ 100 }>
            <Tooltip>
              <TooltipTrigger>
                {
                  user.role === "Owner" && <Crown className="h-4 w-4 text-amber-500" />
                }
                {
                  user.role === "Moderator" && <Shield className="h-4 w-4 text-blue-500" />
                }
              </TooltipTrigger>
              <TooltipContent>
                <p>{ user.role }</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    </li>
  );
}


export default function ModeratorListWidget({ community }: { community: Community }) {
  const [ moderators, setModerators ] = useState<CommunityMemberWithRole[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const loadModerators = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCommunityModerators(community.id);
        setModerators(data);
      } catch (error) {
        console.error("Failed to fetch moderators:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadModerators();
  }, [ community.id ]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {
          Array.from({ length: 2 }).map((_, i) => (
            <div key={ i } className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))
        }
      </div>
    );
  }

  if (moderators.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No moderators found.</p>
    )
  }

  return (
    <ul className="space-y-3">
      {
        moderators.map(user => (
          <ModeratorItem
            key={ user.id }
            user={ user }
          />
        ))
      }
    </ul>
  );
}
