import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReelById } from '@/lib/data';
import { ArrowLeft, Eye, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DeployButton } from '@/components/deploy-button';

interface ReelDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ReelDetailsPage({ params }: ReelDetailsPageProps) {
  const reel = await getReelById(params.id);

  if (!reel) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0">
        <Image
          src={reel.media.url}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-30 blur-sm"
        />
      </div>

      <div className="relative z-10 flex h-screen flex-col">
        <header className="flex items-center justify-between p-4">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feed
            </Link>
          </Button>
        </header>

        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={reel.media.url}
                alt={`Reel from ${reel.brandName}`}
                fill
                className="object-cover"
                data-ai-hint={reel.media.aiHint}
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </div>
          </div>
        </main>
        
        <footer className="p-4">
          <Card className="border-0 bg-black/50 text-primary-foreground backdrop-blur-lg">
            <CardHeader>
              <CardTitle>{reel.brandName}</CardTitle>
              <CardDescription className="text-gray-300">{reel.category} - {reel.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-bold">{reel.stats.views}</p>
                      <p className="text-xs text-gray-400">Views</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-bold">{reel.stats.ctr}</p>
                      <p className="text-xs text-gray-400">Click-Through Rate</p>
                    </div>
                  </div>
                </div>
              <DeployButton buttonText="Deploy Now" variant="accent" className="w-full font-bold" reelName={reel.brandName} />
            </CardContent>
          </Card>
        </footer>
      </div>
    </div>
  );
}
