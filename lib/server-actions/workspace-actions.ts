'use server';

import { db } from '@/lib/firebase/init';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TLSessionStateSnapshot, TLStoreSnapshot } from 'tldraw';

type WorkSpacesType = {
  document: TLStoreSnapshot;
  session: TLSessionStateSnapshot;
};

export const getWorkspaces = async (): Promise<WorkSpacesType | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resWorkspaces = await getDoc(doc(db, 'users', user.id, 'data', 'workspaces'));
    const shared = resWorkspaces.data() as WorkSpacesType;

    return shared;
  } catch (error) {
    console.error(error);
  }
};

export const setWorkspaces = async (workspaces: WorkSpacesType): Promise<boolean> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    await setDoc(doc(db, 'users', user.id, 'data', 'workspaces'), workspaces);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
