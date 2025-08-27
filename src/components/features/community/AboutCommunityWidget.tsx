"use client";


import React from "react";
import Link from "next/link";
import { Community } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Cake, Users } from "lucide-react";


interface AboutCommunityWidgetProps {
  community: Community;
}


export default function AboutCommunityWidget({ community }: AboutCommunityWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          About c/{ community.slug }
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          { community.description }
        </p>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Cake className="h-5 w-5" />
            <span>Created { format(new Date(community.createdAt), "MMM d, yyyy") }</span>
          </div>
          <hr />

          <Link
            href={ `/c/${community.slug}/members` }
            className="flex items-center gap-2 hover:text-primary"
          >
            <Users className="h-5 w-5" />
            <span>{ community.memberCount.toLocaleString() } members</span>
          </Link>
        </div>

        <Button asChild className="w-full mt-2">
          <Link href={ `/c/${community.slug}/members` }>
            View All Members
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
