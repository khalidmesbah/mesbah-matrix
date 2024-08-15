export type AyahT = {
  text: string;
  translation: string;
  tafsir: string;
  transliteration: string;

  numberInSurah: number;
  numberOfAyahs: number;
  numberOfSurah: number;

  audio: string;
  audioSecondary: string[];

  surahEnglishName: string;

  revelationType: string;
  juz: string;
  page: string;
  hizbQuarter: string;
};

export type AyahRequestT = {
  numberOfAyah: number;
  recitation: string;
  translation: string;
  tafsir: string;
  transliteration: string;
};

export type AyahNumberRequestT = {
  numberOfAyah: string;
};

export type FavouriteAyahT = {
  text: string;
  numberOfAyah: number;
  numberInSurah: number;
  numberOfSurah: number;
  surahEnglishName: string;
};

export type NoteT = {
  text: string;
};

export type NotesT = {
  [key: string]: NoteT[];
};

export type QuranT = {
  favouriteAyahs: FavouriteAyahsT;
  notes: NotesT;
};

export type FavouriteAyahsT = {
  [key: string]: FavouriteAyahT[];
};
