import { QuoteType } from "@/types";
import { create } from "zustand";

interface QuotesStore {
  favouriteQuotes: QuoteType[];
  toggleFavouriteState: ({ quote }: { quote: QuoteType }) => void;
}

const favouriteQuotes: QuoteType[] = [];

const useQuotesStore = create<QuotesStore>()((set) => ({
  favouriteQuotes,
  toggleFavouriteState: ({ quote }: { quote: QuoteType }) => {
    return set((state) => {
      const isFavourite = state.favouriteQuotes
        .map((q) => q._id)
        .includes(quote._id);
      let newFavouriteQuotes = [...state.favouriteQuotes];
      if (isFavourite) {
        newFavouriteQuotes = state.favouriteQuotes.filter(
          (q) => q._id !== quote._id,
        );
      } else {
        newFavouriteQuotes.push(quote);
      }
      return { ...state, favouriteQuotes: newFavouriteQuotes };
    });
  },
}));

export default useQuotesStore;
