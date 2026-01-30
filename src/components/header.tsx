import { PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { RefreshButton } from './refresh-button';
import { ThemeToggle } from './theme-toggle';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <PlayCircle className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            ReelsDeploy
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <RefreshButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
