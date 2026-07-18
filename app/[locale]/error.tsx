"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-wider text-destructive">
          Error
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-muted-foreground">
          {error.message || "An unexpected error occurred"}
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {error.digest}
          </p>
        )}
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={reset} variant="gradient">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
