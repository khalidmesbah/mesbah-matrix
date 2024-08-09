import { AyahRequestType, AyahType } from '@/types';

export const getAyahInfo = async ({
  numberOfAyah,
  recitation,
  translation,
  tafsir,
  transliteration,
}: AyahRequestType): Promise<AyahType | undefined> => {
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/ayah/${numberOfAyah}/editions/${recitation},${translation},${tafsir},${transliteration}`,
    );
    const json = await res.json();

    await fetch(json.data[0].audio, {
      cache: 'force-cache',
      mode: 'no-cors',
    });

    const ayah: AyahType = {
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

export const getImage = async (surah: number, ayah: number) => {
  const res = await fetch(`https://cdn.islamic.network/quran/images/${surah}_${ayah}.png`);
  const blob = await res.blob();
  return blob;
};
