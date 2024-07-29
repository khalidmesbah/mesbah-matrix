'use client';

import Icon from '@/components/icon';
import { ParticlesLoader } from '@/components/particles-loader';
import ShareButton from '@/components/share-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGetAyahQuery, useGetNumberOfAyahQuery } from '@/lib/hooks/use-quran-query';
import useQuranStore from '@/lib/stores/quran-store';
import { SURAHS } from '@/public/data/quran';
import { AyahType } from '@/types';
import {
  ArrowLeft,
  ArrowRight,
  Folder,
  Heart,
  Info,
  LoaderIcon,
  Play,
  Repeat,
  Repeat1,
  Settings as SettingsIcon,
  Shuffle,
  StopCircle,
} from 'lucide-react';
import { Amiri_Quran } from 'next/font/google';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { z } from 'zod';

const myFont = Amiri_Quran({
  weight: '400',
  subsets: ['arabic'],
});

export default function QuranPage() {
  const {
    setIsSoundPlaying,
    audio,
    setAudio,
    settings: { rate, volume, isSoundPlaying, mode, autoplay },
    numberOfAyah,
    settings: { recitation, translation, interpretation },
    getNextAyah,
    getPrevAyah,
    isInterpretation,
    isTranslation,
    setIsEnded,
    isEnded,
  } = useQuranStore((state) => state);
  const {
    data: ayah,
    isLoading,
    isError,
  } = useGetAyahQuery({
    numberOfAyah,
    recitation,
    translation,
    interpretation,
  });

  useEffect(() => {
    console.log(`the new mode is: `, mode);
  }, [mode]);

  useEffect(() => {
    if (ayah) {
      audio.unload();
      const newAudio = new Howl({
        src: [ayah.audio, ...ayah.audioSecondary],
        rate,
        volume,
        preload: true,
        autoplay,
        loop: mode === 'loop',
        html5: true,
      });
      newAudio.on('end', () => setIsEnded(true));
      newAudio.on('play', () => setIsEnded(false));
      setAudio(newAudio);
    }
  }, [ayah]);

  if (isError) return <h1>error</h1>;
  if (isLoading || !ayah) return <h1>loading</h1>;

  return (
    <div className="flex flex-col gap-2 flex-1 justify-center items-center">
      <ChangeAyah ayah={ayah} />
      <Ayah isLoading={isLoading} ayah={ayah} />
      {isInterpretation && <Interpretation interpretation={ayah.interpretation} />}
      {isTranslation && <Translation translation={ayah.translation} />}
      <Options
        audio={audio}
        ayah={ayah}
        getNextAyah={getNextAyah}
        getPrevAyah={getPrevAyah}
        isLoading={isLoading}
      />
    </div>
  );
}

type AyahProps = {
  isLoading: boolean;
  ayah: AyahType;
};
function Ayah(props: AyahProps) {
  return (
    <ScrollArea className="max-h-52 w-full rounded-md border">
      {props.isLoading ? (
        <div className="flex justify-center items-center p-2">
          <ParticlesLoader />
        </div>
      ) : (
        <p
          className={`text-center bg-card select-none text-2xl/10 p-2 pb-5 rounded-md ${myFont.className}`}
          dir="rtl"
          lang="ar"
        >
          {props.ayah.text}
        </p>
      )}
    </ScrollArea>
  );
}

type InterpretationProps = {
  interpretation: string;
};
function Interpretation(props: InterpretationProps) {
  return (
    <ScrollArea className="max-h-48 rounded-md border">
      <p className="bg-secondary p-2 rounded-md text-center" lang="ar" dir="rtl">
        {props.interpretation}
      </p>
    </ScrollArea>
  );
}

type TranslationProps = {
  translation: string;
};
function Translation(props: TranslationProps) {
  return (
    <ScrollArea className="max-h-44 rounded-md border">
      <p className="bg-secondary p-2 rounded-md text-center">{props.translation}</p>
    </ScrollArea>
  );
}
const ChangeAyahFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select a surah.',
    })
    .email(),
});

type ChangeAyahProps = {
  ayah: AyahType;
};
function ChangeAyah(props: ChangeAyahProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const ayah = searchParams.get('ayah') || props.ayah.numberInSurah.toString();
  const surah = searchParams.get('surah') || props.ayah.numberOfSurah.toString();
  const setNumberOfAyah = useQuranStore((state) => state.setNumberOfAyah);

  const {
    data: numberOfAyah,
    isLoading,
    isError,
  } = useGetNumberOfAyahQuery({
    numberOfAyah: `${searchParams.get('surah')}:${searchParams.get('ayah')}`,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fc gap-2 p-2 bg-border/90 cursor-pointer rounded-md hover:bg-border transition-colors">
          <h1 className="text-xl rounded-md">
            {props.ayah.surahEnglishName} ({props.ayah.numberInSurah}/{props.ayah.numberOfAyahs})
          </h1>
          <Info />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Ayah</DialogTitle>
          <DialogDescription>Select the desired Ayah</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Select
            defaultValue={surah}
            onValueChange={(newSurah) => {
              router.push(pathname + '?' + createQueryString('surah', newSurah));
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
            defaultValue={ayah}
            onValueChange={(newAyah) => {
              router.push(pathname + '?' + createQueryString('ayah', newAyah));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an Ayah" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: props.ayah.numberOfAyahs }).map((_, ayah) => (
                <SelectItem key={ayah + 1} value={`${ayah + 1}`}>
                  {ayah + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogClose asChild>
          <Button
            disabled={isLoading}
            onClick={() => {
              if (!numberOfAyah || isError) return;
              setNumberOfAyah(numberOfAyah);
              console.log(numberOfAyah);
            }}
          >
            close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

type OptionsProps = {
  getPrevAyah: () => void;
  getNextAyah: () => void;
  ayah?: AyahType;
  isLoading: boolean;
  audio: any;
};
function Options(props: OptionsProps) {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-md">
      <div className="flex justify-center items-center gap-2">
        <Icon onClick={props.getPrevAyah} icon={<ArrowLeft />} />
        <Icon onClick={() => {}} icon={<Heart />} />
        {props.isLoading ? <Icon icon={<LoaderIcon />} /> : <PlayPauseButton />}
        <Icon onClick={() => {}} icon={<Shuffle />} />
        <Icon onClick={props.getNextAyah} icon={<ArrowRight />} />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Icon onClick={() => {}} icon={<Folder />} />
        <Mode />
        <ShareButton
          url={`${process.env.NEXT_PUBLIC_MESBAH_MATRIX_URL}/quran?${2}/${3}`}
          title={`${props.ayah?.surahEnglishName}: ${props.ayah?.text}`}
          variant="outline"
        />
      </div>
      <Settings />
    </div>
  );
}

function Mode() {
  const {
    settings: { mode },
    setMode,
  } = useQuranStore((state) => state);
  return (
    <div>
      {mode === 'once' ? (
        <Icon onClick={() => setMode('continuous')} icon={<Repeat />} className="opacity-50" />
      ) : mode === 'continuous' ? (
        <Icon onClick={() => setMode('loop')} icon={<Repeat />} />
      ) : (
        <Icon onClick={() => setMode('once')} icon={<Repeat1 />} />
      )}
    </div>
  );
}

type PlayPauseButtonProps = {
  audio: any;
};
function PlayPauseButton() {
  const {
    audio,
    settings: { isSoundPlaying, mode, autoplay },
    setIsSoundPlaying,
    isEnded,
    getNextAyah,
  } = useQuranStore((state) => state);

  useEffect(() => {
    if (mode === 'once' && (!autoplay || isEnded)) return;
    play();
  }, [audio]);

  useEffect(() => {
    if (!isEnded) return;

    if (mode === 'loop') {
      play();
    } else if (mode === 'continuous') {
      getNextAyah();
    } else {
      setIsSoundPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnded]);

  const play = () => {
    audio.play();
    setIsSoundPlaying(true);
  };

  const pause = () => {
    audio.pause();
    setIsSoundPlaying(false);
  };

  return (
    <>
      {isSoundPlaying ? (
        <Icon onClick={pause} icon={<StopCircle />} />
      ) : (
        <Icon onClick={play} icon={<Play />} />
      )}
    </>
  );
}

function Settings() {
  const {
    setIsSoundPlaying,
    audio,
    setAudio,
    settings: { rate: playbackRate, volume, isSoundPlaying, mode, autoplay },
    numberOfAyah,
    settings,
    getNextAyah,
    getPrevAyah,
    isInterpretation,
    isTranslation,
    setAutoplay,
    setPlaybackRate,
    setMode,
    setIsTranslation,
    setIsInterpretation,
  } = useQuranStore((state) => state);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center gap-2">
          <Icon icon={<SettingsIcon />} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your settings</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {mode === 'once' && (
            <Label className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors">
              Autoplay
              <Switch
                checked={autoplay}
                onCheckedChange={(e) => {
                  setAutoplay(e);
                }}
              />
            </Label>
          )}
          <Label className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors">
            Translation
            <Switch
              checked={isTranslation}
              onCheckedChange={(e) => {
                setIsTranslation(e);
              }}
            />
          </Label>
          <Label className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors">
            Interpretation
            <Switch
              checked={isInterpretation}
              onCheckedChange={(e) => {
                setIsInterpretation(e);
              }}
            />
          </Label>
          <Label className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors">
            Playback rate
            <Slider
              value={[playbackRate]}
              defaultValue={[playbackRate]}
              max={4}
              step={0.1}
              min={0.25}
              onValueChange={(e) => {
                setPlaybackRate(e[0]);
                audio.rate(e[0]);
              }}
            />
          </Label>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

//
// keyboardshortcuts
// when isTranslation is on => show the select translation component
// color the tashkel option (search for the correct word instead of tashkel)// change font
// add copy button
//
// TODO: create a global Icon that serves both the navbar and quran and all icons
// add the select behavour from quran tab
// use search params for surah and ayahnumber
// test on small screen sizes and use a drawer
// make an image maker of the verse and export it
// add multiple templates for this image maker
// add language
