'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';
import type { DailyRemindersT, DailyReminderT } from '@/types/daily';
import type { SharedT } from '@/types/globals';

const getDailyReminders = async (): Promise<DailyRemindersT | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const today = new Date().getDay();

    const resDailyReminders = await getDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'));
    let dailyReminders = resDailyReminders.data() as DailyRemindersT;

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
    const shared = resShared.data() as SharedT;

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

const setDailyReminders = async (dailyReminders: DailyRemindersT): Promise<void> => {
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

const addDailyReminder = async (newDailyReminder: DailyReminderT): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resDailyReminders = await getDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'));
    const dailyReminders = resDailyReminders.data() as DailyRemindersT;

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
  const shared = resShared.data() as SharedT;

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

const toggleDailyReminder = async (newDailyReminder: DailyReminderT): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resDailyReminders = await getDoc(doc(db, 'users', user.id, 'data', 'daily-reminders'));
    const dailyReminders = resDailyReminders.data() as DailyRemindersT;

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
