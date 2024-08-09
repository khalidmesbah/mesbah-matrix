import { getAyahInfo } from '@/lib/server-actions/quran-actions';
import { checkIsNextNumberOfAyahValid, checkIsPrevNumberOfAyahValid } from '@/public/data/quran';
import { AyahRequestType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetAyahQuery = ({
  numberOfAyah,
  recitation,
  translation,
  tafsir,
  transliteration,
}: AyahRequestType) => {
  useQuery({
    queryKey: [
      'quran',
      checkIsNextNumberOfAyahValid(numberOfAyah, 1),
      recitation,
      translation,
      tafsir,
      transliteration,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsNextNumberOfAyahValid(numberOfAyah, 1),
        recitation,
        translation,
        tafsir,
        transliteration,
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: [
      'quran',
      checkIsPrevNumberOfAyahValid(numberOfAyah, 1),
      recitation,
      translation,
      tafsir,
      transliteration,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsPrevNumberOfAyahValid(numberOfAyah, 1),
        recitation,
        translation,
        tafsir,
        transliteration,
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: [
      'quran',
      checkIsNextNumberOfAyahValid(numberOfAyah, 2),
      recitation,
      translation,
      tafsir,
      transliteration,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsNextNumberOfAyahValid(numberOfAyah, 2),
        recitation,
        translation,
        tafsir,
        transliteration,
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: [
      'quran',
      checkIsPrevNumberOfAyahValid(numberOfAyah, 2),
      recitation,
      translation,
      tafsir,
      transliteration,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsPrevNumberOfAyahValid(numberOfAyah, 2),
        recitation,
        translation,
        tafsir,
        transliteration,
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: [
      'quran',
      checkIsNextNumberOfAyahValid(numberOfAyah, 3),
      recitation,
      translation,
      tafsir,
      transliteration,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsNextNumberOfAyahValid(numberOfAyah, 3),
        recitation,
        translation,
        tafsir,
        transliteration,
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: [
      'quran',
      checkIsPrevNumberOfAyahValid(numberOfAyah, 3),
      recitation,
      translation,
      tafsir,
      transliteration,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsPrevNumberOfAyahValid(numberOfAyah, 3),
        recitation,
        translation,
        tafsir,
        transliteration,
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return useQuery({
    queryKey: ['quran', numberOfAyah, recitation, translation, tafsir, transliteration],
    queryFn: () => getAyahInfo({ numberOfAyah, recitation, translation, tafsir, transliteration }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
