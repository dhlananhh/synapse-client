"use client";

import React from "react";
import Link from "next/link";
import { mockCommunities } from "@/libs/mock-data";
import { Community } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";


const getTopCommunities = (): Community[] => {
  return [ ...mockCommunities ].sort((a, b) => b.memberCount - a.memberCount).slice(0, 5);
}


export default function TopCommunitiesWidget() {
  const topCommunities = getTopCommunities();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Communities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          { topCommunities.map((community, index) => (
            <li key={ community.id }>
              <Link href={ `/c/${community.slug}` } className="flex items-center gap-3 group">
                <span className="font-bold text-lg">{ index + 1 }</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={ community.imageUrl } />
                  <AvatarFallback>{ community.name.slice(0, 2).toUpperCase() }</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold group-hover:underline">c/{ community.slug }</p>
                  <div className="text-xs text-muted-foreground flex items-center">
                    { community.memberCount.toLocaleString() } members
                  </div>
                </div>
              </Link>
            </li>
          )) }
        </ul>
        <Button className="w-full mt-6" variant="outline" asChild>
          <Link href="#">View All</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
