'use client';

import { Button } from '@/components/ui/button';
import useQuotesStore from '@/lib/stores/quotes-store';
import { QuoteType } from '@/types';
import { Star } from 'lucide-react';

export default function FavouriteButton({ quote }: { quote: QuoteType }) {
  const { favouriteQuotes, toggleFavouriteState } = useQuotesStore();
  const isFavourite = favouriteQuotes.map((q) => q._id).includes(quote._id);

  return (
    <Button variant={'ghost'} size={'icon'} onClick={() => toggleFavouriteState({ quote })}>
      <Star className={`${isFavourite && 'fill-foreground'}`} />
    </Button>
  );
}
