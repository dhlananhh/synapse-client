"use client";


import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";


export default function VerifyEmailForm() {
  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader className="items-center text-center">
        <Skeleton className="h-10 w-10 rounded-full mb-4" />
        <Skeleton className="h-7 w-48" />
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Skeleton className="h-12 w-64" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
