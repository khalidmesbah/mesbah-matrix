'use client';

import CopyToClipboard from '@/components/copy-to-clipboard';
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
  MAXIMUM_NUMBER_OF_AYAHS,
  MAXIMUM_NUMBER_OF_SURAHS,
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
  Palette,
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
import { Amiri, Amiri_Quran } from 'next/font/google';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const AmiriFont = Amiri({
  weight: '400',
  subsets: ['arabic'],
});
const AmiriQuranFont = Amiri_Quran({
  weight: '400',
  subsets: ['arabic'],
});

export default function QuranPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
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
    setNumberOfAyah,
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
    const surah = searchParams.get('surah');
    const ayah = searchParams.get('ayah');

    if (!surah || !ayah) return;
    if (Number.isNaN(Number(surah)) || Number.isNaN(Number(ayah))) return;
    if (
      +surah > MAXIMUM_NUMBER_OF_SURAHS ||
      +surah < 1 ||
      +ayah > MAXIMUM_NUMBER_OF_AYAHS ||
      +ayah < 1
    )
      return;

    setNumberOfAyah(getNumberOfAyah(+surah, +ayah));
  }, []);

  useEffect(() => {
    if (ayah) {
      let surahNumber = ayah.numberOfSurah.toString();
      let ayahNumber = ayah.numberInSurah.toString();

      console.log(`initial`, surahNumber, ayahNumber, searchParams.toString());
      const params = new URLSearchParams({
        surah: surahNumber,
        ayah: ayahNumber,
      }).toString();

      router.replace(pathname + '?' + params);

      audio.stop();
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
  const isColoredTajweed = useQuranStore((state) => state.isColoredTajweed);
  return (
    <ScrollArea className="max-h-52 w-full rounded-md border">
      {props.isLoading ? (
        <div className="flex justify-center items-center p-2">
          <ParticlesLoader />
        </div>
      ) : (
        <div className="group">
          {isColoredTajweed ? (
            <p
              className={`text-center bg-card text-2xl/[3rem] px-2 pb-6 pt-4 rounded-md ${AmiriQuranFont.className}`}
              dir="rtl"
              lang="ar"
            >
              {props.ayah.text}
            </p>
          ) : (
            <p
              className={`text-center bg-card text-2xl/[3rem] px-2 pb-4 pt-6 rounded-md ${AmiriFont.className}`}
              dir="rtl"
              lang="ar"
            >
              {props.ayah.text}
            </p>
          )}
          <CopyToClipboard
            text={props.ayah.text}
            className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity"
            variant="outline"
          />
        </div>
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
      <p
        className={`group text-xl/10 bg-secondary p-2 rounded-md text-center ${AmiriFont.className}`}
        lang="ar"
        dir="rtl"
      >
        {props.interpretation}
        <CopyToClipboard
          text={props.interpretation}
          className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity"
          variant="outline"
        />
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
      <p className="group bg-secondary p-2 rounded-md text-center">
        {props.translation}
        <CopyToClipboard
          text={props.translation}
          className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity"
          variant="outline"
        />
      </p>
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

  useEffect(() => {
    console.log(`change`, searchParams.get('surah'), searchParams.get('ayah'));
  }, [searchParams]);

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.ayah.numberInSurah, props.ayah.numberOfSurah]);

  return (
    <div className="fc gap-2">
      <HoverCard openDelay={100}>
        <HoverCardTrigger>
          <Info />
        </HoverCardTrigger>
        <HoverCardContent>
          <div>
            <Badge variant="outline">Juz</Badge> {props.ayah.juz}
          </div>
          <div>
            <Badge variant="outline">Hizb</Badge> {props.ayah.hizbQuarter}
          </div>
          <div>
            <Badge variant="outline">Page</Badge> {props.ayah.page}
          </div>
          <div>
            <Badge variant="outline">Revelation Type</Badge> {props.ayah.revelationType}
          </div>
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
                setNumberOfAyah(getNumberOfAyah(+getParams().surah, +getParams().ayah));
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
      rate,
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
    setRate,
    setMode,
    isColoredTajweed,
    setIsColoredTajweed,
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
          <Label
            htmlFor="colored-tajweed"
            className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors"
          >
            <Palette /> <p className="flex-1">Colored Tajweed</p>
            <Switch
              id="colored-tajweed"
              checked={isColoredTajweed}
              onCheckedChange={(e) => {
                setIsColoredTajweed(e);
              }}
            />
          </Label>

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

          <Label
            htmlFor="rate"
            className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors"
          >
            <Icon
              onClick={() => {
                setRate(1);
                audio.rate(1);
              }}
              icon={<Gauge />}
              className="p-1 h-min"
              variant="ghost"
              size="sm"
            />
            <p className="flex-1">Playback rate</p>
            <span>{rate}</span>
          </Label>

          <Slider
            id="rate"
            value={[rate]}
            max={4}
            step={0.1}
            min={0.25}
            onValueChange={(e) => {
              setRate(e[0]);
              audio.rate(e[0]);
            }}
          />

          <Label
            htmlFor="volume"
            className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors"
          >
            {volume === 0 ? (
              <Icon
                onClick={() => {
                  setVolume(0.33);
                  audio.volume(0.33);
                }}
                icon={<VolumeX />}
                className="p-1 h-min"
                variant="ghost"
                size="sm"
              />
            ) : volume <= 0.33 ? (
              <Icon
                onClick={() => {
                  setVolume(0.66);
                  audio.volume(0.66);
                }}
                icon={<Volume />}
                className="p-1 h-min"
                variant="ghost"
                size="sm"
              />
            ) : volume <= 0.66 ? (
              <Icon
                onClick={() => {
                  setVolume(1);
                  audio.volume(1);
                }}
                icon={<Volume1 />}
                className="p-1 h-min"
                variant="ghost"
                size="sm"
              />
            ) : (
              <Icon
                onClick={() => {
                  setVolume(0);
                  audio.volume(0);
                }}
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
