'use client';

import FavouriteQuoteSkeleton from '@/components/quotes/favourite-quote-skeleton';
import NoFavouriteQuotes from '@/components/quotes/no-favourite-quotes';
import NoFetchedQuotes from '@/components/quotes/no-fetched-quotes';
import { NoQuoteOfTheDay } from '@/components/quotes/no-quote-of-the-day';
import QuoteSkeleton from '@/components/quotes/quote-skeleton';
import QuotesMasonary from '@/components/quotes/quotes-masonary';
import FavouriteButton from '@/components/quotes/user/favourite-button';
import Quote from '@/components/quotes/user/quote';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { useQuotesQuery, useRandomQuotesQuery } from '@/hooks/use-quotes';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCcwIcon } from 'lucide-react';
import Link from 'next/link';
import { Masonry } from 'react-plock';

export default function UserQuotesPage() {
  const {
    isLoading: isRandomQuotesLoading,
    data: randomQuotes,
    isFetching: isRandomQuotesFetching,
    isError: isErrorOnRandomQuotes,
    isRefetching: isRandomQuotesRefetching,
    isPending: isRandomQuotesPending,
  } = useRandomQuotesQuery();

  const { isLoading: isQuotesLoading, data: quotes, isError: isErrorOnQuotes } = useQuotesQuery();

  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-6">
      {isQuotesLoading ? (
        <FavouriteQuoteSkeleton />
      ) : isErrorOnQuotes || !quotes || !quotes?.qotd ? (
        <NoQuoteOfTheDay />
      ) : (
        <section className="flex flex-col items-center gap-4 text-center">
          <Badge>Quote of the Day</Badge>

          <blockquote className="max-w-3xl text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            &quot;{quotes.qotd.content}&quot;
          </blockquote>

          <div className="flex items-center justify-between gap-2">
            <cite className="text-sm font-medium text-muted-foreground">
              - {quotes.qotd.author}
            </cite>
            <FavouriteButton quote={quotes.qotd} />
          </div>
        </section>
      )}
      <section>
        <h2 className="mb-3 flex flex-wrap items-center justify-start gap-2 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
          Favourite Quotes
          <div className="flex flex-1 justify-end">
            <Link
              className={`${buttonVariants({ variant: 'outline', size: 'sm' })}`}
              href={'/quotes/favourite'}
            >
              Show All
            </Link>
          </div>
        </h2>
        {isQuotesLoading ? (
          <QuotesMasonary />
        ) : isErrorOnQuotes || !quotes || !quotes.favourite || quotes.favourite.length === 0 ? (
          <NoFavouriteQuotes />
        ) : (
          <Masonry
            items={quotes.favourite.slice(0, 6)}
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
        <h2 className="mb-3 flex flex-wrap items-center justify-start gap-2 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
          Random Quotes
          <div className="flex flex-1 justify-end">
            <Button
              variant="outline"
              size={'sm'}
              disabled={isRandomQuotesFetching}
              className="flex items-center justify-center gap-2 rounded-md px-2"
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: ['random-quotes'],
                });
              }}
            >
              <RefreshCcwIcon
                className={`h-5 w-5 text-muted-foreground ${isRandomQuotesFetching && 'animate-spin'}`}
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
