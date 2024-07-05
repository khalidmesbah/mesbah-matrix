export interface ActionResponse {
  success: boolean;
  message: string;
}

export interface ZekrType {
  id: number;
  description: {
    arabic: string;
    english: string;
  };
  count: number;
  zekr: string;
  reference: string;
  category: string;
}

export interface QuoteType {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}
