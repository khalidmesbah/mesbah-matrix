'use client';

import NoFavouriteQuotes from '@/components/quotes/no-favourite-quotes';
import QuoteSkeleton from '@/components/quotes/quote-skeleton';
import Quote from '@/components/quotes/user/quote';
import { useQuotesQuery } from '@/hooks/use-quotes';
import { QuoteT } from '@/types/quote';
import { Masonry } from 'react-plock';

export default function UserFavouriteQuotesPage() {
  const { isLoading, data: quotes, isError } = useQuotesQuery();

  return isLoading ? (
    <Masonry
      items={Array.from({ length: 7 }).map((_, i) => i)}
      config={{
        columns: [1, 2, 3],
        gap: [8, 8, 8],
        media: [600, 850, 1024],
      }}
      render={(index) => <QuoteSkeleton key={index} />}
    />
  ) : !quotes || !quotes.favourite || isError || quotes.favourite.length === 0 ? (
    <NoFavouriteQuotes />
  ) : (
    <Masonry
      items={quotes.favourite}
      config={{
        columns: [1, 2, 3],
        gap: [8, 8, 8],
        media: [600, 850, 1024],
      }}
      render={(item: QuoteT) => <Quote quote={item} key={item._id} />}
    />
  );
}
