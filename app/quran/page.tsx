'use client';

import Icon from '@/components/icon';
import { ParticlesLoader } from '@/components/particles-loader';
import ShareButton from '@/components/share-button';
import { Badge } from '@/components/ui/badge';
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
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
import { useGetAyahQuery } from '@/lib/hooks/use-quran-query';
import useQuranStore from '@/lib/stores/quran-store';
import {
  INTERPRETATIONS,
  RECITATIONS,
  SURAHS,
  SURAH_AYAHS,
  TRANSLATIONS,
  getNumberOfAyah,
} from '@/public/data/quran';
import { AyahType } from '@/types';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Folder,
  Gauge,
  Heart,
  Info,
  Languages,
  LoaderIcon,
  Play,
  Repeat,
  Repeat1,
  Repeat2,
  Settings as SettingsIcon,
  Shuffle,
  Speech,
  StopCircle,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Amiri_Quran } from 'next/font/google';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

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
    return () => {
      audio.stop();
      audio.unload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

type ChangeAyahProps = {
  ayah: AyahType;
};
function ChangeAyah(props: ChangeAyahProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const setNumberOfAyah = useQuranStore((state) => state.setNumberOfAyah);

  const getSurah = useCallback(() => {
    return searchParams.get('surah') || props.ayah.numberOfSurah.toString();
  }, [searchParams, props.ayah.numberOfSurah]);

  const getAyah = useCallback(() => {
    return searchParams.get('ayah') || props.ayah.numberInSurah.toString();
  }, [searchParams, props.ayah.numberInSurah]);

  useEffect(() => {
    console.log(`change`, searchParams.get('surah'), searchParams.get('ayah'));
  }, [searchParams]);

  return (
    <div className="fc gap-2">
      <HoverCard openDelay={100}>
        <HoverCardTrigger>
          <Info />
        </HoverCardTrigger>
        <HoverCardContent>
          <p>
            <Badge>Juz</Badge> {props.ayah.juz}
          </p>
          <p>
            <Badge>Hizb</Badge> {props.ayah.hizbQuarter}
          </p>
          <p>
            <Badge>Page</Badge> {props.ayah.page}
          </p>
          <p>
            <Badge>Revelation Type</Badge> {props.ayah.revelationType}
          </p>
        </HoverCardContent>
      </HoverCard>
      <Dialog>
        <DialogTrigger asChild>
          <h1 className="text-lg p-2 bg-primary/90 cursor-pointer rounded-md hover:bg-primary transition-colors">
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
              value={getSurah()}
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
              value={getAyah()}
              onValueChange={(newAyah) => {
                console.log(`newAyah`, newAyah);
                const params = new URLSearchParams({
                  surah: getSurah(),
                  ayah: newAyah,
                }).toString();
                router.replace(pathname + '?' + params);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Ayah" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: SURAH_AYAHS[+getSurah()] }).map((_, ayah) => (
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
                setNumberOfAyah(getNumberOfAyah(+getSurah(), +getAyah()));
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

type OptionsProps = {
  getPrevAyah: () => void;
  getNextAyah: () => void;
  ayah?: AyahType;
  isLoading: boolean;
  audio: any;
};
function Options(props: OptionsProps) {
  const searchParams = useSearchParams();
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
          url={`${process.env.NEXT_PUBLIC_MESBAH_MATRIX_URL}/quran?surah=${searchParams.get('surah')}&ayah=${searchParams.get('ayah')}`}
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
    if (mode === 'once' && !autoplay && isSoundPlaying === true) {
      setIsSoundPlaying(false);
      return;
    }
    if (mode === 'once' && !autoplay) return;
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    settings: {
      rate: playbackRate,
      volume,
      isSoundPlaying,
      mode,
      autoplay,
      translation,
      interpretation,
      recitation,
    },
    numberOfAyah,
    settings,
    getNextAyah,
    getPrevAyah,
    setVolume,
    setTranslation,
    setInterpretation,
    isInterpretation,
    isTranslation,
    setAutoplay,
    setPlaybackRate,
    setMode,
    setIsTranslation,
    setIsInterpretation,
    setRecitation,
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
              <Repeat2 />
              <p className="flex-1">Autoplay</p>
              <Switch
                checked={autoplay}
                onCheckedChange={(e) => {
                  setAutoplay(e);
                }}
              />
            </Label>
          )}

          <Label className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors">
            <Icon
              icon={<Speech />}
              className="p-1 h-min text-foreground pointer-events-none"
              variant="link"
              size="sm"
            />
            <p className="flex-1">Recitation</p>
          </Label>

          <Select
            value={recitation}
            onValueChange={(newRecitation) => {
              setRecitation(newRecitation);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a recitation" />
            </SelectTrigger>
            <SelectContent>
              {RECITATIONS.map((recitation) => (
                <SelectItem key={recitation.value} value={recitation.value}>
                  {recitation.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label
            htmlFor="interpretation"
            className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors"
          >
            <Icon
              icon={<BookOpen />}
              className="p-1 h-min text-foreground pointer-events-none"
              variant="link"
              size="sm"
            />
            <p className="flex-1">Interpretation</p>
            <Switch
              id="interpretation"
              checked={isInterpretation}
              onCheckedChange={(e) => {
                setIsInterpretation(e);
              }}
            />
          </Label>
          {isInterpretation && (
            <Select
              value={interpretation}
              onValueChange={(newInterpretation) => {
                setInterpretation(newInterpretation);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Interpretation" />
              </SelectTrigger>
              <SelectContent>
                {INTERPRETATIONS.map((interpretation) => (
                  <SelectItem key={interpretation.value} value={interpretation.value}>
                    {interpretation.label.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Label
            htmlFor="translation"
            className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors"
          >
            <Icon
              icon={<Languages />}
              className="p-1 h-min text-foreground pointer-events-none"
              variant="link"
              size="sm"
            />
            <p className="flex-1">Translation</p>
            <Switch
              id="translation"
              checked={isTranslation}
              onCheckedChange={(e) => {
                setIsTranslation(e);
              }}
            />
          </Label>
          {isTranslation && (
            <Select
              value={translation}
              onValueChange={(newTranslation) => {
                setTranslation(newTranslation);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Translation" />
              </SelectTrigger>
              <SelectContent>
                {TRANSLATIONS.map((translation) => (
                  <SelectItem key={translation.value} value={translation.value}>
                    {translation.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Label className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors">
            <Icon
              onClick={() => setPlaybackRate(1)}
              icon={<Gauge />}
              className="p-1 h-min"
              variant="ghost"
              size="sm"
            />
            <p className="flex-1">Playback rate</p>
            <span>{playbackRate}</span>
          </Label>

          <Slider
            value={[playbackRate]}
            max={4}
            step={0.1}
            min={0.25}
            onValueChange={(e) => {
              setPlaybackRate(e[0]);
              audio.rate(e[0]);
            }}
          />

          <Label
            htmlFor="volume"
            className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors"
          >
            {volume === 0 ? (
              <Icon
                onClick={() => setVolume(0.33)}
                icon={<VolumeX />}
                className="p-1 h-min"
                variant="ghost"
                size="sm"
              />
            ) : volume <= 0.33 ? (
              <Icon
                onClick={() => setVolume(0.66)}
                icon={<Volume />}
                className="p-1 h-min"
                variant="ghost"
                size="sm"
              />
            ) : volume <= 0.66 ? (
              <Icon
                onClick={() => setVolume(1)}
                icon={<Volume1 />}
                className="p-1 h-min"
                variant="ghost"
                size="sm"
              />
            ) : (
              <Icon
                onClick={() => setVolume(0)}
                icon={<Volume2 />}
                className="p-1 h-min"
                variant="ghost"
                size="sm"
              />
            )}
            <p className="flex-1">Volume</p>
            <span>{volume}</span>
          </Label>

          <Slider
            id="volume"
            value={[volume]}
            max={1}
            step={0.1}
            min={0}
            onValueChange={(e) => {
              setVolume(e[0]);
              audio.volume(e[0]);
            }}
          />
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
// add translation and interpretation to the URLSearchParams
// determine which state to be saved into firebase
// fix interpretations (unknowns and duplicates)
// work on background
// stop working when moving to another tab
