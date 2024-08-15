import { create } from 'zustand';

type SettingsStore = {
  isSoundAllowed: boolean;
  setIsSoundAllowed: (status: boolean) => void;
};

const useSettingsStore = create<SettingsStore>(
  (set): SettingsStore => ({
    isSoundAllowed: true,
    setIsSoundAllowed: (status) =>
      set((state) => ({
        ...state,
        isSoundAllowed: status,
      })),
  }),
);

export default useSettingsStore;
