export type DailyReminderT = {
  id: string;
  text: string;
  done: boolean;
};

export type CurrentDailyReminderT = 'practise' | 'browse';

export type DailyRemindersT = {
  reminders: {
    [key: string]: DailyReminderT;
  };
  order: string[];
};
