'use client';

import Icon from '@/components/icon';
import { ParticlesLoader } from '@/components/particles-loader';
import FailedToFetchFavouriteAyahs from '@/components/quran/failed-to-fetch-favourite-ayahs';
import FavouriteAyahsNotFound from '@/components/quran/favourite-ayahs-not-found';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetQuranQuery } from '@/hooks/use-quran';
import { AmiriFont } from '@/lib/fonts/fonts';
import { getNewAyahs, getNewSurahs } from '@/lib/utils/quran';
import useQuranStore from '@/stores/quran';
import { FavouriteAyahT } from '@/types/quran';
import { Folder } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FavouritesFolder() {
  const { data: quran, isLoading, isError } = useGetQuranQuery();
  const { setNumberOfAyah, surah, setSurah } = useQuranStore((state) => state);
  const [surahs, setSurahs] = useState<{ englishName: string; numberOfSurah: number }[]>([]);
  const [ayahs, setAyahs] = useState<FavouriteAyahT[]>([]);

  useEffect(() => {
    if (!quran || !quran.favouriteAyahs || isLoading || isError) return;
    setSurahs(getNewSurahs(quran.favouriteAyahs));
    setAyahs(getNewAyahs(quran.favouriteAyahs, surah));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surah, quran]);

  return (
    <Dialog>
      <Icon
        description="Folder"
        icon={
          <DialogTrigger asChild>
            <Folder />
          </DialogTrigger>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Favourite Ayahs</DialogTitle>
          <DialogDescription>
            Browse your favourite ayahs, click on the ayah number to change the ayah.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <ParticlesLoader />
        ) : isError || !quran || !quran.favouriteAyahs ? (
          <FailedToFetchFavouriteAyahs />
        ) : surahs.length === 0 ? (
          <FavouriteAyahsNotFound />
        ) : (
          <div className="flex flex-col gap-4">
            <Label htmlFor="surah" className="fc gap-2">
              <p className="text-base">Surah:</p>
              <Select
                value={Object.keys(quran.favouriteAyahs).includes(surah) ? surah : ''}
                onValueChange={setSurah}
              >
                <SelectTrigger id="surah">
                  <SelectValue placeholder="Select a Surah" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {surahs.map((surah: { englishName: string; numberOfSurah: number }) => (
                    <SelectItem value={surah.englishName} key={surah.englishName}>
                      {surah.numberOfSurah} - {surah.englishName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Label>
            <ScrollArea className="max-h-60 rounded-md">
              <div className="flex max-h-60 flex-col gap-2">
                {ayahs.map((ayah) => (
                  <DialogClose key={ayah.numberInSurah}>
                    <p
                      onClick={() => setNumberOfAyah(ayah.numberOfAyah)}
                      className={`rounded-md bg-secondary p-2 pt-4 text-base/8 transition-colors hover:bg-secondary/80 ${AmiriFont.className}`}
                      lang="ar"
                      dir="rtl"
                    >
                      {ayah.text}
                    </p>
                  </DialogClose>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
