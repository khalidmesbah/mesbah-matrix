import { create } from "zustand";
import { _addDailyTask } from "../server-actions/daily-tasks-actions";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

// Standard interface and functions
export interface DailyTaskType {
  id: string;
  text: string;
  done: boolean;
}

// // refactor this function
// const updateDailyTask = (
//   dailyTasks: DailyTask[],
//   id: number,
//   text: string,
// ): DailyTask[] =>
//   dailyTasks.map((dailyTask) => ({
//     ...dailyTask,
//     text: dailyTask.id === id ? text : dailyTask.text,
//   }));
//
// const toggleDailyTask = (dailyTasks: DailyTask[], id: number): DailyTask[] =>
//   dailyTasks.map((dailyTask) => ({
//     ...dailyTask,
//     done: dailyTask.id === id ? !dailyTask.done : dailyTask.done,
//   }));
//
// const removeDailyTask = (dailyTasks: DailyTask[], id: number): DailyTask[] =>
//   dailyTasks.filter((dailyTask) => dailyTask.id !== id);

// Zustand implementation
type DailyTasksStore = {
  dailyTasks: DailyTaskType[];
  setDailyTasks: (dailyTasks: DailyTaskType[]) => void;
  addDailyTask: (text: string) => Promise<void>;
  // updateDailyTask: (id: number, text: string) => void;
  // toggleDailyTask: (id: number) => void;
  // removeDailyTask: (id: number) => void;
};

// the useDailyTasksStore hook
const useDailyTasksStore = create<DailyTasksStore>(
  (set): DailyTasksStore => ({
    dailyTasks: [
      { id: uuidv4(), text: "hello", done: false },
      { id: uuidv4(), text: "hi", done: false },
      { id: uuidv4(), text: "wowwo", done: false },
    ],
    setDailyTasks: (dailyTasks: DailyTaskType[]) =>
      set((state) => ({
        ...state,
        dailyTasks: dailyTasks,
      })),
    // removeDailyTask: (id: number) =>
    //   set((state) => ({
    //     ...state,
    //     dailyTasks: removeDailyTask(state.dailyTasks, id),
    //   })),
    // updateDailyTask: (id: number, text: string) =>
    //   set((state) => ({
    //     ...state,
    //     dailyTasks: updateDailyTask(state.dailyTasks, id, text),
    //   })),
    // toggleDailyTask: (id: number) =>
    //   set((state) => ({
    //     ...state,
    //     dailyTasks: toggleDailyTask(state.dailyTasks, id),
    //   })),
    addDailyTask: async (text: string) => {
      // TODO use sonner or toast to add user feedback
      const newDailyTask = { id: uuidv4(), text, done: false };
      const res = await _addDailyTask(newDailyTask);
      console.log(res);
      if (res.success === false) {
        return;
      }
      return set((state) => ({
        ...state,
        dailyTasks: [...state.dailyTasks, newDailyTask],
      }));
    },
  }),
);

export default useDailyTasksStore;
