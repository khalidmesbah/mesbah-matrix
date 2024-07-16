import { CardType, KanbanType } from '@/types';
import { create } from 'zustand';

const initialKanban: KanbanType = {
  boards: {
    'board-1': [
      { title: 'Look into render bug in dashboard', id: '1', column: 'backlog' },
      { title: 'SOX compliance checklist', id: '2', column: 'backlog' },
      { title: '[SPIKE] Migrate to Azure', id: '3', column: 'backlog' },
      { title: 'Document Notifications service', id: '4', column: 'backlog' },
      {
        title: 'Research DB options for new microservice',
        id: '5',
        column: 'todo',
      },
      { title: 'Postmortem for outage', id: '6', column: 'todo' },
      { title: 'Sync with product on Q3 roadmap', id: '7', column: 'todo' },
      {
        title: 'refactor context providers to use zustand',
        id: '8',
        column: 'doing',
      },
      { title: 'add logging to daily cron', id: '9', column: 'doing' },
      {
        title: 'set up dd dashboards for lambda listener',
        id: '10',
        column: 'done',
      },
    ],
    'board-2': [
      {
        title: 'investigate performance issue in user profile',
        id: '11',
        column: 'todo',
      },
      { title: 'update privacy policy', id: '21', column: 'backlog' },
      {
        title: '[spike] evaluate graphql implementation',
        id: '31',
        column: 'doing',
      },
      { title: 'refactor authentication service', id: '41', column: 'backlog' },
      {
        title: 'implement caching for api responses',
        id: '51',
        column: 'todo',
      },
      { title: 'conduct security audit', id: '61', column: 'doing' },
      { title: 'plan for q4 feature releases', id: '71', column: 'backlog' },
      {
        title: 'migrate state management to redux toolkit',
        id: '81',
        column: 'doing',
      },
      {
        title: 'set up automated testing for backend services',
        id: '91',
        column: 'todo',
      },
      {
        title: 'optimize database queries for reporting module',
        id: '101',
        column: 'done',
      },
    ],
  },
  selectedBoard: 'board-1',
};

interface KanbanStore {
  kanban: KanbanType;
  setCards: (cards: CardType[]) => void;
  addBoard: (board: string) => void;
  setSelectedBoard: (board: string) => void;
  deleteSelectedBoard: () => void;
}

const useKanbanStore = create<KanbanStore>()((set) => ({
  kanban: initialKanban,
  setCards: (cards) => {
    return set((state) => {
      const newState = { ...state };
      newState.kanban.boards[newState.kanban.selectedBoard] = cards;
      return newState;
    });
  },
  setSelectedBoard: (board) => {
    return set((state) => {
      const newState = { ...state };
      newState.kanban.selectedBoard = board;
      return newState;
    });
  },
  addBoard: (board) => {
    return set((state) => {
      const newState = { ...state };
      newState.kanban.boards[board] = [];
      newState.kanban.selectedBoard = board;
      return newState;
    });
  },
  deleteSelectedBoard: () => {
    return set((state) => {
      const newState = { ...state };
      delete newState.kanban.boards[newState.kanban.selectedBoard];
      const boards = Object.keys(newState.kanban.boards);
      newState.kanban.selectedBoard = boards.length !== 0 ? boards[0] : '';
      return newState;
    });
  },
}));

export default useKanbanStore;
