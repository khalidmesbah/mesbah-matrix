import { useQuery } from "@tanstack/react-query";
import {
  getQotd,
  getQuotes,
  getRandomQuotes,
} from "@/lib/server-actions/quotes-actions";

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

export const useQotdQuotesQuery = () =>
  useQuery({
    queryKey: ["qotd"],
    queryFn: () => getQotd(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
