import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getQuotes,
  getRandomQuotes,
  toggleFavouriteState,
} from "@/lib/server-actions/quotes-actions";
import { QuotesType, QuoteType } from "@/types";

export const useRandomQuotesQuery = () =>
  useQuery({
    queryKey: ["random-quotes"],
    queryFn: () => getRandomQuotes(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

export const useQuotesQuery = () =>
  useQuery({
    queryKey: ["quotes"],
    queryFn: () => getQuotes(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

export const useQuotesMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      quote,
      isFavourite,
    }: {
      quote: QuoteType;
      isFavourite: boolean;
    }) => toggleFavouriteState(quote, isFavourite),
    onMutate: async ({ quote, isFavourite }) => {
      await queryClient.cancelQueries({ queryKey: ["quotes"] });

      const previousQuotes = queryClient.getQueryData(["quotes"]);
      console.log(`from onMutate`, previousQuotes);

      queryClient.setQueryData(["quotes"], (old: QuotesType) => {
        if (!old.favourite) old.favourite = [];
        if (isFavourite) {
          old.favourite = old.favourite.filter((q) => q._id !== quote._id);
        } else {
          old.favourite.push(quote);
        }
        console.log(`mutation: `, old);
        return old;
      });

      return { previousQuotes };
    },
    onError: (_err, _old, context) => {
      console.log(`from onError`, context?.previousQuotes);
      queryClient.setQueryData(["quotes"], context?.previousQuotes);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
};
