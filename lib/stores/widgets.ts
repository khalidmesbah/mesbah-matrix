import { BreakpointT, CompactTypeT, DroppingItemT } from '@/lib/types/widgets';
import { Layouts } from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

function generateLayout() {
  return Array.from({ length: 5 }, (_, index) => {
    const y = Math.ceil(Math.random() * 40) + 10;
    const elements = ['analog-clock', 'digital-clock', 'time-passed'];
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    return {
      x: (Math.floor(Math.random() * 60) * 20) % 12,
      y: Math.floor(index / 60) * y,
      w: 20,
      h: y,
      minW: 5,
      minH: 10,
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
  setLayouts: (layouts: Layouts) => void;
  setCurrentBreakpoint: (breakpoint: BreakpointT) => void;
  setCompactType: (compactType: CompactTypeT) => void;
  setIsLayoutLocked: (isLocked: boolean) => void;
  setDraggingItem: (newDraggingItem: string) => void;
  setDroppingItem: (newDroppingItem: DroppingItemT) => void;
  addWidget: (name: string) => void;
};

const useWidgetsStore = create<WidgetsStore>(
  (set): WidgetsStore => ({
    currentBreakpoint: 'lg',
    compactType: null,
    isLayoutLocked: false,
    layouts: { lg: [...generateLayout()] },
    draggingItem: '',
    droppingItem: undefined,
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
          minW: 5,
          minH: 10,
        });
        return { ...state, layouts: newLayouts };
      }),
    setDraggingItem: (newDraggingItem) => set({ draggingItem: newDraggingItem }),
    setDroppingItem: (newDraggingItem) => set({ droppingItem: newDraggingItem }),
  }),
);

export default useWidgetsStore;
