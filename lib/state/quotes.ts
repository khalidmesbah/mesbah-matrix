import { QuoteType } from "@/types";
import { createGlobalState } from ".";

export const useQuoteState = createGlobalState<QuoteType>("quote", {
  authorSlug: "sophocles",
  _id: "puOWR0I5qnC",
  dateAdded: "2020-01-15",
  content: "Much wisdom often goes with fewest words.",
  length: 41,
  author: "Sophocles",
  tags: ["Wisdom"],
  dateModified: "2023-04-14",
});
