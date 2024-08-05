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
// Types
type ModeType = 'loop' | 'continuous' | 'once';
type FontType = '__className_a12e74' | '__className_af25f8';
type SettingsType = {
  recitation: string;
  translation: string;
  interpretation: string;
  rate: number;
  volume: number;
  autoplay: boolean;
  mode: ModeType;
  isSoundPlaying: boolean;
  font: FontType;
};
type QuranStore = {
  numberOfAyah: number;
  audio: Howl;
  isTranslation: boolean;
  isInterpretation: boolean;
  settings: SettingsType;
  continuousPlay: boolean;
  isEnded: boolean;
  setFont: (newFont: FontType) => void;
  getNextAyah: () => void;
  getPrevAyah: () => void;
  setNumberOfAyah: (numberOfAyah: number) => void;
  setIsSoundPlaying: (status: boolean) => void;
  setAudio: (newAudio: Howl) => void;
  setAutoplay: (status: boolean) => void;
  setRate: (newRate: number) => void;
  setMode: (newMode: ModeType) => void;
  setIsTranslation: (status: boolean) => void;
  setIsInterpretation: (status: boolean) => void;
  setIsEnded: (status: boolean) => void;
  setTranslation: (newTranslation: string) => void;
  setInterpretation: (newInterpretation: string) => void;
  setRecitation: (newRecitation: string) => void;
  setVolume: (newVolume: number) => void;
};
// Intitils
const initialNumberOfAyah = getRandomAyah();
const initialAudio = new Howl({ src: [''] });
const initialSettings: SettingsType = {
  recitation: RECITATIONS[0].value,
  translation: TRANSLATIONS[0].value,
  interpretation: INTERPRETATIONS[0].value,
  rate: 1,
  volume: 0.5,
  mode: 'once',
  autoplay: false,
  isSoundPlaying: false,
  font: '__className_a12e74',
};
// Store
const useQuranStore = create<QuranStore>(
  (set): QuranStore => ({
    numberOfAyah: initialNumberOfAyah,
    audio: initialAudio,
    settings: initialSettings,
    isTranslation: true,
    isInterpretation: true,
    continuousPlay: false,
    isEnded: false,
    setFont: (newFont: FontType) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.font = newFont;
        return newState;
      }),
    getNextAyah: () =>
      set((state) => {
        const newState = { ...state };
        const newNumberOfAyah = state.numberOfAyah + 1;
        if (newNumberOfAyah > MAXIMUM_NUMBER_OF_AYAHS) return newState;
        newState.numberOfAyah = newNumberOfAyah;
        return newState;
      }),
    setNumberOfAyah: (numberOfAyah: number) =>
      set((state) => {
        const newState = { ...state };
        newState.numberOfAyah = numberOfAyah;
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
        newState.settings.autoplay = status;
        return newState;
      }),
    setRate: (newRate: number) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.rate = newRate;
        return newState;
      }),
    setMode: (newMode: ModeType) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.mode = newMode;
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

    setTranslation: (newTranslation: string) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.translation = newTranslation;
        return newState;
      }),
    setInterpretation: (newInterpretation: string) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.interpretation = newInterpretation;
        return newState;
      }),
    setVolume: (newVolume: number) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.volume = newVolume;
        return newState;
      }),
    setRecitation: (newRecitation: string) =>
      set((state) => {
        const newState = { ...state };
        newState.settings.recitation = newRecitation;
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
