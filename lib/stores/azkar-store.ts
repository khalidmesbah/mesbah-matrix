import azkar from '@/public/data/azkar.json';
import categories from '@/public/data/categories.json';
import { AzkarType, CategoriesType, ZekrType } from '@/types';
import { create } from 'zustand';

const wasCompleted = Array.from({ length: 134 }).map((i) => false);

type AzkarStore = {
  azkar: AzkarType;
  wasCompleted: boolean[];
  categories: CategoriesType;
  setAzkar: (newAzkar: AzkarType) => void;
  finishZekr: (zekr: ZekrType) => void;
  resetCount: (zekr: ZekrType) => void;
  increaseCount: (zekr: ZekrType) => void;
  setWasCompleted: (idx: number, status: boolean) => void;
};

const useAzkarStore = create<AzkarStore>(
  (set): AzkarStore => ({
    azkar,
    wasCompleted: wasCompleted,
    categories,
    setAzkar: (newAzkar: AzkarType) =>
      set((state) => ({
        ...state,
        azkar: newAzkar,
      })),
    finishZekr: (zekr: ZekrType) =>
      set((state) => {
        const newState = { ...state };
        const newZekr = newState.azkar[zekr.categoryId].find((e) => e.Id === zekr.Id);
        if (newZekr && zekr.count !== zekr.maximumCount) {
          newZekr.count = newZekr.maximumCount;
          const newAzkar = newState.azkar[zekr.categoryId].filter((e) => e.Id !== zekr.Id);
          newAzkar.push(newZekr);
          newState.azkar[zekr.categoryId] = newAzkar;
        }
        return newState;
      }),
    resetCount: (zekr: ZekrType) =>
      set((state) => {
        const newState = { ...state };
        const newZekr = newState.azkar[zekr.categoryId].find((z) => z.Id === zekr.Id);
        if (newZekr) {
          newZekr.count = 0;
          const newAzkar = newState.azkar[zekr.categoryId].filter((e) => e.Id !== zekr.Id);
          newAzkar.unshift(newZekr);
          newState.azkar[zekr.categoryId] = newAzkar;
        }
        return newState;
      }),
    increaseCount: (zekr: ZekrType) =>
      set((state) => {
        const newState = { ...state };
        if (zekr.count >= zekr.maximumCount) return newState;
        const newZekr = newState.azkar[zekr.categoryId].find((e) => e.Id === zekr.Id);
        if (newZekr) {
          newZekr.count = zekr.count + 1;
          if (newZekr.count === zekr.maximumCount) {
            const newAzkar = newState.azkar[zekr.categoryId].filter((e) => e.Id !== zekr.Id);
            newAzkar.push(newZekr);
            newState.azkar[zekr.categoryId] = newAzkar;
          }
        }
        return newState;
      }),
    setWasCompleted: (idx: number, status: boolean) =>
      set((state) => {
        const newState = { ...state };
        newState.wasCompleted[idx] = status;
        return newState;
      }),
  }),
);

export default useAzkarStore;
