'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { TLSessionStateSnapshot, TLStoreSnapshot } from 'tldraw';
import { db } from '@/firebase/init';

type CanvasType = {
  document: TLStoreSnapshot;
  session: TLSessionStateSnapshot;
};

export const getCanvas = async (): Promise<CanvasType | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resCanvas = await getDoc(doc(db, 'users', user.id, 'data', 'canvas'));
    const shared = resCanvas.data() as CanvasType;

    return shared;
  } catch (error) {
    console.error(error);
  }
};

export const setCanvas = async (canvas: CanvasType): Promise<boolean> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    await setDoc(doc(db, 'users', user.id, 'data', 'canvas'), canvas);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
