import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from '@/components/header';

function ReelCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
      <div className="flex items-start gap-4 p-4">
        <div className="flex-grow space-y-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="aspect-[9/16] w-full" />
      <div className="grid grid-cols-2 gap-2 p-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-md py-8">
          <div className="space-y-8">
            <ReelCardSkeleton />
            <ReelCardSkeleton />
            <ReelCardSkeleton />
          </div>
        </div>
      </main>
    </div>
  );
}
