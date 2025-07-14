'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';
import type { AyahRequestT, AyahT, FavouriteAyahsT, FavouriteAyahT, QuranT } from '@/types/quran';
import { toggle } from '@/utils/quran';

export const getAyahInfo = async ({
  numberOfAyah,
  recitation,
  translation,
  tafsir,
  transliteration,
}: AyahRequestT): Promise<AyahT | undefined> => {
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/ayah/${numberOfAyah}/editions/${recitation},${translation},${tafsir},${transliteration}`,
    );
    const json = await res.json();

    await fetch(json.data[0].audio, {
      cache: 'force-cache',
      mode: 'no-cors',
    });

    const ayah: AyahT = {
      text: json.data[0].text,
      translation: json.data[1].text,
      tafsir: json.data[2].text,
      transliteration: json.data[3].text,

      numberInSurah: json.data[0].numberInSurah,
      numberOfAyahs: json.data[0].surah.numberOfAyahs,
      numberOfSurah: json.data[0].surah.number,

      audio: json.data[0].audio,
      audioSecondary: json.data[0].audioSecondary,

      surahEnglishName: json.data[0].surah.englishName,

      revelationType: json.data[0].surah.revelationType,
      juz: json.data[0].juz,
      page: json.data[0].page,
      hizbQuarter: json.data[0].hizbQuarter,
    };
    return ayah;
  } catch (error) {
    console.error(error);
  }
};

export const getQuran = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resQuran = await getDoc(doc(db, 'users', user.id, 'data', 'quran'));
    let quran = resQuran.data() as QuranT;

    if (!quran) {
      quran = { favouriteAyahs: {}, notes: {} };
      await setDoc(doc(db, 'users', user.id, 'data', 'quran'), quran);
    }

    return quran;
  } catch (error) {
    console.error(error);
  }
};

export const toggleAyahFavouriteState = async (favouriteAyah: FavouriteAyahT): Promise<boolean> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const resQuran = await getDoc(doc(db, 'users', user.id, 'data', 'quran'));
    const quran = resQuran.data() as QuranT;
    const favouriteAyahs = quran.favouriteAyahs as FavouriteAyahsT;

    toggle(favouriteAyahs, favouriteAyah);

    if (!favouriteAyahs[favouriteAyah.surahEnglishName]) {
      await setDoc(doc(db, 'users', user.id, 'data', 'quran'), {
        favouriteAyahs,
        notes: quran.notes,
      });
    } else {
      await setDoc(doc(db, 'users', user.id, 'data', 'quran'), { favouriteAyahs }, { merge: true });
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
