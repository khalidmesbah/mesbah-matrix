export interface ActionResponse {
  success: boolean;
  message: string;
}

export interface QuoteType {
  _id: string;
  author: string;
  content: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface QuotesType {
  favourite?: QuoteType[];
  qotd?: QuoteType;
}

export interface SharedType {
  theme: string;
  mode: string;
  today: number;
}

export interface GlobalsType {
  qotd: QuoteType;
  today: number;
}

export interface KanbanType {
  boards: {
    [boardId: string]: CardType[];
  };
  selectedBoard: string;
}

export interface CardType {
  id: string;
  title: string;
  column: string;
}

export interface ZekrType {
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
}

export interface AzkarType {
  [key: string]: ZekrType[];
}

export interface CategoriesType {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export interface DailyReminderType {
  id: string;
  text: string;
  done: boolean;
}

export type CurrentType = 'practise' | 'browse';

export interface DailyRemindersType {
  reminders: {
    [key: string]: DailyReminderType;
  };
  order: string[];
}
