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

const useQuotesStore = create<QuotesStore>()((set) => ({
  quotes: {
    favourite: [
      {
        authorSlug: "sophocles",
        _id: "puOWR0I5qnC",
        dateAdded: "2020-01-15",
        content: "Much wisdom often goes with fewest words.",
        length: 41,
        author: "Sophocles",
        tags: ["Wisdom"],
        dateModified: "2023-04-14",
      },
      {
        length: 95,
        content:
          "The lure of the distant and the difficult is deceptive. The great opportunity is where you are.",
        authorSlug: "john-burroughs",
        author: "John Burroughs",
        _id: "8W_EcJkZ-o",
        tags: ["Wisdom"],
        dateModified: "2023-04-14",
        dateAdded: "2020-03-01",
      },
      {
        dateAdded: "2019-02-17",
        content:
          "True happiness means forging a strong spirit that is undefeated, no matter how trying our circumstances.",
        _id: "HyGs4595-FfY",
        length: 104,
        dateModified: "2023-04-14",
        tags: ["Famous Quotes"],
        author: "Daisaku Ikeda",
        authorSlug: "daisaku-ikeda",
      },
    ],
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
  },
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
