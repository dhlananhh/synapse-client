"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Community, Flair } from "@/types";
import { fetchFlairsForCommunity } from "@/libs/mock-api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/libs/utils";


interface FlairFilterWidgetProps {
  community: Community;
  activeFlairId?: string | null;
}


export default function FlairFilterWidget({ community, activeFlairId }: FlairFilterWidgetProps) {
  const [ flairs, setFlairs ] = useState<Flair[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const loadFlairs = async () => {
      setIsLoading(true);
      const data = await fetchFlairsForCommunity(community.id);
      setFlairs(data);
      setIsLoading(false);
    };
    loadFlairs();
  }, [ community.id ]);

  if (isLoading) {
    return (
      <Skeleton className="h-24 w-full" />
    )
  }
  if (flairs.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Filter by Flair
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Link href={ `/c/${community.slug}` }>
          <Badge
            variant={ !activeFlairId ? "default" : "secondary" }
            className="cursor-pointer"
          >
            All Posts
          </Badge>
        </Link>
        {
          flairs.map(flair => (
            <Link
              key={ flair.id }
              href={ `/c/${community.slug}?flair=${flair.id}` }
            >
              <Badge
                variant={ activeFlairId === flair.id ? "default" : "secondary" }
                style={ { backgroundColor: activeFlairId === flair.id ? flair.color : undefined } }
                className={ cn("cursor-pointer", activeFlairId === flair.id && "text-white") }
              >
                { flair.name }
              </Badge>
            </Link>
          ))
        }
      </CardContent>
    </Card>
  );
}
