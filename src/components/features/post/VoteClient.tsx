"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VoteClientProps {
  itemId: string;
  initialVotes: number;
}

export default function VoteClient({ itemId, initialVotes }: VoteClientProps) {
  const { currentUser, getVoteStatus, handleVote } = useAuth();

  const [ voteCount, setVoteCount ] = useState(initialVotes);
  const initialVote = getVoteStatus(itemId);
  const [ currentVote, setCurrentVote ] = useState(initialVote);

  useEffect(() => {
    setCurrentVote(getVoteStatus(itemId));
  }, [ getVoteStatus, itemId ]);

  const performVote = (newVote: "UP" | "DOWN") => {
    if (!currentUser) {
      toast.error("Please log in to vote.");
      return;
    }

    const oldVote = currentVote;
    let voteChange = 0;

    if (oldVote === newVote) {
      setCurrentVote(null);
      voteChange = newVote === "UP" ? -1 : 1;
    } else if (oldVote === "UP" && newVote === "DOWN") {
      setCurrentVote("DOWN");
      voteChange = -2;
    } else if (oldVote === "DOWN" && newVote === "UP") {
      setCurrentVote("UP");
      voteChange = 2;
    } else {
      setCurrentVote(newVote);
      voteChange = newVote === "UP" ? 1 : -1;
    }

    setVoteCount(prevCount => prevCount + voteChange);
    handleVote(itemId, newVote);
  };

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-0">
      <Button
        onClick={ () => performVote("UP") }
        variant="ghost"
        size="sm"
        aria-label="Upvote"
      >
        <ArrowBigUp
          className={
            cn("h-6 w-6", currentVote === "UP" && "fill-primary text-primary")
          }
        />
      </Button>
      <span className="text-lg font-bold">{ voteCount }</span>
      <Button
        onClick={ () => performVote("DOWN") }
        variant="ghost"
        size="sm"

        aria-label="Downvote"
      >
        <ArrowBigDown className={
          cn("h-6 w-6", currentVote === "DOWN" && "fill-red-500 text-red-500")
        }
        />
      </Button>
    </div>
  );
} 
