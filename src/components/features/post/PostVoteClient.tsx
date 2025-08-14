"use client"

import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostVoteClientProps {
  initialVotes: number;
}

export default function PostVoteClient({ initialVotes }: PostVoteClientProps) {
  const [ votes, setVotes ] = useState(initialVotes);
  const [ voteStatus, setVoteStatus ] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (type === "up") {
      if (voteStatus === "up") {
        // Un-upvote
        setVoteStatus(null);
        setVotes(v => v - 1);
      } else {
        // Apply upvote
        setVotes(v => v + (voteStatus === "down" ? 2 : 1));
        setVoteStatus("up");
      }
    } else { // type === "down"
      if (voteStatus === "down") {
        // Un-downvote
        setVoteStatus(null);
        setVotes(v => v + 1);
      } else {
        // Apply downvote
        setVotes(v => v - (voteStatus === "up" ? 2 : 1));
        setVoteStatus("down");
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2 pt-2">
      <Button onClick={ () => handleVote("up") } variant="ghost" size="sm">
        <ArrowBigUp className={ cn("h-6 w-6", voteStatus === "up" && "fill-primary text-primary") } />
      </Button>
      <span className="text-lg font-bold">{ votes }</span>
      <Button onClick={ () => handleVote("down") } variant="ghost" size="sm">
        <ArrowBigDown className={ cn("h-6 w-6", voteStatus === "down" && "fill-red-500 text-red-500") } />
      </Button>
    </div>
  );
}
