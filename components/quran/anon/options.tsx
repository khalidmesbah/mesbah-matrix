'use client';

import Icon from '@/components/icon';
import AddAyahToFavourites from '@/components/quran/anon/add-ayah-to-favourites';
import FavouritesFolder from '@/components/quran/anon/favourites-folder';
import { AyahImage } from '@/components/quran/ayah-image';
import Mode from '@/components/quran/mode-button';
import PlayPauseButton from '@/components/quran/play-pause-button';
import Settings from '@/components/quran/settings';
import ShareButton from '@/components/share-button';
import { AyahT } from '@/types/quran';
import { ArrowLeft, ArrowRight, LoaderIcon, Shuffle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

type OptionsProps = {
  getPrevAyah: () => void;
  getNextAyah: () => void;
  getRandomAyah: () => void;
  ayah: AyahT;
  isLoading: boolean;
  numberOfAyah: number;
  audio: any;
};

export default function Options(props: OptionsProps) {
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col gap-2 rounded-md p-2">
      <div className="flex items-center justify-center gap-2">
        <Icon description="Previous Ayah" onClick={props.getPrevAyah} icon={<ArrowLeft />} />
        <AddAyahToFavourites ayah={props.ayah} numberOfAyah={props.numberOfAyah} />
        {props.isLoading ? (
          <Icon description="Loading" icon={<LoaderIcon />} />
        ) : (
          <PlayPauseButton />
        )}
        <Icon description="Shuffle" onClick={props.getRandomAyah} icon={<Shuffle />} />
        <Icon description="Next Ayah" onClick={props.getNextAyah} icon={<ArrowRight />} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <FavouritesFolder />
        <Mode />
        <ShareButton
          url={`${process.env.NEXT_PUBLIC_MESBAH_MATRIX_URL}/quran?surah=${searchParams.get('surah')}&ayah=${searchParams.get('ayah')}`}
          title={`${props.ayah.surahEnglishName}: ${props.ayah.text}`}
          variant="outline"
          description="Share Ayah"
        />
        <AyahImage surah={props.ayah.numberOfSurah} ayah={props.ayah.numberInSurah} />
      </div>
      <Settings />
    </div>
  );
}
