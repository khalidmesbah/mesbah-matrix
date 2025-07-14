'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';
import type { BoardT, KanbanT } from '@/types/kanban';

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

export const getKanbanAction = async (): Promise<KanbanT | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    let kanban = resKanban.data() as KanbanT;

    if (!kanban) {
      kanban = { boards: {}, selectedBoard: '' };
      kanban = initialKanban;
      await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban, {
        merge: true,
      });
    }

    return kanban;
  } catch (error) {
    console.error(error);
  }
};

export const addBoardAction = async (board: string): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    const kanban = resKanban.data() as KanbanT;

    kanban.boards[board] = {
      cards: {},
      lists: {},
      listsOrder: [],
    };
    kanban.selectedBoard = board;

    await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban, {
      merge: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const setBoardAction = async (newBoard: BoardT): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    const kanban = resKanban.data() as KanbanT;

    kanban.boards[kanban.selectedBoard] = newBoard;
    await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban, {
      merge: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteSelectedBoardAction = async (): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    const kanban = resKanban.data() as KanbanT;

    delete kanban.boards[kanban.selectedBoard];
    const boards = Object.keys(kanban.boards);
    kanban.selectedBoard = boards.length !== 0 ? boards[0] : '';
    await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban);
  } catch (error) {
    console.error(error);
  }
};

export const setSelectedBoardAction = async (board: string): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    const kanban = resKanban.data() as KanbanT;

    kanban.selectedBoard = board;

    await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban, {
      merge: true,
    });
  } catch (error) {
    console.error(error);
  }
};
