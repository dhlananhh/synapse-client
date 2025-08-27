"use client"

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServerCrash, Home } from "lucide-react";


export default function NotFoundDisplay() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="bg-secondary p-6 rounded-full mb-6">
        <ServerCrash className="h-16 w-16 text-primary" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight">
        404 - Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground">
        Oops! The page you are looking for does not exist.
        It might have been moved, deleted, or you may have typed the URL incorrectly.
      </p>

      <Button asChild className="mt-8">
        <Link href="/">
          <Home className="mr-1 h-5 w-5" />
          Go back to Homepage
        </Link>
      </Button>
    </div>
  );
}
