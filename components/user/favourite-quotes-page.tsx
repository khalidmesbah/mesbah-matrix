"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuotesMutate, useQuotesQuery } from "@/lib/hooks/use-quotes-query";
import { QuoteType } from "@/types";
import { Star } from "lucide-react";
import { Masonry } from "../masonary";
import useQuotesStore from "@/lib/stores/quotes-store";

export default function UserFavouriteQuotesPage() {
  const {
    isLoading: isQuotesLoading,
    data: quotes,
    isError: isErrorOnQuotes,
  } = useQuotesQuery();
  // const { mutate } = useQuotesMutate();

  if (isQuotesLoading) return <h1>loading...</h1>;

  if (isErrorOnQuotes) return <h1>error fetching quotes...</h1>;

  return (
    <Masonry
      items={quotes?.favourite || []}
      config={{
        columns: [1, 2, 3, 4],
        gap: [8, 8, 8, 8],
        media: [600, 900, 1200, 1500],
      }}
      render={(item) => <Quote quote={item} key={item._id} />}
    />
  );
}

function Quote({ quote }: { quote: QuoteType }) {
  return (
    <Card className="p-2 rounded-md shadow-md">
      <blockquote className="text-xl font-medium">
        &quot;{quote.content}&quot;
      </blockquote>
      <div className="flex items-center gap-2 justify-between mt-4">
        <cite className="text-muted-foreground text-sm font-medium">
          - {quote.author}
        </cite>
        <FavouriteButton quote={quote} />
      </div>
    </Card>
  );
}

function FavouriteButton({ quote }: { quote: QuoteType }) {
  const { data: quotes } = useQuotesQuery();
  const { mutate: toggleFavouriteState } = useQuotesMutate();

  if (!quotes?.favourite) return;
  const isFavourite = quotes.favourite.map((q) => q._id).includes(quote._id);

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => toggleFavouriteState({ quote, isFavourite })}
    >
      <Star className={`${isFavourite && "fill-foreground"}`} />
    </Button>
  );
}
