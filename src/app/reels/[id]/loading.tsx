import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Eye, MousePointerClick } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReelDetailLoading() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 bg-gray-900 opacity-30 blur-sm" />

      <div className="relative z-10 flex h-screen flex-col">
        <header className="flex items-center justify-between p-4">
          <Button asChild variant="ghost" className="pointer-events-none text-white/50">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feed
            </Link>
          </Button>
        </header>

        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <Skeleton className="aspect-[9/16] w-full rounded-2xl" />
          </div>
        </main>
        
        <footer className="p-4">
          <Card className="border-0 bg-black/50 text-primary-foreground backdrop-blur-lg">
            <CardHeader>
              <Skeleton className="h-7 w-1/2" />
              <Skeleton className="mt-2 h-4 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <div>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="mt-1 h-3 w-10" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MousePointerClick className="h-5 w-5 text-primary" />
                  <div>
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="mt-1 h-3 w-24" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </footer>
      </div>
    </div>
  );
}
