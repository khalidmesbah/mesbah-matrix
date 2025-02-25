'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AyahT } from '@/lib/types/quran';
import { SURAHS, SURAH_AYAHS, getNumberOfAyah } from '@/public/data/quran';
import { Info } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type ChangeAyahProps = {
  ayah: AyahT;
  setNumberOfAyah: (numberOfAyah: number) => void;
};

export function ChangeAyah(props: ChangeAyahProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getParams = useCallback((): { ayah: string; surah: string } => {
    let surah =
      (searchParams.has('surah')
        ? searchParams.get('surah')
        : props.ayah.numberOfSurah.toString()) || '';
    let ayah =
      (searchParams.has('ayah') ? searchParams.get('ayah') : props.ayah.numberInSurah.toString()) ||
      '';

    return { surah, ayah };
  }, [props.ayah.numberInSurah, props.ayah.numberOfSurah, searchParams]);

  return (
    <div className="fc gap-2">
      <HoverCard openDelay={100}>
        <HoverCardTrigger>
          <Info />
        </HoverCardTrigger>
        <HoverCardContent className="flex flex-col gap-1 p-2">
          <span>
            <Badge variant="outline">Juz</Badge> {props.ayah.juz}
          </span>
          <span>
            <Badge variant="outline">Hizb</Badge> {props.ayah.hizbQuarter}
          </span>
          <span>
            <Badge variant="outline">Page</Badge> {props.ayah.page}
          </span>
          <span>
            <Badge variant="outline">Revelation Type</Badge> {props.ayah.revelationType}
          </span>
        </HoverCardContent>
      </HoverCard>
      <Dialog>
        <DialogTrigger asChild>
          <h1 className="bg-primary/90 hover:bg-primary cursor-pointer rounded-md p-2 text-lg transition-colors">
            {props.ayah.surahEnglishName} ({props.ayah.numberInSurah}/{props.ayah.numberOfAyahs})
          </h1>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Ayah</DialogTitle>
            <DialogDescription>Select the desired Ayah</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Select
              value={getParams().surah}
              onValueChange={(newSurah) => {
                const params = new URLSearchParams({
                  surah: newSurah,
                  ayah: '1',
                }).toString();
                router.replace(pathname + '?' + params);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Surah" />
              </SelectTrigger>
              <SelectContent>
                {SURAHS.map((surah) => (
                  <SelectItem key={surah.value} value={surah.value.toString()}>
                    {surah.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={getParams().ayah}
              onValueChange={(newAyah) => {
                const params = new URLSearchParams({
                  surah: getParams().surah,
                  ayah: newAyah,
                }).toString();
                router.replace(pathname + '?' + params);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Ayah" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: SURAH_AYAHS[+getParams().surah] }).map((_, ayah) => (
                  <SelectItem key={ayah + 1} value={`${ayah + 1}`}>
                    {ayah + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogClose asChild>
            <Button
              onClick={() => {
                props.setNumberOfAyah(getNumberOfAyah(+getParams().surah, +getParams().ayah));
              }}
            >
              Change
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
