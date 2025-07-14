import type { Layouts } from 'react-grid-layout';
export type BreakpointT = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

export type WebsiteStateT = {
  name: string;
  url: string;
  iconUrl: string;
};

export type FolderStateT = {
  name: string;
  iconUrl: string;
  websites: WebsiteStateT[];
};

export type SlideT = {
  name: string;
  layouts: Layouts;
};

export type SlidesT = Record<string, SlideT>;

export type SlideStatesT = WebsiteStateT | FolderStateT | null;

export type slidesStatesT = Record<string, SlideStatesT>;
