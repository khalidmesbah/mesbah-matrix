'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';
import type { AnalyticsT, AnalyticT, IncreaseAnalyticsT } from '@/types/analytics';
import type { SharedT } from '@/types/globals';
import { formatDate } from '@/utils/analytics';

export const getAnalytics = async (): Promise<AnalyticsT | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resShared = await getDoc(doc(db, 'users', user.id, 'data', 'shared'));
    let shared = resShared.data() as SharedT;

    if (!shared.analytics) {
      shared = {
        analytics: [],
      };
      await setDoc(doc(db, 'users', user.id, 'data', 'shared'), shared, {
        merge: true,
      });
    }

    return shared.analytics;
  } catch (error) {
    console.error(error);
  }
};

export const increaseAnalytics = async (
  type: IncreaseAnalyticsT,
): Promise<AnalyticsT | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    // const today = formatDate(new Date());

    const resShared = await getDoc(doc(db, 'users', user.id, 'data', 'shared'));
    const shared = resShared.data() as SharedT;

    const analytics = shared.analytics!;

    let today = analytics.find((a) => a.date === formatDate(new Date()));
    if (!today) {
      today = {
        date: formatDate(new Date()),
        finishedTasks: 0,
        finishedDailyReminders: 0,
        finishedAzkar: 0,
        AyahsRead: 0,
      } as AnalyticT;

      analytics.push(today);
    }
    console.log(today);
    // TODO: Max length of the array is 62
    today[type]!++;

    await setDoc(doc(db, 'users', user.id, 'data', 'shared'), { analytics }, { merge: true });

    return analytics;
  } catch (error) {
    console.error(error);
  }
};
