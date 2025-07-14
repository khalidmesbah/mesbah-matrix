import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getQotd, getQuotes, getRandomQuotes, toggleFavouriteState } from '@/actions/quotes';
import type { QuotesT, QuoteT } from '@/types/quote';

export const useRandomQuotesQuery = () =>
  useQuery({
    queryKey: ['random-quotes'],
    queryFn: () => getRandomQuotes(),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

export const useQuotesQuery = () =>
  useQuery({
    queryKey: ['quotes'],
    queryFn: () => getQuotes(),
  });

export const useQotdQuotesQuery = () =>
  useQuery({
    queryKey: ['qotd'],
    queryFn: () => getQotd(),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

export const useQuotesMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ quote }: { quote: QuoteT }) => toggleFavouriteState(quote),
    mutationKey: ['update-quotes'],
    onMutate: async ({ quote }) => {
      await queryClient.cancelQueries({ queryKey: ['quotes'] });

      const previousQuotes = queryClient.getQueryData(['quotes']);

      queryClient.setQueryData(['quotes'], (old: QuotesT) => {
        const newQuotes = structuredClone(old);
        if (!newQuotes.favourite) newQuotes.favourite = [];
        const isFavourite = newQuotes.favourite.map((q) => q._id).includes(quote._id);
        if (isFavourite) {
          newQuotes.favourite = newQuotes.favourite.filter((q) => q._id !== quote._id);
        } else {
          newQuotes.favourite.push(quote);
        }
        return newQuotes;
      });

      return { previousQuotes };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['quotes'], context?.previousQuotes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};
