'use server';

import { db } from '@/lib/firebase/init';
import { DailyReminderType, DailyRemindersType, GlobalsType, SharedType } from '@/types';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const getDailyReminders = async (): Promise<DailyRemindersType | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const today = new Date().getDay();

    const resDailyReminders = await getDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'));
    let dailyReminders = resDailyReminders.data() as DailyRemindersType;

    if (!dailyReminders) {
      dailyReminders = { order: [], reminders: {} };
      await setDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'), dailyReminders, {
        merge: true,
      });

      await setDoc(
        doc(db, 'users', user.id, 'data', 'shared'),
        { today },
        {
          merge: true,
        },
      );

      return dailyReminders;
    }

    const resShared = await getDoc(doc(db, 'users', user.id, 'data', 'shared'));
    const shared = resShared.data() as SharedType;

    if (!shared || today !== shared.today) {
      dailyReminders.order.map((id) => {
        dailyReminders.reminders[id].done = false;
      });

      await setDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'), dailyReminders, {
        merge: true,
      });

      await setDoc(
        doc(db, 'users', user.id, 'data', 'shared'),
        { today },
        {
          merge: true,
        },
      );
    }

    return dailyReminders;
  } catch (error) {
    console.error(error);
  }
};

const setDailyReminders = async (dailyReminders: DailyRemindersType): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    await setDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'), dailyReminders, {
      merge: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const addDailyReminder = async (newDailyReminder: DailyReminderType): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resDailyReminders = await getDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'));
    let dailyReminders = resDailyReminders.data() as DailyRemindersType;

    const order = [...dailyReminders.order, newDailyReminder.id];
    const reminders = dailyReminders.reminders;
    reminders[newDailyReminder.id] = newDailyReminder;

    await setDoc(
      doc(db, 'users', user.id, 'data', 'daily-reminders'),
      {
        order,
        reminders,
      },
      {
        merge: true,
      },
    );
  } catch (error) {
    console.error(error);
  }
};

const getIsNewDay = async () => {
  const today = new Date().getDay();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw 'there is no user';

  const resShared = await getDoc(doc(db, 'users', user.id, 'data', 'shared'));
  const shared = resShared.data() as GlobalsType;

  if (!shared || today !== shared.today) {
    await setDoc(
      doc(db, 'globals', 'data'),
      {
        today,
      },
      { merge: true },
    );
    return true;
  }
  return false;
};

const toggleDailyReminder = async (newDailyReminder: DailyReminderType): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resDailyReminders = await getDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'));
    let dailyReminders = resDailyReminders.data() as DailyRemindersType;

    const reminders = dailyReminders.reminders;
    reminders[newDailyReminder.id].done = !newDailyReminder.done;

    await setDoc(
      doc(db, 'users', user.id, 'data', 'daily-reminders'),
      {
        reminders,
      },
      {
        merge: true,
      },
    );
  } catch (error) {
    console.error(error);
  }
};

export { addDailyReminder, getDailyReminders, getIsNewDay, setDailyReminders, toggleDailyReminder };
