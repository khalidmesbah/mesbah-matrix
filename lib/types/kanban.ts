export type CardT = {
  content: string;
  id: string;
};

export type ListT = {
  id: string;
  title: string;
  headerColor: string;
  cardIds: string[];
};

export type BoardT = {
  cards: { [cardId: string]: CardT };
  lists: { [listId: string]: ListT };
  listsOrder: string[];
};

export type KanbanT = {
  boards: { [boardId: string]: BoardT };
  selectedBoard: string;
};
