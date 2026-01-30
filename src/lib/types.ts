export interface Reel {
  id: string;
  brandName: string;
  category: string;
  location: string;
  media: {
    type: 'image' | 'video';
    url: string;
    aiHint: string;
  };
  stats: {
    views: string;
    ctr: string;
  };
}
