'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useQuotesStore from '@/stores/quotes';
import type { QuoteT } from '@/types/quote';

export default function FavouriteButton({ quote }: { quote: QuoteT }) {
  const { favouriteQuotes, toggleFavouriteState } = useQuotesStore();
  const isFavourite = favouriteQuotes.map((q) => q._id).includes(quote._id);

  return (
    <Button variant={'ghost'} size={'icon'} onClick={() => toggleFavouriteState({ quote })}>
      <Star className={`${isFavourite && 'fill-foreground'}`} />
    </Button>
  );
}
