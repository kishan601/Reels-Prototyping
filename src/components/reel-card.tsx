'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Tag, MoreVertical, Heart, Share2, Flag } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { Reel } from '@/lib/types';
import { DeployButton } from './deploy-button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ReelCardProps {
  reel: Reel;
}

export function ReelCard({ reel }: ReelCardProps) {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    toast({
      title: newLikedState ? 'Reel Liked' : 'Reel Unliked',
      description: `You've ${
        newLikedState ? 'liked' : 'unliked'
      } the "${reel.brandName}" reel.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/reels/${reel.id}`);
    toast({
      title: 'Link Copied',
      description: 'Reel link copied to your clipboard.',
    });
  };

  const handleReport = () => {
    toast({
      title: 'Reel Reported',
      description: `Thanks for your feedback on the "${reel.brandName}" reel.`,
      variant: 'destructive',
    });
  };

  return (
    <>
      <Card className="overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="flex-row items-center gap-4 p-4">
          <Avatar>
            <AvatarFallback>
              {reel.brandName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-lg font-bold">{reel.brandName}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-x-2 text-sm">
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" /> {reel.category}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {reel.location}
              </span>
            </CardDescription>
          </div>
          <div className="flex shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleLike}
                >
                  <Heart
                    className={cn(
                      'h-4 w-4',
                      isLiked && 'fill-destructive text-destructive'
                    )}
                  />
                  <span className="sr-only">Like</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLiked ? 'Unlike' : 'Like'}</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowReportDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Report</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative aspect-[9/16] w-full bg-muted">
            <Image
              src={reel.media.url}
              alt={`Reel from ${reel.brandName}`}
              fill
              className="object-cover"
              data-ai-hint={reel.media.aiHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2 p-2">
          <Button asChild variant="secondary" className="font-semibold">
            <Link href={`/reels/${reel.id}`}>View Details</Link>
          </Button>
          <DeployButton
            buttonText="Deploy"
            variant="accent"
            className="font-semibold"
            reelName={reel.brandName}
          />
        </CardFooter>
      </Card>
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to report this reel?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Reporting helps us keep the
              platform safe. We will review this reel from "{reel.brandName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleReport();
                setShowReportDialog(false);
              }}
            >
              Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
