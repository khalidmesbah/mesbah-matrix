import { AyahRequestType, AyahType } from '@/types';

export const getTheAudio = async (
  edition: string,
  numOfAyah: number,
): Promise<HTMLAudioElement> => {
  let audioUrl;
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${numOfAyah}/${edition}`);
    const json = await res.json();
    audioUrl = json.data.audio;
  } catch (error) {
    console.error(error);
  }
  return new Audio(audioUrl);
};

export const getAyahInfo = async ({
  numberOfAyah,
  recitation,
  translation,
  interpretation,
}: AyahRequestType): Promise<AyahType | undefined> => {
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/ayah/${numberOfAyah}/editions/${recitation},${translation},${interpretation}`,
    );
    const json = await res.json();

    await fetch(json.data[0].audio, {
      cache: 'force-cache',
      mode: 'no-cors',
    });

    const ayah: AyahType = {
      text: json.data[0].text,
      translation: json.data[1].text,
      interpretation: json.data[2].text,

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

export const getTheInterpretation = async (interpretation: string, numOfAyah: number) => {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${numOfAyah}/${interpretation}`);
    const json = await res.json();
    return json.data.text;
  } catch (error) {
    console.error(error);
  }
};

export const getNumOfAyahsInSurahOptions = async (numOfSurah: number) => {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${numOfSurah}:1`);
    const json = await res.json();
    // const numOfAyahsInSurahOptions = {
    //   numOfAyahsInSurahOptions,
    //   numOfFirstAyah,
    // };

    return {
      numOfAyahsInSurahOptions: Array.from(
        { length: json.data.surah.numberOfAyahs },
        (_value, index) => ({
          label: `${index + 1}`,
          value: index + 1,
        }),
      ),
      numOfFirstAyah: json.data.number - 1,
    };
  } catch (error) {
    console.error(`couldn't getNumOfAyahsInSurahOptions`);
  }
};
// TODO: delete the unwanted actions
