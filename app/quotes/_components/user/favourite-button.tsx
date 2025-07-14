'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuotesMutate, useQuotesQuery } from '@/hooks/use-quotes';
import type { QuoteT } from '@/types/quote';

export default function FavouriteButton({ quote }: { quote: QuoteT }) {
  const { data: quotes } = useQuotesQuery();
  const { mutate } = useQuotesMutate();

  let newQuotes = structuredClone(quotes);
  if (!newQuotes) newQuotes = {};
  if (!newQuotes?.favourite) newQuotes.favourite = [];
  const isFavourite = newQuotes?.favourite.map((q) => q._id).includes(quote._id);

  return (
    <Button variant={'ghost'} size={'icon'} onClick={() => mutate({ quote })}>
      <Star className={`${isFavourite && 'fill-foreground'}`} />
    </Button>
  );
}
