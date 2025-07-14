'use client';

import { Heart } from 'lucide-react';
import Icon from '@/components/icon';
import { useGetQuranQuery, useToggleFavouriteAyahsMutate } from '@/hooks/use-quran';
import { cn } from '@/lib/utils';
import type { AyahT, FavouriteAyahsT, FavouriteAyahT } from '@/types/quran';

type AddAyahToFavouritesType = {
  ayah: AyahT;
  numberOfAyah: number;
};
export default function AddAyahToFavourites(props: AddAyahToFavouritesType) {
  const { text, numberInSurah, numberOfSurah, surahEnglishName } = props.ayah;
  const favouriteAyah: FavouriteAyahT = {
    text,
    numberInSurah,
    numberOfSurah,
    surahEnglishName,
    numberOfAyah: props.numberOfAyah,
  };

  const { data: quran } = useGetQuranQuery();
  const { mutate: toggleAyahFavouriteState, isPending } = useToggleFavouriteAyahsMutate();
  const favouriteAyahs = quran?.favouriteAyahs as FavouriteAyahsT;
  const isFavourite = favouriteAyahs
    ? favouriteAyahs[surahEnglishName]
        ?.map((q: FavouriteAyahT) => q.numberOfAyah)
        .includes(props.numberOfAyah)
    : false;

  return (
    <Icon
      description="Heart"
      onClick={() => toggleAyahFavouriteState(favouriteAyah)}
      loading={isPending}
      disabled={isPending}
      icon={
        <Heart
          className={cn({
            'fill-primary stroke-primary transition-colors': isFavourite,
          })}
        />
      }
    />
  );
}
