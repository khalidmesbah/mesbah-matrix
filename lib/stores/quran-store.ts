import {
  INTERPRETATIONS,
  MAXIMUM_NUMBER_OF_AYAHS,
  MINIMUM_NUMBER_OF_AYAHS,
  RECITATIONS,
  TRANSLATIONS,
  getRandomAyah,
} from '@/public/data/quran';
import { Howl } from 'howler';

import { create } from 'zustand';

type SettingsType = {
  recitation: string;
  translation: string;
  interpretation: string;
  rate: number;
  volume: number;
  mode: { autoplay: boolean; loop: boolean };
  isSoundPlaying: boolean;
};

const initialSettings: SettingsType = {
  recitation: RECITATIONS[0].value,
  translation: TRANSLATIONS[0].value,
  interpretation: INTERPRETATIONS[0].value,
  rate: 4,
  volume: 0.5,
  mode: { autoplay: false, loop: true },
  isSoundPlaying: false,
};

// autoRepeat => loop
// playbackRate => rate

const initialNumberOfAyah = getRandomAyah();
const initialAudio = new Howl({ src: [''] });

type QuranStore = {
  numberOfAyah: number;
  audio: Howl;
  isTranslation: boolean;
  isInterpretation: boolean;
  settings: SettingsType;
  continuousPlay: boolean;
  isEnded: boolean;
  getNextAyah: () => void;
  getPrevAyah: () => void;
  setIsSoundPlaying: (status: boolean) => void;
  setAudio: (newAudio: Howl) => void;
  setAutoplay: (status: boolean) => void;
  setPlaybackRate: (newRate: number) => void;
  setLoop: (status: boolean) => void;
  setIsTranslation: (status: boolean) => void;
  setIsInterpretation: (status: boolean) => void;
  setIsContnuousPlay: (status: boolean) => void;
  setIsEnded: (status: boolean) => void;
};

const useQuranStore = create<QuranStore>(
  (set): QuranStore => ({
    numberOfAyah: initialNumberOfAyah,
    audio: initialAudio,
    settings: initialSettings,
    isTranslation: true,
    isInterpretation: true,
    continuousPlay: false,
    isEnded: false,
    getNextAyah: () =>
      set((state) => {
        const newState = { ...state };
        const newNumberOfAyah = state.numberOfAyah + 1;
        if (newNumberOfAyah > MAXIMUM_NUMBER_OF_AYAHS) return newState;
        newState.numberOfAyah = newNumberOfAyah;
        return newState;
      }),
    setIsSoundPlaying: (status: boolean) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.isSoundPlaying = status;
        return newState;
      }),
    getPrevAyah: () =>
      set((state) => {
        const newState = { ...state };
        const newNumberOfAyah = state.numberOfAyah - 1;
        if (newNumberOfAyah < MINIMUM_NUMBER_OF_AYAHS) return newState;
        newState.numberOfAyah = newNumberOfAyah;
        return newState;
      }),
    setAudio: (newAudio: Howl) =>
      set((state) => {
        const newState = { ...state };
        newState.audio = newAudio;
        return newState;
      }),
    setAutoplay: (status: boolean) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.mode.autoplay = status;
        return newState;
      }),
    setPlaybackRate: (newRate: number) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.rate = newRate;
        return newState;
      }),
    setLoop: (status: boolean) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.mode.loop = status;
        return newState;
      }),
    setIsInterpretation: (status: boolean) =>
      set((state) => {
        const newState = { ...state };
        newState.isInterpretation = status;
        return newState;
      }),
    setIsTranslation: (status: boolean) =>
      set((state) => {
        const newState = { ...state };
        newState.isTranslation = status;
        return newState;
      }),
    setIsContnuousPlay: (status: boolean) =>
      set((state) => {
        const newState = { ...state };
        newState.continuousPlay = status;
        return newState;
      }),
    setIsEnded: (status: boolean) =>
      set((state) => {
        const newState = { ...state };
        newState.isEnded = status;
        return newState;
      }),
  }),
);

export default useQuranStore;
