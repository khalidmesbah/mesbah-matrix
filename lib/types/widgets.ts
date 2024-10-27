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

export type DefaultWidgetsStateT = {
  ayah: AyahWidgetT;
};

export type AyahWidgetFontT = '__className_a12e74' | '__className_af25f8';

export type WidgetT = AyahWidgetT | DigitalClockWidgetT | null;
export type WidgetsT = WidgetT[];

// TODO: change to aura.ts
