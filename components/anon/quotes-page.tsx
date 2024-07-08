"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  FilterIcon,
  ListOrderedIcon,
  RefreshCcwIcon,
  SearchIcon,
  Star,
} from "lucide-react";
import { cache, SVGProps, useEffect } from "react";
import { ActionResponse, QuotesType, QuoteType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRandomQuotesQuery } from "@/lib/hooks/use-quotes-query";
import useQuotesStore from "@/lib/stores/quotes-store";
type IconProps = SVGProps<SVGSVGElement>;

// TODO: add share button
// TODO: add copy button
// TODO: add quote component
// TODO: user select none
// TODO: create a custom quote

export default function AnonQuotesPage() {
  const {
    isLoading: isRandomQuotesLoading,
    data: randomQuotes,
    isFetching: isRandomQuotesFetching,
    isError: isErrorOnRandomQuotes,
  } = useRandomQuotesQuery();
  const { quotes, toggleFavouriteState } = useQuotesStore();
  const queryClient = useQueryClient();

  if (isRandomQuotesLoading) return <h1>loading random quotes...</h1>;
  if (isErrorOnRandomQuotes) return <h1>error fetching random quotes...</h1>;

  const getFavouriteState = (id: string) => {
    if (!quotes) return false;
    return quotes.favourite.map((q) => q._id).includes(id);
  };

  return (
    <div className="flex flex-col">
      <main className="container mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 lg:space-y-20">
        {quotes?.qotd && (
          <section>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary rounded-full px-4 py-1 text-primary-foreground text-sm font-medium">
                Quote of the Day
              </div>
              <blockquote className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-3xl">
                &quot;{quotes.qotd.content}
                &quot;
              </blockquote>

              <div className="flex items-center gap-2 justify-between mt-4">
                <cite className="text-muted-foreground text-sm font-medium">
                  - {quotes.qotd.author}
                </cite>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    toggleFavouriteState({
                      quote: quotes.qotd,
                      isFavourite: getFavouriteState(quotes.qotd._id),
                    });
                  }}
                >
                  <Star
                    className={`${getFavouriteState(quotes.qotd._id) && "fill-foreground"}`}
                  />
                </Button>
              </div>
            </div>
          </section>
        )}
        {quotes?.favourite ? (
          <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 flex items-center justify-between">
              Favourite Quotes
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={"/quotes/favourite"}
              >
                Show All
              </Link>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.favourite.slice(0, 3).map((q: QuoteType) => {
                return (
                  <Quote
                    quote={q}
                    isFavourite={getFavouriteState(q._id)}
                    key={q._id}
                    toggleFavouriteState={toggleFavouriteState}
                  />
                );
              })}
            </div>
          </section>
        ) : (
          <p>There is no favourite qutoes</p>
        )}
        {randomQuotes && (
          <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 flex items-center justify-between">
              Random Quotes
              <Button
                variant="outline"
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
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomQuotes?.map((q: QuoteType) => (
                <Quote
                  quote={q}
                  isFavourite={getFavouriteState(q._id)}
                  key={q._id}
                  toggleFavouriteState={toggleFavouriteState}
                />
              ))}
            </div>
          </section>
        )}
        {/*
        <section>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Explore Quotes
              </h2>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm">
                      <FilterIcon className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Inspirational
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Motivational
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Funny</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm">
                      <ListOrderedIcon className="w-4 h-4 mr-2" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value="popular">
                      <DropdownMenuRadioItem value="popular">
                        Popular
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="newest">
                        Newest
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="oldest">
                        Oldest
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for quotes..."
                className="pl-12 pr-4 py-3 rounded-lg bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              temp
            </div>
          </div>
        </section>
          */}
      </main>
    </div>
  );
}

// FIX: when exporting :=> 1. Props must be serializable for components in the "use client" entry file, "toggleFavouriteState" is invalid. [71007]
function Quote({
  quote,
  isFavourite,
  toggleFavouriteState,
}: {
  quote: QuoteType;
  isFavourite: boolean;
  toggleFavouriteState: (data: {
    quote: QuoteType;
    isFavourite: boolean;
  }) => void;
}) {
  return (
    <Card className="p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <blockquote className="text-xl font-medium">
        &quot;{quote.content}&quot;
      </blockquote>
      <div className="flex items-center gap-1 justify-between mt-4">
        <cite className="text-muted-foreground text-sm font-medium">
          - {quote.author}
        </cite>
        <Button
          variant={"ghost"}
          onClick={() => toggleFavouriteState({ quote, isFavourite })}
        >
          <Star className={`${isFavourite && "fill-foreground"}`} />
        </Button>
      </div>
    </Card>
  );
}
