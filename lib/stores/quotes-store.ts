import { QuotesType, QuoteType } from "@/types";
import { create } from "zustand";

interface QuotesStore {
  quotes: QuotesType;
  toggleFavouriteState: ({
    quote,
    isFavourite,
  }: {
    quote: QuoteType;
    isFavourite: boolean;
  }) => void;
}

const initialQuotes = {
  favourite: [],
  qotd: {
    author: "William Penn",
    tags: ["Famous Quotes"],
    dateModified: "2023-04-14",
    content:
      "True silence is the rest of the mind; it is to the spirit what sleep is to the body, nourishment and refreshment.",
    _id: "q62wq_5P1uZO",
    authorSlug: "william-penn",
    length: 113,
    dateAdded: "2020-03-15",
  },
};

const useQuotesStore = create<QuotesStore>()((set) => ({
  quotes: initialQuotes,
  toggleFavouriteState: ({
    quote,
    isFavourite,
  }: {
    quote: QuoteType;
    isFavourite: boolean;
  }) => {
    return set((state) => {
      if (isFavourite) {
        state.quotes.favourite = state.quotes.favourite.filter(
          (q) => q._id !== quote._id,
        );
      } else {
        state.quotes.favourite.push(quote);
      }
      return { ...state };
    });
  },
}));

export default useQuotesStore;
