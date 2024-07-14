import { create } from 'zustand';

type TopBarStore = {
  isClosed: boolean;
  setIsClosed: (status: boolean) => void;
};

const useTopBarStore = create<TopBarStore>(
  (set): TopBarStore => ({
    isClosed: false,
    setIsClosed: (status) =>
      set((state) => ({
        ...state,
        isClosed: status,
      })),
  }),
);

export default useTopBarStore;
