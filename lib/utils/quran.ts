import { FavouriteAyahT, FavouriteAyahsT } from '@/types/quran';

export const toggle = (favouriteAyahs: FavouriteAyahsT, favouriteAyah: FavouriteAyahT) => {
  let newFavouriteAyahsInSurah: FavouriteAyahT[] =
    favouriteAyahs[favouriteAyah.surahEnglishName] || [];

  const isFavourite = newFavouriteAyahsInSurah
    .map((ayah) => ayah.numberOfAyah)
    .includes(favouriteAyah.numberOfAyah);

  if (isFavourite) {
    newFavouriteAyahsInSurah = newFavouriteAyahsInSurah.filter(
      (q) => q.numberOfAyah !== favouriteAyah.numberOfAyah,
    );
  } else {
    newFavouriteAyahsInSurah.push(favouriteAyah);
  }

  if (newFavouriteAyahsInSurah.length === 0) {
    delete favouriteAyahs[favouriteAyah.surahEnglishName];
  } else {
    favouriteAyahs[favouriteAyah.surahEnglishName] = newFavouriteAyahsInSurah;
  }

  return newFavouriteAyahsInSurah;
};

export const getNewSurahs = (
  favouriteAyahs: FavouriteAyahsT,
): { englishName: string; numberOfSurah: number }[] =>
  Object.keys(favouriteAyahs)
    .map((surah) => ({
      numberOfSurah: favouriteAyahs[surah][0].numberOfSurah,
      englishName: favouriteAyahs[surah][0].surahEnglishName,
    }))
    .sort((a, b) => a.numberOfSurah - b.numberOfSurah);

export const getNewAyahs = (favouriteAyahs: FavouriteAyahsT, surah: string): FavouriteAyahT[] => {
  if (!Object.keys(favouriteAyahs).includes(surah)) return [];
  return favouriteAyahs[surah].sort((a, b) => a.numberInSurah - b.numberInSurah);
};
