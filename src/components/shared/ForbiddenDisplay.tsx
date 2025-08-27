"use client";


import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Home, ArrowBigLeft } from "lucide-react";


interface ForbiddenDisplayProps {
  title?: string;
  description?: string;
}


export default function ForbiddenDisplay({
  title = "Access Denied",
  description = "You do not have the necessary permissions to view this page or resource."
}: ForbiddenDisplayProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="bg-destructive/10 p-6 rounded-full mb-6">
        <Lock className="h-16 w-16 text-destructive" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-destructive">
        { title }
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground">
        { description }
      </p>

      <div className="mt-8 flex gap-4">
        <Button
          onClick={ () => router.back() }
          variant="outline"
        >
          <ArrowBigLeft className="mr-1 h-5 w-5" />
          Go Back
        </Button>
        <Button asChild>
          <Link href="/">
            <Home className="mr-1 h-5 w-5" /> Go to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
