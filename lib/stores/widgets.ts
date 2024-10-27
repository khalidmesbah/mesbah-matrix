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
      minW: 6,
      minH: 12,
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
  droppingItem: DroppingItemT;
  setLayouts: (layouts: Layouts) => void;
  setCurrentBreakpoint: (breakpoint: BreakpointT) => void;
  setCompactType: (compactType: CompactTypeT) => void;
  setIsLayoutLocked: (isLocked: boolean) => void;
  setDroppingItem: (newDroppingItem: DroppingItemT) => void;
  addWidget: (name: string) => void;
};

const useWidgetsStore = create<WidgetsStore>(
  (set): WidgetsStore => ({
    currentBreakpoint: 'lg',
    compactType: null,
    isLayoutLocked: false,
    layouts: { lg: [] },
    droppingItem: undefined,
    setLayouts: (layouts: Layouts) => set({ layouts }),
    setCurrentBreakpoint: (breakpoint) => set({ currentBreakpoint: breakpoint }),
    setCompactType: (compactType) => set({ compactType }),
    setIsLayoutLocked: (isLocked) => set({ isLayoutLocked: isLocked }),
    addWidget: (name: string) =>
      set((state) => {
        const newLayouts = structuredClone(state.layouts);
        newLayouts[state.currentBreakpoint].push({
          x: 0,
          y: 0,
          w: 10,
          h: 20,
          i: name,
          static: false,
          minW: 6,
          minH: 12,
          isDraggable: undefined,
        });
        return { ...state, layouts: newLayouts };
      }),
    setDroppingItem: (newDraggingItem) => set({ droppingItem: newDraggingItem }),
  }),
);

export default useWidgetsStore;
