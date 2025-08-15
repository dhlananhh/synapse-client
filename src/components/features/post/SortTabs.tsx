"use client";

import { SortType } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Flame, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="mb-4 bg-card p-2 rounded-md border flex items-center gap-2">
      {
        sortOptions.map(({ value, label, Icon }) => (
          <Button
            key={ value }
            onClick={ () => onSortChange(value) }
            variant={ currentSort === value ? "default" : "ghost" }
            className="w-full justify-start md:w-auto"
          >
            <Icon className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">{ label }</span>
            <span className="md:hidden">{ value.charAt(0).toUpperCase() + value.slice(1) }</span>
          </Button>
        ))
      }
    </div>
  )
}
