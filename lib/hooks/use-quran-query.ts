import { getAyahInfo } from '@/lib/server-actions/quran-actions';
import { checkIsNextNumberOfAyahValid, checkIsPrevNumberOfAyahValid } from '@/public/data/quran';
import { AyahRequestType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetAyahQuery = ({
  numberOfAyah,
  recitation,
  translation,
  interpretation,
}: AyahRequestType) => {
  useQuery({
    queryKey: [
      'quran',
      checkIsNextNumberOfAyahValid(numberOfAyah, 1),
      recitation,
      translation,
      interpretation,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsNextNumberOfAyahValid(numberOfAyah, 1),
        recitation,
        translation,
        interpretation,
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
      interpretation,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsPrevNumberOfAyahValid(numberOfAyah, 1),
        recitation,
        translation,
        interpretation,
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
      interpretation,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsNextNumberOfAyahValid(numberOfAyah, 2),
        recitation,
        translation,
        interpretation,
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
      interpretation,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsPrevNumberOfAyahValid(numberOfAyah, 2),
        recitation,
        translation,
        interpretation,
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
      interpretation,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsNextNumberOfAyahValid(numberOfAyah, 3),
        recitation,
        translation,
        interpretation,
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
      interpretation,
    ],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah: checkIsPrevNumberOfAyahValid(numberOfAyah, 3),
        recitation,
        translation,
        interpretation,
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return useQuery({
    queryKey: ['quran', numberOfAyah, recitation, translation, interpretation],
    queryFn: () => getAyahInfo({ numberOfAyah, recitation, translation, interpretation }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
