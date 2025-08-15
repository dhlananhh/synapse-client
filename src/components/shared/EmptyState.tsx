"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";


interface EmptyStateProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}


export default function EmptyState({ Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="shadow-none border-dashed">
      <CardContent className="flex flex-col items-center justify-center text-center p-10">
        <div className="bg-secondary p-4 rounded-full mb-4">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>

        <h2 className="text-xl font-semibold">{ title }</h2>
        <p className="mt-2 max-w-sm text-muted-foreground">{ description }</p>

        { action && (
          <Button asChild className="mt-6">
            <Link href={ action.href }>
              { action.label }
            </Link>
          </Button>
        ) }
      </CardContent>
    </Card>
  );
}
