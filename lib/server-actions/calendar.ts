'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';

type Calendar = {
  publicURL: string;
};

export const getPublicURL = async (): Promise<Calendar | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resCalendar = await getDoc(doc(db, 'users', user.id, 'data', 'calendar'));
    const calendar = resCalendar.data() as Calendar;

    return calendar;
  } catch (error) {
    console.error(error);
  }
};

export const setPublicURL = async (publicURL: string): Promise<boolean> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    await setDoc(doc(db, 'users', user.id, 'data', 'calendar'), { publicURL });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
