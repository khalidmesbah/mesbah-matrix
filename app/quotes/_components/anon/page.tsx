'use client';

import { useQueryClient } from '@tanstack/react-query';
import { RefreshCcwIcon } from 'lucide-react';
import Link from 'next/link';
import { Masonry } from 'react-plock';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { useQotdQuotesQuery, useRandomQuotesQuery } from '@/hooks/use-quotes';
import useQuotesStore from '@/stores/quotes';
import FavouriteQuoteSkeleton from '../favourite-quote-skeleton';
import NoFavouriteQuotes from '../no-favourite-quotes';
import NoFetchedQuotes from '../no-fetched-quotes';
import { NoQuoteOfTheDay } from '../no-quote-of-the-day';
import QuoteSkeleton from '../quote-skeleton';
import FavouriteButton from './favourite-button';
import Quote from './quote';

export default function AnonQuotesPage() {
  const {
    isLoading: isRandomQuotesLoading,
    data: randomQuotes,
    isFetching: isRandomQuotesFetching,
    isError: isErrorOnRandomQuotes,
    isRefetching: isRandomQuotesRefetching,
    isPending: isRandomQuotesPending,
  } = useRandomQuotesQuery();
  const { data: qotd, isLoading: isQotdLoading, isError: isErrorOnQotd } = useQotdQuotesQuery();
  const { favouriteQuotes } = useQuotesStore();

  const queryClient = useQueryClient();

  return (
    <div className='flex flex-col gap-6'>
      {isQotdLoading ? (
        <FavouriteQuoteSkeleton />
      ) : !qotd || isErrorOnQotd ? (
        <NoQuoteOfTheDay />
      ) : (
        <section className='flex flex-col items-center gap-4 text-center'>
          <Badge>Quote of the Day</Badge>

          <blockquote className='max-w-3xl text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl'>
            &quot;{qotd.content}&quot;
          </blockquote>

          <div className='flex items-center justify-between gap-2'>
            <cite className='text-muted-foreground text-sm font-medium'>- {qotd.author}</cite>
            <FavouriteButton quote={qotd} />
          </div>
        </section>
      )}
      <section>
        <h2 className='mb-3 flex flex-wrap items-center justify-start gap-2 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl'>
          Favourite Quotes
          <div className='flex flex-1 justify-end'>
            <Link
              className={`${buttonVariants({ variant: 'outline', size: 'sm' })}`}
              href={'/quotes/favourite'}
            >
              Show All
            </Link>
          </div>
        </h2>
        {favouriteQuotes.length === 0 ? (
          <NoFavouriteQuotes />
        ) : (
          <Masonry
            items={favouriteQuotes.slice(0, 6)}
            config={{
              columns: [1, 2, 3],
              gap: [8, 8, 8],
              media: [600, 850, 1024],
            }}
            render={(quote) => <Quote quote={quote} key={quote._id} />}
          />
        )}
      </section>
      <section>
        <h2 className='mb-3 flex flex-wrap items-center justify-start gap-2 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl'>
          Random Quotes
          <div className='flex flex-1 justify-end'>
            <Button
              variant='outline'
              size={'sm'}
              disabled={isRandomQuotesFetching}
              className='flex items-center justify-center gap-2 rounded-md px-2'
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: ['random-quotes'],
                });
              }}
            >
              <RefreshCcwIcon
                className={`text-muted-foreground h-5 w-5 ${isRandomQuotesFetching && 'animate-spin'}`}
              />
              <span>Fetch New Quotes</span>
            </Button>
          </div>
        </h2>
        {isRandomQuotesLoading ||
        isRandomQuotesFetching ||
        isRandomQuotesPending ||
        isRandomQuotesRefetching ? (
          <Masonry
            items={Array.from({ length: 7 }).map((_, i) => i)}
            config={{
              columns: [1, 2, 3],
              gap: [8, 8, 8],
              media: [600, 850, 1024],
            }}
            render={(index) => <QuoteSkeleton key={index} />}
          />
        ) : !randomQuotes || isErrorOnRandomQuotes ? (
          <NoFetchedQuotes />
        ) : (
          <Masonry
            items={randomQuotes}
            config={{
              columns: [1, 2, 3],
              gap: [8, 8, 8],
              media: [600, 850, 1024],
            }}
            render={(quote) => <Quote quote={quote} key={quote._id} />}
          />
        )}
      </section>
    </div>
  );
}
