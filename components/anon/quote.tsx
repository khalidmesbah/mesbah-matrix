import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, StarHalf, TriangleAlertIcon } from "lucide-react";
import { QuoteType } from "@/types";
import useQuotesStore from "@/lib/stores/quotes-store";

export default function Quote({ quote }: { quote: QuoteType }) {
  console.log(`from Quote, render from the server`);
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

export function FavouriteButton({ quote }: { quote: QuoteType }) {
  console.log(`from FavouriteButton, render from the server`);
  const { quotes, toggleFavouriteState } = useQuotesStore();
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

export function NoFavouriteQuotes() {
  console.log(`from NoFavouriteQuotes, render from the server`);
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <StarHalf className="w-12 h-12 text-primary" />
      <h3 className="text-xl font-semibold mt-4">No Favourite Quotes Found</h3>
      <p className="text-muted-foreground text-sm mt-2">
        You haven&apos;t added any quotes to your favourites yet.
      </p>
    </div>
  );
}

export function NoFetchedQuotes() {
  console.log(`from NoFetchedQuotes, render from the server`);
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <TriangleAlertIcon className="w-12 h-12 text-primary" />
      <h3 className="text-xl font-semibold mt-4">Failed to Get Quotes</h3>
      <p className="text-muted-foreground text-sm mt-2">
        There was an error getting the quotes. Please try again later.
      </p>
    </div>
  );
}
