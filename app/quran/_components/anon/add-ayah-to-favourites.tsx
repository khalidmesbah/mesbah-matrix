'use client';

import Icon from '@/components/icon';
import { cn } from '@/lib/utils';
import useQuranStore from '@/stores/quran';
import { AyahT, FavouriteAyahT } from '@/types/quran';
import { Heart } from 'lucide-react';

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

  const { toggleAyahFavouriteState, favouriteAyahs } = useQuranStore((state) => state);
  const isFavourite = favouriteAyahs
    ? favouriteAyahs[surahEnglishName]
        ?.map((q: FavouriteAyahT) => q.numberOfAyah)
        .includes(props.numberOfAyah)
    : false;

  return (
    <Icon
      description="Heart"
      onClick={() => toggleAyahFavouriteState(favouriteAyah)}
      icon={<Heart className={cn({ 'fill-primary stroke-primary': isFavourite })} />}
    />
  );
}
