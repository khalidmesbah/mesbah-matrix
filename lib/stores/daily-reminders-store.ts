import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { _setDailyReminders } from "../server-actions/daily-reminders-actions";

export interface DailyReminderType {
  id: string;
  text: string;
  done: boolean;
}

export interface DailyRemindersType {
  reminders: {
    [key: string]: DailyReminderType;
  };
  order: string[];
}

type DailyReminderStore = {
  dailyReminders: DailyRemindersType;
  setDailyReminders: (dailyReminders: DailyRemindersType) => void;
  addDailyReminder: (text: string) => void;
};

const initialDailyReminders: DailyRemindersType = {
  reminders: {
    "1": {
      id: "1",
      text: "Know that you are powerful beyond your recognition.",
      done: false,
    },
    "2": {
      id: "2",
      text: "Your thoughts become reality. Be positive!",
      done: false,
    },
    "3": { id: "3", text: "Forgiveness leads to love.", done: false },
  },
  order: ["1", "2", "3"],
};

const useDailyRemindersStore = create<DailyReminderStore>(
  (set): DailyReminderStore => ({
    dailyReminders: initialDailyReminders,
    setDailyReminders: (dailyReminders: DailyRemindersType) => {
      // NOTE: i'm using optimistic updates cuz i trust google
      _setDailyReminders(dailyReminders);

      return set((state) => {
        state.dailyReminders = dailyReminders;
        return { ...state };
      });
    },
    addDailyReminder: (text: string) => {
      const newDailyReminder = { id: uuidv4(), text, done: false };
      return set((state) => {
        state.dailyReminders.reminders[newDailyReminder.id] = newDailyReminder;
        state.dailyReminders.order.push(newDailyReminder.id);
        _setDailyReminders(state.dailyReminders);
        return { ...state };
      });
    },
  }),
);

export default useDailyRemindersStore;
