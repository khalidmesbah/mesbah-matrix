'use client';

import Icon from '@/components/icon';
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
import { AmiriFont } from '@/lib/fonts/fonts';
import useQuranStore from '@/stores/quran';
import { getNewAyahs, getNewSurahs } from '@/utils/quran';
import { Folder } from 'lucide-react';
import FavouriteAyahsNotFound from '../favourite-ayahs-not-found';

export default function FavouritesFolder() {
  const { setNumberOfAyah, favouriteAyahs, surah, setSurah } = useQuranStore((state) => state);
  const surahs = getNewSurahs(favouriteAyahs);
  const ayahs = getNewAyahs(favouriteAyahs, surah);

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
            Browse your favourite Ayahs, choose a Surah and click on an Ayah to view it.
          </DialogDescription>
        </DialogHeader>

        {surahs.length === 0 ? (
          <FavouriteAyahsNotFound />
        ) : (
          <div className="flex flex-col gap-4">
            <Label htmlFor="surah" className="fc gap-2">
              <p className="text-base">Surah:</p>
              <Select
                value={Object.keys(favouriteAyahs).includes(surah) ? surah : ''}
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
