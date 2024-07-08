"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useQuotesStore from "@/lib/stores/quotes-store";
import { QuoteType } from "@/types";
import { Star } from "lucide-react";

export default function AnonFavouriteQuotesPage() {
  const { quotes, toggleFavouriteState } = useQuotesStore();

  const getFavouriteState = (id: string) => {
    if (!quotes) return false;
    return quotes.favourite.map((q) => q._id).includes(id);
  };

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes?.favourite.map((q: QuoteType) => {
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
  );
}

function Quote({
  quote,
  isFavourite,
  toggleFavouriteState,
}: {
  quote: QuoteType;
  isFavourite: boolean;
  toggleFavouriteState: ({
    quote,
    isFavourite,
  }: {
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
