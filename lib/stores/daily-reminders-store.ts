import { CurrentType, DailyRemindersType } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

type DailyReminderStore = {
  dailyReminders: DailyRemindersType;
  current: CurrentType;
  setCurrent: (newCurrent: 'practise' | 'browse') => void;
  setDailyReminders: (dailyReminders: DailyRemindersType) => void;
  addDailyReminder: (text: string) => void;
};

const initialDailyReminders: DailyRemindersType = {
  reminders: {
    '1': {
      id: '1',
      text: 'Know that you are powerful beyond your recognition.',
      done: false,
    },
    '2': {
      id: '2',
      text: 'Your thoughts become reality. Be positive!',
      done: false,
    },
    '3': { id: '3', text: 'Forgiveness leads to love.', done: false },
  },
  order: ['1', '2', '3'],
};
const initialCurrent = 'practise';

const useDailyRemindersStore = create<DailyReminderStore>(
  (set): DailyReminderStore => ({
    dailyReminders: initialDailyReminders,
    current: initialCurrent,
    setDailyReminders: (dailyReminders: DailyRemindersType) => {
      return set((state) => {
        const newState = { ...state };
        newState.dailyReminders = dailyReminders;
        return newState;
      });
    },
    setCurrent: (newCurrent: 'practise' | 'browse') => {
      return set((state) => {
        const newState = { ...state };
        newState.current = newCurrent;
        return newState;
      });
    },
    addDailyReminder: (text: string) => {
      const newDailyReminder = { id: uuidv4(), text, done: false };
      return set((state) => {
        const newState = { ...state };
        newState.dailyReminders.reminders[newDailyReminder.id] = newDailyReminder;
        newState.dailyReminders.order.push(newDailyReminder.id);
        return newState;
      });
    },
  }),
);

export default useDailyRemindersStore;
