"use client";


import React from "react";
import { User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/UserAvatar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";


interface MemberCardProps {
  member: User & { role?: string };
}


export default function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="hover:bg-secondary/50 transition-colors">
      <CardContent className="p-4 flex items-center justify-between">

        <Link
          href={ `/u/${member.username}` }
          className="flex items-center gap-4 group"
        >
          <UserAvatar user={ member } className="h-12 w-12" />
          <div>
            <p className="font-bold group-hover:underline">
              { member.displayName || member.username }
            </p>
            <p className="text-sm text-muted-foreground">
              u/{ member.username }
            </p>
          </div>
        </Link>

        {
          member.role === "Moderator" && (
            <Badge variant="outline">{ member.role }</Badge>
          )
        }
      </CardContent>
    </Card>
  )
}
