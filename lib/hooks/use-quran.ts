import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAyahInfo, getQuran, toggleAyahFavouriteState } from '@/actions/quran';
import { checkIsNextNumberOfAyahValid, checkIsPrevNumberOfAyahValid } from '@/public/data/quran';
import type { AyahRequestT, FavouriteAyahsT, FavouriteAyahT, QuranT } from '@/types/quran';

export const useGetAyahQuery = ({
  numberOfAyah,
  recitation,
  translation,
  tafsir,
  transliteration,
}: AyahRequestT) => {
  useQuery({
    queryKey: [
      'ayah',
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
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: [
      'ayah',
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
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: [
      'ayah',
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
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: [
      'ayah',
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
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
  // useQuery({
  //   queryKey: [
  //     'ayah',
  //     checkIsNextNumberOfAyahValid(numberOfAyah, 3),
  //     recitation,
  //     translation,
  //     tafsir,
  //     transliteration,
  //   ],
  //   queryFn: () =>
  //     getAyahInfo({
  //       numberOfAyah: checkIsNextNumberOfAyahValid(numberOfAyah, 3),
  //       recitation,
  //       translation,
  //       tafsir,
  //       transliteration,
  //     }),
  //   staleTime: Infinity,
  //   refetchOnWindowFocus: false,
  // });
  // useQuery({
  //   queryKey: [
  //     'ayah',
  //     checkIsPrevNumberOfAyahValid(numberOfAyah, 3),
  //     recitation,
  //     translation,
  //     tafsir,
  //     transliteration,
  //   ],
  //   queryFn: () =>
  //     getAyahInfo({
  //       numberOfAyah: checkIsPrevNumberOfAyahValid(numberOfAyah, 3),
  //       recitation,
  //       translation,
  //       tafsir,
  //       transliteration,
  //     }),
  //   staleTime: Infinity,
  //   refetchOnWindowFocus: false,
  // });

  return useQuery({
    queryKey: ['ayah', numberOfAyah, recitation, translation, tafsir, transliteration],
    queryFn: () =>
      getAyahInfo({
        numberOfAyah,
        recitation,
        translation,
        tafsir,
        transliteration,
      }),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
};

export const useGetQuranQuery = () => {
  return useQuery({
    queryKey: ['quran'],
    queryFn: () => getQuran(),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useToggleFavouriteAyahsMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (favouriteAyah: FavouriteAyahT) => toggleAyahFavouriteState(favouriteAyah),
    mutationKey: ['quran'],
    onMutate: async (favouriteAyah) => {
      await queryClient.cancelQueries({ queryKey: ['quran'] });

      const previousQuran = queryClient.getQueryData(['quran']);

      queryClient.setQueryData(['quran'], (old: QuranT) => {
        const quran: QuranT = structuredClone(old);
        const newFavouriteAyahs: FavouriteAyahsT = quran.favouriteAyahs;

        let newFavouriteAyahsInSurah: FavouriteAyahT[] =
          newFavouriteAyahs[favouriteAyah.surahEnglishName] || [];

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
          delete newFavouriteAyahs[favouriteAyah.surahEnglishName];
        } else {
          newFavouriteAyahs[favouriteAyah.surahEnglishName] = newFavouriteAyahsInSurah;
        }

        return { ...quran, favouriteAyahs: newFavouriteAyahs };
      });

      return { previousFavouriteAyahs: previousQuran };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['quran'], context?.previousFavouriteAyahs);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['quran'] });
    },
  });
};
