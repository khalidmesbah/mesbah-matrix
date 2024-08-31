'use server';

import { db } from '@/firebase/init';
import { AnalyticsT, IncreaseAnalyticsT } from '@/types/analytics';
import { formatDate } from '@/utils/analytics';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const getAnalytics = async (): Promise<AnalyticsT | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const today = new Date().getDay();

    const resAnalytics = await getDoc(doc(db, 'users', user.id, 'data', 'analytics'));
    let analytics = resAnalytics.data() as AnalyticsT;
    console.log(analytics);

    return analytics;
  } catch (error) {
    console.error(error);
  }
};

const defaultAnalytics = {
  '2024-07-01': {
    ayahsRead: 15,
    finishedAzkar: 3,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-07-02': {
    ayahsRead: 8,
    finishedAzkar: 2,
    finishedDailyRemembers: 2,
    finishedTasks: 3,
  },
  '2024-07-03': {
    ayahsRead: 20,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 7,
  },
  '2024-07-04': {
    ayahsRead: 12,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 4,
  },
  '2024-07-05': {
    ayahsRead: 18,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 6,
  },
  '2024-07-06': {
    ayahsRead: 10,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 2,
  },
  '2024-07-07': {
    ayahsRead: 25,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 8,
  },
  '2024-07-08': {
    ayahsRead: 14,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-07-09': {
    ayahsRead: 7,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 3,
  },
  '2024-07-10': {
    ayahsRead: 22,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 6,
  },
  '2024-07-11': {
    ayahsRead: 16,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 4,
  },
  '2024-07-12': {
    ayahsRead: 9,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 2,
  },
  '2024-07-13': {
    ayahsRead: 19,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 7,
  },
  '2024-07-14': {
    ayahsRead: 11,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-07-15': {
    ayahsRead: 23,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 6,
  },
  '2024-07-16': {
    ayahsRead: 13,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 4,
  },
  '2024-07-17': {
    ayahsRead: 17,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-07-18': {
    ayahsRead: 8,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 3,
  },
  '2024-07-19': {
    ayahsRead: 21,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 7,
  },
  '2024-07-20': {
    ayahsRead: 15,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 6,
  },
  '2024-07-21': {
    ayahsRead: 10,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 4,
  },
  '2024-07-22': {
    ayahsRead: 24,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 8,
  },
  '2024-07-23': {
    ayahsRead: 14,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-07-24': {
    ayahsRead: 9,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 3,
  },
  '2024-07-25': {
    ayahsRead: 20,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 7,
  },
  '2024-07-26': {
    ayahsRead: 12,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 4,
  },
  '2024-07-27': {
    ayahsRead: 18,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 6,
  },
  '2024-07-28': {
    ayahsRead: 11,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 5,
  },
  '2024-07-29': {
    ayahsRead: 22,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 7,
  },
  '2024-07-30': {
    ayahsRead: 13,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 4,
  },
  '2024-07-31': {
    ayahsRead: 19,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 6,
  },
  '2024-08-01': {
    ayahsRead: 16,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-08-02': {
    ayahsRead: 8,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 3,
  },
  '2024-08-03': {
    ayahsRead: 23,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 7,
  },
  '2024-08-04': {
    ayahsRead: 14,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-08-05': {
    ayahsRead: 10,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 4,
  },
  '2024-08-06': {
    ayahsRead: 21,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 6,
  },
  '2024-08-07': {
    ayahsRead: 15,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-08-08': {
    ayahsRead: 9,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 3,
  },
  '2024-08-09': {
    ayahsRead: 25,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 8,
  },
  '2024-08-10': {
    ayahsRead: 17,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 6,
  },
  '2024-08-11': {
    ayahsRead: 11,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 4,
  },
  '2024-08-12': {
    ayahsRead: 20,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 7,
  },
  '2024-08-13': {
    ayahsRead: 13,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-08-14': {
    ayahsRead: 8,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 3,
  },
  '2024-08-15': {
    ayahsRead: 22,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 6,
  },
  '2024-08-16': {
    ayahsRead: 16,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-08-17': {
    ayahsRead: 10,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 4,
  },
  '2024-08-18': {
    ayahsRead: 24,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 7,
  },
  '2024-08-19': {
    ayahsRead: 14,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 5,
  },
  '2024-08-20': {
    ayahsRead: 9,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 3,
  },
  '2024-08-21': {
    ayahsRead: 19,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 6,
  },
  '2024-08-22': {
    ayahsRead: 12,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 4,
  },
  '2024-08-23': {
    ayahsRead: 21,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 7,
  },
  '2024-08-24': {
    ayahsRead: 15,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 5,
  },
  '2024-08-25': {
    ayahsRead: 11,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 4,
  },
  '2024-08-26': {
    ayahsRead: 23,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 8,
  },
  '2024-08-27': {
    ayahsRead: 17,
    finishedAzkar: 3,
    finishedDailyRemembers: 2,
    finishedTasks: 6,
  },
  '2024-08-28': {
    ayahsRead: 10,
    finishedAzkar: 2,
    finishedDailyRemembers: 1,
    finishedTasks: 3,
  },
  '2024-08-29': {
    ayahsRead: 20,
    finishedAzkar: 1,
    finishedDailyRemembers: 3,
    finishedTasks: 7,
  },
  '2024-08-30': {
    ayahsRead: 5,
    finishedAzkar: 7,
    finishedDailyRemembers: 2,
    finishedTasks: 9,
  },
  '2024-08-31': {
    ayahsRead: 3,
    finishedAzkar: 5,
    finishedDailyRemembers: 5,
    finishedTasks: 0,
  },
};

export const increaseAnalytics = async (
  type: IncreaseAnalyticsT,
): Promise<AnalyticsT | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const today = formatDate(new Date());
    const resAnalytics = await getDoc(doc(db, 'users', user.id, 'data', 'analytics'));
    // let analytics = resAnalytics.data() as AnalyticsT;
    //
    // if (!analytics[today]) {
    //   analytics[today] = {
    //     finishedAzkar: 0,
    //     finishedTasks: 0,
    //     ayahsRead: 0,
    //     finishedDailyRemembers: 0,
    //   };
    // }

    const analytics = defaultAnalytics;
    // analytics[today][type]++;

    await setDoc(doc(db, 'users', user.id, 'data', 'analytics'), analytics, { merge: true });

    return analytics;
  } catch (error) {
    console.error(error);
  }
};
