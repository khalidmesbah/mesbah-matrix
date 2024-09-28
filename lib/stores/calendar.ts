import { create } from 'zustand';

type CalendarStore = {
  src: string;
  setSrc: (src: string) => void;
};

const useCalendarStore = create<CalendarStore>(
  (set): CalendarStore => ({
    src: '',
    setSrc: (src: string) =>
      set((state) => ({
        ...state,
        src,
      })),
  }),
);

export default useCalendarStore;
