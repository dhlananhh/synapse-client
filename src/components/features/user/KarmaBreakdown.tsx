"use client";


import React from "react";
import { User } from "@/types";
import { Flame, MessageCircle } from "lucide-react";


interface KarmaBreakdownProps {
  karma: User[ "karma" ];
}


export default function KarmaBreakdown({ karma }: KarmaBreakdownProps) {
  return (
    <div className="p-4 space-y-3">
      <h4 className="font-semibold text-center">
        Karma Breakdown
      </h4>
      <div className="flex items-center gap-3">
        <Flame className="h-5 w-5 text-primary" />
        <div>
          <p className="font-semibold">
            { karma.post.toLocaleString() }
          </p>
          <p className="text-xs text-muted-foreground">
            Post Karma
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MessageCircle className="h-5 w-5 text-primary" />
        <div>
          <p className="font-semibold">
            { karma.comment.toLocaleString() }
          </p>
          <p className="text-xs text-muted-foreground">
            Comment Karma
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground pt-2 border-t">
        Karma is earned when your posts and comments are upvoted by the community.
      </p>
    </div>
  );
}
