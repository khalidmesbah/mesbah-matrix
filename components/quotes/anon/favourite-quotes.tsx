'use client';

import Quote from '@/components/quotes/anon/quote';
import NoFavouriteQuotes from '@/components/quotes/no-favourite-quotes';
import useQuotesStore from '@/stores/quotes';
import { Masonry } from 'react-plock';

export default function AnonFavouriteQuotesPage() {
  const { favouriteQuotes } = useQuotesStore();

  return favouriteQuotes.length ? (
    <Masonry
      items={favouriteQuotes}
      config={{
        columns: [1, 2, 3],
        gap: [8, 8, 8],
        media: [600, 850, 1024],
      }}
      render={(item) => <Quote quote={item} key={item._id} />}
    />
  ) : (
    <NoFavouriteQuotes />
  );
}
