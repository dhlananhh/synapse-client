"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showGoHomeButton?: boolean;
}

export default function ErrorDisplay({
  title = "Something went wrong",
  message,
  onRetry,
  showGoHomeButton = true
}: ErrorDisplayProps) {
  const router = useRouter();

  return (
    <Card className="my-10 border-destructive">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-destructive/10 p-4 rounded-full mb-4">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        <h2 className="text-xl font-semibold text-destructive">{ title }</h2>
        <p className="mt-2 text-muted-foreground">{ message }</p>

        <div className="mt-6 flex gap-4">
          {
            onRetry && (
              <Button onClick={ onRetry } variant="destructive">
                Try Again
              </Button>
            )
          }

          {
            showGoHomeButton && (
              <Button variant="secondary" onClick={ () => router.push("/") }>
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
            )
          }
        </div>
      </CardContent>
    </Card>
  )
}
