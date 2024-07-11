"use client";

import { QuoteType } from "@/types";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import useQuotesStore from "@/lib/stores/quotes-store";

export default function FavouriteButton({ quote }: { quote: QuoteType }) {
  const { favouriteQuotes, toggleFavouriteState } = useQuotesStore();
  const isFavourite = favouriteQuotes.map((q) => q._id).includes(quote._id);

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => toggleFavouriteState({ quote })}
    >
      <Star className={`${isFavourite && "fill-foreground"}`} />
    </Button>
  );
}
