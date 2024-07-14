import {
  getQotd,
  getQuotes,
  getRandomQuotes,
  toggleFavouriteState,
} from '@/lib/server-actions/quotes-actions';
import { QuoteType, QuotesType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useRandomQuotesQuery = () =>
  useQuery({
    queryKey: ['random-quotes'],
    queryFn: () => getRandomQuotes(),
    staleTime: Infinity,
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
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

export const useQuotesMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ quote }: { quote: QuoteType }) => toggleFavouriteState(quote),
    mutationKey: ['update-quotes'],
    onMutate: async ({ quote }) => {
      await queryClient.cancelQueries({ queryKey: ['quotes'] });

      const previousQuotes = queryClient.getQueryData(['quotes']);

      queryClient.setQueryData(['quotes'], (old: QuotesType) => {
        const newQuotes = structuredClone(old);
        console.log(
          `before mutation`,
          newQuotes.favourite?.map((e) => e._id),
        );
        if (!newQuotes.favourite) newQuotes.favourite = [];
        const isFavourite = newQuotes.favourite.map((q) => q._id).includes(quote._id);
        if (isFavourite) {
          newQuotes.favourite = newQuotes.favourite.filter((q) => q._id !== quote._id);
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
      queryClient.setQueryData(['quotes'], context?.previousQuotes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};
