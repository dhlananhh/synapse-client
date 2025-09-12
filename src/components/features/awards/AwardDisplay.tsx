"use client";


import React from "react";
import { Award } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export default function AwardDisplay({ awards }: { awards: Award[] }) {
  if (!awards || awards.length === 0) {
    return null;
  }

  const awardCounts = awards.reduce((acc, award) => {
    acc[ award.id ] = (acc[ award.id ] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueAwards = Object.keys(awardCounts).map(awardId =>
    awards.find(a => a.id === awardId)!
  );

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <TooltipProvider delayDuration={ 100 }>
        {
          uniqueAwards.map((award) => (
            <Tooltip key={ award.id }>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 p-1 bg-secondary rounded-full cursor-pointer">
                  <award.Icon className="h-4 w-4 text-amber-500" />
                  {
                    awardCounts[ award.id ] > 1 && (
                      <span className="text-xs font-bold">
                        { awardCounts[ award.id ] }
                      </span>
                    )
                  }
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-bold">
                  { award.name }
                </p>
                <p className="text-xs text-muted-foreground">
                  { award.description }
                </p>
              </TooltipContent>
            </Tooltip>
          ))
        }
      </TooltipProvider>
    </div>
  );
}
