'use client';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function RefreshButton() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    // Next.js router.refresh doesn't have a callback,
    // so we optimistically reset the state after a short delay.
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`}
          />
          <span className="sr-only">Refresh feed</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Refresh feed</p>
      </TooltipContent>
    </Tooltip>
  );
}
