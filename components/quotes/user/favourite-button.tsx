"use client";

import { useQuotesQuery } from "@/lib/hooks/use-quotes-query";
import { QuotesType, QuoteType } from "@/types";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavouriteState } from "@/lib/server-actions/quotes-actions";

export default function FavouriteButton({ quote }: { quote: QuoteType }) {
  const queryClient = useQueryClient();
  const { data: quotes } = useQuotesQuery();
  const { mutate } = useMutation({
    mutationFn: async ({ quote }: { quote: QuoteType }) =>
      toggleFavouriteState(quote),
    mutationKey: ["update-quotes"],
    onMutate: async ({ quote }) => {
      await queryClient.cancelQueries({ queryKey: ["quotes"] });

      const previousQuotes = queryClient.getQueryData(["quotes"]);

      queryClient.setQueryData(["quotes"], (old: QuotesType) => {
        const newQuotes = structuredClone(old);
        console.log(
          `before mutation`,
          newQuotes.favourite?.map((e) => e._id),
        );
        if (!newQuotes.favourite) newQuotes.favourite = [];
        const isFavourite = newQuotes.favourite
          .map((q) => q._id)
          .includes(quote._id);
        if (isFavourite) {
          newQuotes.favourite = newQuotes.favourite.filter(
            (q) => q._id !== quote._id,
          );
        } else {
          newQuotes.favourite.push(quote);
        }
        console.log(
          `after mutation`,
          newQuotes.favourite?.map((e) => e._id),
        );
        return newQuotes;
      });

      return { previousQuotes };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(["quotes"], context?.previousQuotes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });

  let newQuotes = structuredClone(quotes);
  if (!newQuotes) newQuotes = {};
  if (!newQuotes?.favourite) newQuotes.favourite = [];
  const isFavourite = newQuotes?.favourite
    .map((q) => q._id)
    .includes(quote._id);

  return (
    <Button variant={"ghost"} size={"icon"} onClick={() => mutate({ quote })}>
      <Star className={`${isFavourite && "fill-foreground"}`} />
    </Button>
  );
}
