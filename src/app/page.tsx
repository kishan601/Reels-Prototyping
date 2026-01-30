'use client';

import { useState, useEffect, useMemo } from 'react';
import { getReels } from '@/lib/data';
import { ReelCard } from '@/components/reel-card';
import { AppHeader } from '@/components/header';
import { type Reel } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

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

export default function HomePage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function loadReels() {
      // The loading component will be shown via suspense,
      // but we still need to manage a loading state for when this component is hydrated.
      setLoading(true);
      const fetchedReels = await getReels();
      setReels(fetchedReels);
      setLoading(false);
    }
    loadReels();
  }, []);

  const categories = useMemo(() => {
    if (reels.length === 0) return [];
    const allCategories = reels.map((reel) => reel.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [reels]);

  const filteredReels = useMemo(() => {
    return reels.filter((reel) => {
      const matchesCategory =
        selectedCategory === 'all' || reel.category === selectedCategory;
      const matchesSearch = reel.brandName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [reels, searchTerm, selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-md py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Search by brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {loading ? (
            <div className="space-y-8">
              <ReelCardSkeleton />
              <ReelCardSkeleton />
              <ReelCardSkeleton />
            </div>
          ) : (
            <div className="space-y-8">
              {filteredReels.length > 0 ? (
                  filteredReels.map((reel) => (
                      <ReelCard key={reel.id} reel={reel} />
                  ))
              ) : (
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <p className="text-muted-foreground">No reels found matching your criteria.</p>
                    </CardContent>
                  </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
