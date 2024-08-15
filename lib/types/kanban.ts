export type CardT = {
  id: string;
  title: string;
  column: string;
};

export type KanbanT = {
  boards: {
    [boardId: string]: CardT[];
  };
  selectedBoard: string;
};
