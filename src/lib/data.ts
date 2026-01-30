import { type Reel } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const reelsData: Omit<Reel, 'id' | 'media'>[] = [
  {
    brandName: 'Summit Seekers',
    category: 'Adventure Gear',
    location: 'Zürich, Switzerland',
    stats: {
      views: '1.2M',
      ctr: '4.8%',
    },
  },
  {
    brandName: 'Gourmet Grills',
    category: 'Food & Beverage',
    location: 'Austin, Texas',
    stats: {
      views: '850K',
      ctr: '6.2%',
    },
  },
  {
    brandName: 'Urban Edge',
    category: 'Fashion',
    location: 'Tokyo, Japan',
    stats: {
      views: '2.5M',
      ctr: '3.1%',
    },
  },
  {
    brandName: 'Code & Coffee',
    category: 'Tech & Startups',
    location: 'Berlin, Germany',
    stats: {
      views: '675K',
      ctr: '5.5%',
    },
  },
];

const allReels: Reel[] = reelsData.map((reel, index) => {
  const placeholder = PlaceHolderImages[index % PlaceHolderImages.length];
  return {
    ...reel,
    id: placeholder.id,
    media: {
      type: 'image',
      url: placeholder.imageUrl,
      aiHint: placeholder.imageHint,
    },
  };
});

export async function getReels(): Promise<Reel[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return allReels;
}

export async function getReelById(id: string): Promise<Reel | undefined> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return allReels.find(reel => reel.id === id);
}
