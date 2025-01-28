import { Layouts } from 'react-grid-layout';

export type BreakpointT = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
export type CompactTypeT = 'vertical' | 'horizontal' | null;
export type DroppingItemT =
  | ({
      i: string;
      w: number;
      h: number;
    } & {
      minW?: number;
      minH?: number;
    })
  | undefined;

export type AyahWidgetT = {
  text?: string;
  font?: AyahWidgetFontT;
};

export type DigitalClockWidgetT = {
  id: string;
  text: string;
  time: string;
};
export type TimePassedWidgetT = {
  selectedUnit: string;
  date: string;
};

export type DefaultWidgetsStateT = {
  ayah: AyahWidgetT;
};

export type AyahWidgetFontT = '__className_a12e74' | '__className_af25f8';

export type ImageWidgetStateT = {
  url: string;
};

export type WidgetT =
  | AyahWidgetT
  | DigitalClockWidgetT
  | TimePassedWidgetT
  | ImageWidgetStateT
  | null;

export type WidgetsT = {
  layouts: Layouts;
  states: WidgetStatesT;
};

export type WidgetStatesT = {
  [key: string]: WidgetT;
};

// TODO: change to aura.ts
