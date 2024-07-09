"use client";

import useQuotesStore from "@/lib/stores/quotes-store";
import { Masonry } from "../masonary";
import Quote, { NoFavouriteQuotes } from "./quote";

export default function AnonFavouriteQuotesPage() {
  const { quotes } = useQuotesStore();

  return quotes.favourite.length ? (
    <Masonry
      items={quotes.favourite}
      config={{
        columns: [1, 2, 3],
        gap: [8, 8, 8],
        media: [600, 850, 1024],
      }}
      render={(item) => <Quote quote={item} key={item._id} />}
    />
  ) : (
    <NoFavouriteQuotes />
  );
}
