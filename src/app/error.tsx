'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { AppHeader } from '@/components/header';

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
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex flex-1 items-center justify-center">
        <div className="container mx-auto max-w-md text-center">
          <div className="rounded-2xl border bg-card p-8 shadow-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-foreground">
              Something went wrong!
            </h2>
            <p className="mt-2 text-muted-foreground">
              We couldn't load the reels. Please try again.
            </p>
            <Button onClick={() => reset()} className="mt-6">
              Try again
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
