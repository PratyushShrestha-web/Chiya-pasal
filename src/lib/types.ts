export type Song = {
  id: string;
  title: string;
  artist: string;
  audio_url: string;
  artwork_url: string | null;
  sort_order: number;
  created_at: string;
};
