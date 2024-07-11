"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  useQotdQuotesQuery,
  useRandomQuotesQuery,
} from "@/lib/hooks/use-quotes-query";
import useQuotesStore from "@/lib/stores/quotes-store";
import { Badge } from "@/components/ui/badge";
import { Masonry } from "react-plock";
import FavouriteQuoteSkeleton from "@/components/quotes/favourite-quote-skeleton";
import { NoQuoteOfTheDay } from "@/components/quotes/no-quote-of-the-day";
import FavouriteButton from "@/components/quotes/anon/favourite-button";
import NoFavouriteQuotes from "@/components/quotes/no-favourite-quotes";
import QuoteSkeleton from "@/components/quotes/quote-skeleton";
import NoFetchedQuotes from "@/components/quotes/no-fetched-quotes";
import Quote from "@/components/quotes/anon/quote";

export default function AnonQuotesPage() {
  const {
    isLoading: isRandomQuotesLoading,
    data: randomQuotes,
    isFetching: isRandomQuotesFetching,
    isError: isErrorOnRandomQuotes,
    isRefetching: isRandomQuotesRefetching,
    isPending: isRandomQuotesPending,
  } = useRandomQuotesQuery();
  const {
    data: qotd,
    isLoading: isQotdLoading,
    isError: isErrorOnQotd,
  } = useQotdQuotesQuery();
  const { favouriteQuotes } = useQuotesStore();

  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-6">
      {isQotdLoading ? (
        <FavouriteQuoteSkeleton />
      ) : !qotd || isErrorOnQotd ? (
        <NoQuoteOfTheDay />
      ) : (
        <section className="flex flex-col items-center text-center gap-4">
          <Badge>Quote of the Day</Badge>

          <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold max-w-3xl">
            &quot;{qotd.content}&quot;
          </blockquote>

          <div className="flex items-center gap-2 justify-between">
            <cite className="text-muted-foreground text-sm font-medium">
              - {qotd.author}
            </cite>
            <FavouriteButton quote={qotd} />
          </div>
        </section>
      )}
      <section>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 flex items-center justify-start gap-2 flex-wrap">
          Favourite Quotes
          <div className="flex-1 flex justify-end">
            <Link
              className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
              href={"/quotes/favourite"}
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
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 flex items-center justify-start gap-2 flex-wrap">
          Random Quotes
          <div className="flex-1 flex justify-end">
            <Button
              variant="outline"
              size={"sm"}
              disabled={isRandomQuotesFetching}
              className="rounded-md flex gap-2 items-center justify-center px-2"
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: ["random-quotes"],
                });
              }}
            >
              <RefreshCcwIcon
                className={`w-5 h-5 text-muted-foreground ${isRandomQuotesFetching && "animate-spin"}`}
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
