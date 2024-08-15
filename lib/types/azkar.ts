export type ZekrT = {
  Id: number;
  description?: {
    arabic?: string;
    english?: string;
  };
  maximumCount: number;
  count: number;
  zekr: string;
  reference: string;
  categoryId: string;
};

export type AzkarT = {
  [key: string]: ZekrT[];
};

export type AzkarCategoriesT = {
  [key: string]: {
    ar: string;
    en: string;
  };
};
