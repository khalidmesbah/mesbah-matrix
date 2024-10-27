import { BreakpointT, CompactTypeT, DroppingItemT } from '@/lib/types/widgets';
import { Layouts } from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

function generateLayout() {
  return Array.from({ length: 4 }, (_, index) => {
    const y = Math.ceil(Math.random() * 20) + 10;
    // const elements = ['analog-clock', 'digital-clock', 'time-passed', 'pomodoro', 'ayah'];
    const elements = ['ayah'];
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    return {
      x: (Math.floor(Math.random() * 60) * 20) % 12,
      y: Math.floor(index / 60) * y,
      w: 15,
      h: y,
      minW: 3,
      minH: 6,
      i: `${randomElement}|${uuidv4()}`,
      static: Math.random() < 0.5,
    };
  });
}

type WidgetsStore = {
  layouts: Layouts;
  currentBreakpoint: BreakpointT;
  compactType: CompactTypeT;
  isLayoutLocked: boolean;
  draggingItem: string;
  droppingItem: DroppingItemT;
  ayahText: string;
  font: '__className_a12e74' | '__className_af25f8';
  setLayouts: (layouts: Layouts) => void;
  setCurrentBreakpoint: (breakpoint: BreakpointT) => void;
  setCompactType: (compactType: CompactTypeT) => void;
  setIsLayoutLocked: (isLocked: boolean) => void;
  setDraggingItem: (newDraggingItem: string) => void;
  setDroppingItem: (newDroppingItem: DroppingItemT) => void;
  addWidget: (name: string) => void;
  setAyahText: (newAyahText: string) => void;
  setFont: (newFont: '__className_a12e74' | '__className_af25f8') => void;
};

const useWidgetsStore = create<WidgetsStore>(
  (set): WidgetsStore => ({
    currentBreakpoint: 'lg',
    compactType: null,
    isLayoutLocked: false,
    layouts: { lg: [...generateLayout()] },
    draggingItem: '',
    droppingItem: undefined,
    font: '__className_af25f8',
    ayahText: 'السلام عليكم ورحمة الله وبركاته وت',
    setLayouts: (layouts) => set({ layouts }),
    setCurrentBreakpoint: (breakpoint) => set({ currentBreakpoint: breakpoint }),
    setCompactType: (compactType) => set({ compactType }),
    setIsLayoutLocked: (isLocked) => set({ isLayoutLocked: isLocked }),
    addWidget: (name: string) =>
      set((state) => {
        const newIndex = state.layouts[state.currentBreakpoint].length + 1;
        const newLayouts = structuredClone(state.layouts);
        newLayouts[state.currentBreakpoint].push({
          x: 0,
          y: 0,
          w: 40,
          h: 40,
          i: `${name}-${newIndex}`,
          static: false,
          minW: 3,
          minH: 6,
        });
        return { ...state, layouts: newLayouts };
      }),
    setDraggingItem: (newDraggingItem) => set({ draggingItem: newDraggingItem }),
    setDroppingItem: (newDraggingItem) => set({ droppingItem: newDraggingItem }),
    setAyahText: (newAyahText) => set({ ayahText: newAyahText }),
    setFont: (newFont) => set({ font: newFont }),
  }),
);

export default useWidgetsStore;
