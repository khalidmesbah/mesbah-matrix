export type QuoteT = {
  _id: string;
  author: string;
  content: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
};

export type QuotesT = {
  favourite?: QuoteT[];
  qotd?: QuoteT;
};

export type QuoteGlobalsT = {
  qotd: QuoteT;
  today: number;
};
