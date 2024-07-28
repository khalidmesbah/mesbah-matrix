import { getAyahInfo } from '@/lib/server-actions/quran-actions';
import { AyahRequestType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetAyahQuery = ({
  numberOfAyah,
  recitation,
  translation,
  interpretation,
}: AyahRequestType) => {
  useQuery({
    queryKey: ['quran', numberOfAyah + 1, recitation, translation, interpretation],
    queryFn: () =>
      getAyahInfo({ numberOfAyah: numberOfAyah + 1, recitation, translation, interpretation }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: ['quran', numberOfAyah - 1, recitation, translation, interpretation],
    queryFn: () =>
      getAyahInfo({ numberOfAyah: numberOfAyah - 1, recitation, translation, interpretation }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: ['quran', numberOfAyah + 2, recitation, translation, interpretation],
    queryFn: () =>
      getAyahInfo({ numberOfAyah: numberOfAyah + 2, recitation, translation, interpretation }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: ['quran', numberOfAyah - 2, recitation, translation, interpretation],
    queryFn: () =>
      getAyahInfo({ numberOfAyah: numberOfAyah - 2, recitation, translation, interpretation }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: ['quran', numberOfAyah + 3, recitation, translation, interpretation],
    queryFn: () =>
      getAyahInfo({ numberOfAyah: numberOfAyah + 3, recitation, translation, interpretation }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: ['quran', numberOfAyah - 3, recitation, translation, interpretation],
    queryFn: () =>
      getAyahInfo({ numberOfAyah: numberOfAyah - 3, recitation, translation, interpretation }),
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
