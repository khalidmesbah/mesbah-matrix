import { create } from 'zustand';
import type { BreakpointT } from '@/lib/types/widgets';
import type {
  FolderStateT,
  SlideStatesT,
  SlidesT,
  slidesStatesT,
  WebsiteStateT,
} from '../types/portalio';

var layouts1 = {
  lg: [
    {
      h: 10,
      i: 'website|a123b456-7890-1234-5678-abcdefabcdef',
      w: 10,
      x: 0,
      y: 0,
    },
    {
      h: 10,
      i: 'folder|b234c567-8901-2345-6789-bacdefbacdef',
      w: 10,
      x: 0,
      y: 0,
    },
    {
      h: 10,
      i: 'website|c345d678-9012-3456-7890-cdefabcdefab',
      w: 10,
      x: 0,
      y: 0,
    },
  ],
};

var layouts2 = {
  lg: [
    {
      h: 10,
      i: 'folder|d456e789-0123-4567-8901-defabcdefabc',
      w: 10,
      x: 0,
      y: 0,
    },
    {
      h: 10,
      i: 'website|e567f890-1234-5678-9012-efabcdefabcd',
      w: 10,
      x: 0,
      y: 0,
    },
    {
      h: 10,
      i: 'website|f678g901-2345-6789-0123-fabcdefabcdef',
      w: 10,
      x: 0,
      y: 0,
    },
  ],
};

var layouts3 = {
  lg: [
    {
      h: 10,
      i: 'website|g789h012-3456-7890-1234-ghabcdefabcd',
      w: 10,
      x: 0,
      y: 0,
    },
    {
      h: 10,
      i: 'website|h890i123-4567-8901-2345-habcdefabcdef',
      w: 10,
      x: 0,
      y: 0,
    },
    {
      h: 10,
      i: 'folder|i901j234-5678-9012-3456-iabcdefabcdef',
      w: 10,
      x: 0,
      y: 0,
    },
  ],
};

const initialSlidesStates = {
  'website|a123b456-7890-1234-5678-abcdefabcdef': {
    name: 'Google',
    url: 'https://www.google.com',
    iconUrl: 'https://www.google.com/favicon.ico',
  },
  'folder|b234c567-8901-2345-6789-bacdefbacdef': {
    name: 'Social Media',
    iconUrl:
      'https://plus.unsplash.com/premium_photo-1681412205238-8171ccaca82b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    websites: [
      {
        name: 'Twitter',
        url: 'https://twitter.com',
        iconUrl: 'https://twitter.com/favicon.ico',
      },
      {
        name: 'Facebook',
        url: 'https://facebook.com',
        iconUrl: 'https://facebook.com/favicon.ico',
      },
    ],
  },
  'website|c345d678-9012-3456-7890-cdefabcdefab': {
    name: 'GitHub',
    url: 'https://github.com',
    iconUrl: 'https://github.com/favicon.ico',
  },
  'website|g789h012-3456-7890-1234-ghabcdefabcd': {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    iconUrl: 'https://stackoverflow.com/favicon.ico',
  },
  'website|h890i123-4567-8901-2345-habcdefabcdef': {
    name: 'YouTube',
    url: 'https://youtube.com',
    iconUrl: 'https://youtube.com/favicon.ico',
  },
  'folder|i901j234-5678-9012-3456-iabcdefabcdef': {
    name: 'Productivity',
    iconUrl: 'https://example.com/folder-icon.png',
    websites: [
      {
        name: 'Notion',
        url: 'https://notion.so',
        iconUrl: 'https://notion.so/favicon.ico',
      },
      {
        name: 'Trello',
        url: 'https://trello.com',
        iconUrl: 'https://trello.com/favicon.ico',
      },
    ],
  },
  'folder|d456e789-0123-4567-8901-defabcdefabc': {
    name: 'News',
    iconUrl: 'https://example.com/folder-icon.png',
    websites: [
      {
        name: 'CNN',
        url: 'https://cnn.com',
        iconUrl: 'https://cnn.com/favicon.ico',
      },
      {
        name: 'BBC',
        url: 'https://bbc.com',
        iconUrl: 'https://bbc.com/favicon.ico',
      },
    ],
  },
  'website|e567f890-1234-5678-9012-efabcdefabcd': {
    name: 'Amazon',
    url: 'https://amazon.com',
    iconUrl: 'https://amazon.com/favicon.ico',
  },
  'website|f678g901-2345-6789-0123-fabcdefabcdef': {
    name: 'Netflix',
    url: 'https://netflix.com',
    iconUrl: 'https://netflix.com/favicon.ico',
  },
};

import { v4 as uuidv4 } from 'uuid';

type PortalioStore = {
  slides: SlidesT;
  slidesStates: slidesStatesT;
  reOrder: boolean;
  currentBreakpoint: BreakpointT;
  currentSlideId: string | null;

  addSlide: (slideName: string) => void;
  updateSlideName: (id: string, newSlideName: string) => void;
  deleteSlide: (id: string) => void;

  setCurrentSlideId: (id: string | null) => void;
  updateSlideState: (id: string, newSlideState: SlideStatesT) => void;
  deleteSlideState: (id: string) => void;
  addFolder: (newFolder: FolderStateT) => void;
  addWebsite: (newWebsite: WebsiteStateT) => void;
  setReOrder: (newReOrder: boolean) => void;
};

const usePortalioStore = create<PortalioStore>(
  (set): PortalioStore => ({
    reOrder: false,
    currentBreakpoint: 'lg',
    currentSlideId: 'slide-c345d678-9012-3456-7890-cdefabcdefab',
    slides: {
      'slide-c345d678-9012-3456-7890-cdefabcdefab': {
        name: 'slide-1',
        layouts: layouts1,
      },
      'slide-a123b456-7890-1234-5678-abcdefabcdef': {
        name: 'slide-2',
        layouts: layouts2,
      },
      'slide-b234c567-8901-2345-6789-bacdefbacdef': {
        name: 'slide-3',
        layouts: layouts3,
      },
    },
    slidesStates: initialSlidesStates,
    addSlide: (slideName: string) =>
      set((state) => {
        const newSlideId = `slide-${uuidv4()}`;
        const newSlides = {
          ...state.slides,
          [newSlideId]: {
            name: slideName,
            layouts: { lg: [] },
          },
        };
        return { ...state, slides: newSlides, currentSlideId: newSlideId };
      }),
    deleteSlide: (id: string) =>
      set((state) => {
        const newSlides = { ...state.slides };
        let newCurrentSlideId = state.currentSlideId;

        const slidesIds = Object.keys(state.slides);
        const currentSlideIdIndex = slidesIds.indexOf(state.currentSlideId as string);

        if (slidesIds.length === 1) {
          newCurrentSlideId = null;
        } else if (currentSlideIdIndex !== 0) {
          newCurrentSlideId = slidesIds[currentSlideIdIndex - 1];
        } else {
          newCurrentSlideId = slidesIds[currentSlideIdIndex + 1];
        }
        delete newSlides[id];
        return {
          ...state,
          slides: newSlides,
          currentSlideId: newCurrentSlideId,
        };
      }),
    updateSlideName: (id: string, newSlideName: string) =>
      set((state) => {
        if (!state.slides[id]) {
          return state;
        }

        const newSlides = { ...state.slides };
        newSlides[id].name = newSlideName;

        return {
          ...state,
          slides: newSlides,
        };
      }),
    setCurrentSlideId: (id: string | null) =>
      set((state) => {
        return { ...state, currentSlideId: id };
      }),
    updateSlideState: (id: string, newSlideState: SlideStatesT) =>
      set((state) => {
        const type = id.split('|')[0];
        const newSlidesStates = { ...state.slidesStates };
        let newState = newSlidesStates[id];

        if (type === 'folder') {
          newState = { ...newState, ...newSlideState } as FolderStateT;
        } else {
          newState = { ...newState, ...newSlideState } as WebsiteStateT;
        }

        return {
          ...state,
          slidesStates: { ...newSlidesStates, [id]: newState },
        };
      }),
    deleteSlideState: (id: string) =>
      set((state) => {
        const newSlidesStates = { ...state.slidesStates };
        delete newSlidesStates[id];
        const newSlides = { ...state.slides };
        const newLayouts = newSlides[state.currentSlideId as string].layouts;
        Object.keys(newLayouts).map((breakpoint: string) => {
          const els = newLayouts[breakpoint].filter((item) => item.i !== id);
          newLayouts[breakpoint] = els;
        });
        newSlides[state.currentSlideId as string].layouts = newLayouts;

        return { ...state, slidesStates: newSlidesStates, slides: newSlides };
      }),
    addFolder: (newFolder: FolderStateT) =>
      set((state) => {
        const newState = { ...state };
        const newFolderId = `folder|${uuidv4()}`;
        newState.slides[newState.currentSlideId as string].layouts[
          newState.currentBreakpoint as BreakpointT
        ].push({
          h: 10,
          i: newFolderId,
          w: 10,
          x: 0,
          y: 0,
        });
        newState.slidesStates[newFolderId] = { ...newFolder };
        return { ...newState };
      }),
    addWebsite: (newWebsite: WebsiteStateT) =>
      set((state) => {
        const newState = { ...state };
        const newWebsiteId = `website|${uuidv4()}`;
        newState.slides[newState.currentSlideId as string].layouts[
          newState.currentBreakpoint as BreakpointT
        ].push({
          h: 10,
          i: newWebsiteId,
          w: 10,
          x: 0,
          y: 0,
        });
        newState.slidesStates[newWebsiteId] = { ...newWebsite };
        return { ...newState };
      }),
    setReOrder: (newReOrder: boolean) =>
      set((state) => {
        return { ...state, reOrder: newReOrder };
      }),
  }),
);

export default usePortalioStore;
