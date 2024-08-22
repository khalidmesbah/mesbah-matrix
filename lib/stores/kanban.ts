import {
  addBoardAction,
  deleteSelectedBoardAction,
  setBoardAction,
  setSelectedBoardAction,
} from '@/actions/kanban';
import { BoardT, KanbanT } from '@/lib/types/kanban';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

const initialKanban: KanbanT = {
  boards: {
    'board-1': {
      cards: {
        '1': {
          content: 'Look into render bug in dashboard',
          id: '1',
        },
        '2': {
          content: 'SOX compliance checklist',
          id: '2',
        },
        '3': {
          content: '[SPIKE] Migrate to Azure',
          id: '3',
        },
        '4': {
          content: 'Document Notifications service',
          id: '4',
        },
        '5': {
          content: 'Research DB options for new microservice',
          id: '5',
        },
        '6': {
          content: 'Postmortem for outage',
          id: '6',
        },
        '7': {
          content: 'Sync with product on Q3 roadmap',
          id: '7',
        },
        '8': {
          content: 'Refactor context providers to use zustand',
          id: '8',
        },
        '9': {
          content: 'Add logging to daily cron',
          id: '9',
        },
        '10': {
          content: 'Set up dd dashboards for lambda listener',
          id: '10',
        },
      },
      lists: {
        backlog: {
          id: 'backlog',
          title: 'Backlog',
          headerColor: '#737373',
          cardIds: ['1', '2', '3'],
        },
        todo: {
          id: 'todo',
          title: 'TODO',
          headerColor: '#eab308',
          cardIds: ['4', '5', '6'],
        },
        doing: {
          id: 'doing',
          title: 'In progress',
          headerColor: '#3b82f6',
          cardIds: ['8', '9', '10'],
        },
        done: {
          id: 'done',
          title: 'Complete',
          headerColor: '#10b981',
          cardIds: ['7'],
        },
      },
      listsOrder: ['backlog', 'todo', 'doing', 'done'],
    },
  },
  selectedBoard: 'board-1',
};

type KanbanStore = {
  kanban: KanbanT;
  setKanban: (board: KanbanT) => void;
  setBoard: (board: BoardT) => void;
  addCard: (listId: string, card: string) => void;
  editCard: (cardId: string, NewCard: string) => void;
  deleteCard: (listId: string, cardId: string) => void;
  addList: (title: string, headerColor: string) => void;
  editList: (listId: string, title: string, headerColor: string) => void;
  deleteList: (listId: string) => void;
  addBoard: (board: string) => void;
  setSelectedBoard: (board: string) => void;
  deleteSelectedBoard: () => void;
};

const useKanbanStore = create<KanbanStore>()((set) => ({
  kanban: initialKanban,
  setKanban: (kanban: KanbanT) => {
    return set((state) => {
      const newState = { ...state };
      newState.kanban = kanban;
      return newState;
    });
  },
  setBoard: (board: BoardT) => {
    return set((state) => {
      const newState = { ...state };
      newState.kanban.boards[newState.kanban.selectedBoard] = board;
      setBoardAction(board);
      return newState;
    });
  },
  addCard: (listId: string, card: string) => {
    return set((state) => {
      const newState = { ...state };
      const board = newState.kanban.boards[newState.kanban.selectedBoard];
      const list = board.lists[listId];
      const id = uuidv4();
      const newCard = { id, content: card };
      board.cards[id] = newCard;
      list.cardIds.push(id);
      setBoardAction(board);
      return newState;
    });
  },
  editCard: (cardId: string, NewCard: string) => {
    return set((state) => {
      const newState = { ...state };
      const board = newState.kanban.boards[newState.kanban.selectedBoard];
      const card = board.cards[cardId];
      card.content = NewCard;
      setBoardAction(board);
      return newState;
    });
  },
  deleteCard: (listId: string, cardId: string) => {
    return set((state) => {
      const newState = { ...state };
      const board = newState.kanban.boards[newState.kanban.selectedBoard];
      const list = board.lists[listId];
      delete board.cards[cardId];
      list.cardIds = list.cardIds.filter((id) => id !== cardId);
      setBoardAction(board);
      return newState;
    });
  },
  addList: (title, headerColor) => {
    return set((state) => {
      const newState = { ...state };
      const board = newState.kanban.boards[newState.kanban.selectedBoard];
      const id = uuidv4();
      const newList = { id, title, headerColor, cardIds: [] };
      board.lists[id] = newList;
      board.listsOrder.push(id);
      setBoardAction(board);
      return newState;
    });
  },
  editList: (listId, title, headerColor) => {
    return set((state) => {
      const newState = { ...state };
      const board = newState.kanban.boards[newState.kanban.selectedBoard];
      const list = board.lists[listId];
      list.title = title;
      list.headerColor = headerColor;
      setBoardAction(board);
      return newState;
    });
  },
  deleteList: (listId) => {
    return set((state) => {
      const newState = { ...state };
      const board = newState.kanban.boards[newState.kanban.selectedBoard];
      const lists = board.lists;
      delete lists[listId];
      board.listsOrder = board.listsOrder.filter((id) => id !== listId);
      setBoardAction(board);
      return newState;
    });
  },
  setSelectedBoard: (board) => {
    return set((state) => {
      const newState = { ...state };
      newState.kanban.selectedBoard = board;
      setSelectedBoardAction(board);
      return newState;
    });
  },
  addBoard: (board) => {
    return set((state) => {
      const newState = { ...state };
      newState.kanban.boards[board] = {
        cards: {},
        lists: {},
        listsOrder: [],
      };
      newState.kanban.selectedBoard = board;
      addBoardAction(board);
      return newState;
    });
  },
  deleteSelectedBoard: () => {
    return set((state) => {
      const newState = { ...state };
      delete newState.kanban.boards[newState.kanban.selectedBoard];
      const boards = Object.keys(newState.kanban.boards);
      newState.kanban.selectedBoard = boards.length !== 0 ? boards[0] : '';
      deleteSelectedBoardAction();
      return newState;
    });
  },
}));

export default useKanbanStore;
