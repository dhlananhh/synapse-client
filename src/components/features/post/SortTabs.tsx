"use client";

import { SortType } from "@/libs/api";
import { Button } from "@/components/ui/button";
import { Flame, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/libs/utils";

interface SortTabsProps {
  currentSort: SortType;
  onSortChange: (newSort: SortType) => void;
}

const sortOptions: { value: SortType, label: string, Icon: React.ElementType }[] = [
  { value: "hot", label: "What's Hot", Icon: Flame },
  { value: "new", label: "What's New", Icon: Sparkles },
  { value: "top", label: "Top Voted", Icon: TrendingUp },
]

export default function SortTabs({ currentSort, onSortChange }: SortTabsProps) {
  return (
    <div className="mb-4 bg-card p-1 rounded-lg border flex items-center gap-1 overflow-x-auto scrollbar-hide">
      { sortOptions.map(({ value, label, Icon }) => (
        <Button
          key={ value }
          onClick={ () => onSortChange(value) }
          variant={ currentSort === value ? "default" : "ghost" }
          className={ cn(
            "flex-1 min-w-[90px] flex items-center justify-center px-2 py-2 rounded-md transition-all",
            "md:w-auto md:px-4",
            currentSort === value
              ? "bg-primary text-primary-foreground font-semibold shadow"
              : "hover:bg-muted"
          ) }
        >
          <Icon className="h-5 w-5 mr-1 md:mr-2" />
          <span className="hidden md:inline">{ label }</span>
          <span className="md:hidden">{ value.charAt(0).toUpperCase() + value.slice(1) }</span>
        </Button>
      )) }
    </div>
  )
}
