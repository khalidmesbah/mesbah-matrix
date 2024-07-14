'use server';

import { db } from '@/lib/firebase/init';
import { CardType, KanbanType } from '@/types';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const getKanban = async (): Promise<KanbanType | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    let kanban = resKanban.data() as KanbanType;

    if (!kanban) {
      kanban = { boards: {}, selectedBoard: '' };
      await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban, { merge: true });
    }

    return kanban;
  } catch (error) {
    console.error(error);
  }
};

const setCards = async (cards: CardType[]): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    let kanban = resKanban.data() as KanbanType;

    kanban.boards[kanban.selectedBoard] = cards;
    await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban, { merge: true });
  } catch (error) {
    console.error(error);
  }
};

const deleteSelectedBoard = async (): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    let kanban = resKanban.data() as KanbanType;

    delete kanban.boards[kanban.selectedBoard];
    const boards = Object.keys(kanban.boards);
    kanban.selectedBoard = boards.length !== 0 ? boards[0] : '';
    await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban);
  } catch (error) {
    console.error(error);
  }
};

const addBoard = async (board: string): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    let kanban = resKanban.data() as KanbanType;

    kanban.boards[board] = [];
    kanban.selectedBoard = board;

    await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban, { merge: true });
  } catch (error) {
    console.error(error);
  }
};

const setSelectedBoard = async (board: string): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resKanban = await getDoc(doc(db, 'users', user.id, 'data', 'kanban'));
    let kanban = resKanban.data() as KanbanType;

    kanban.selectedBoard = board;

    await setDoc(doc(db, 'users', user.id, 'data', 'kanban'), kanban, { merge: true });
  } catch (error) {
    console.error(error);
  }
};

export { addBoard, deleteSelectedBoard, getKanban, setCards, setSelectedBoard };
