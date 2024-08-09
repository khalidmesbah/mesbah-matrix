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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AmiriFont, AmiriQuranFont } from '@/lib/fonts/fonts';
import { useGetAyahQuery } from '@/lib/hooks/use-quran-query';
import useQuranStore from '@/lib/stores/quran-store';
import { cn } from '@/lib/utils';
import {
  MAXIMUM_NUMBER_OF_AYAHS,
  MAXIMUM_NUMBER_OF_SURAHS,
  RECITATIONS,
  SURAHS,
  SURAH_AYAHS,
  TAFASIR,
  TRANSLATIONS,
  TRANSLITERATIONS,
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
  Image as ImageIcon,
  Info,
  Languages,
  LoaderIcon,
  MicVocal,
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
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function QuranPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const {
    setIsSoundPlaying,
    audio,
    setAudio,
    settings: { rate, volume, isSoundPlaying, mode, autoplay, font },
    numberOfAyah,
    settings: {
      recitation,
      translation: translationIdentifier,
      tafsir,
      transliteration: transliterationIdentifier,
    },
    getNextAyah,
    getPrevAyah,
    setIsEnded,
    setNumberOfAyah,
  } = useQuranStore((state) => state);
  const {
    data: ayah,
    isLoading,
    isError,
  } = useGetAyahQuery({
    numberOfAyah,
    recitation,
    translation: translationIdentifier,
    tafsir,
    transliteration: transliterationIdentifier,
  });
  const translation = TRANSLATIONS.find((e) => e.identifier === translationIdentifier);
  const transliteration = TRANSLITERATIONS.find((e) => e.identifier === translationIdentifier);

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'h'].includes(event.key)) {
        getNextAyah();
      } else if (['ArrowLeft', 'l'].includes(event.key)) {
        getPrevAyah();
      } else if (event.key === 'k') {
        // FIX: doesn't work
        if (isSoundPlaying) {
          setIsSoundPlaying(false);
          audio.stop();
        } else {
          setIsSoundPlaying(true);
          audio.play();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ayah) {
      let surahNumber = ayah.numberOfSurah.toString();
      let ayahNumber = ayah.numberInSurah.toString();

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

  if (isError) return <AyahUnavailable />;
  if (isLoading || !ayah) return <ParticlesLoader />;

  return (
    <div className="flex flex-col gap-2 flex-1 justify-center items-center">
      <ChangeAyah setNumberOfAyah={setNumberOfAyah} ayah={ayah} />
      <Ayah font={font} ayah={ayah} />

      <Tabs defaultValue="tafsir" className="">
        <TabsList className="w-full">
          <TabsTrigger value="tafsir" className="fc gap-2">
            <BookOpen />
            <p className="hidden sm:block">Tafsir</p>
          </TabsTrigger>
          <TabsTrigger value="translation" className="fc gap-2">
            <Languages />
            <p className="hidden sm:block">Translation</p>
          </TabsTrigger>
          <TabsTrigger value="transliterations" className="fc gap-2">
            <Speech />
            <p className="hidden sm:block">Transliteration</p>
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="max-h-48">
          <div className="max-h-48">
            <TabsContent value="tafsir">
              <p
                className={`group text-xl/10 bg-secondary p-2 rounded-md text-center ${AmiriFont.className}`}
                lang="ar"
                dir="rtl"
              >
                {ayah.tafsir}
                <CopyToClipboard
                  text={ayah.tafsir}
                  className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity p-0 h-7 w-6"
                  variant="outline"
                  size="sm"
                />
              </p>
            </TabsContent>
            <TabsContent value="translation">
              <p
                className="group bg-secondary p-2 rounded-md text-center"
                lang={translation?.language}
                dir={translation?.direction}
              >
                {ayah.translation}
                <CopyToClipboard
                  text={ayah.translation}
                  className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity p-0 h-7 w-6"
                  variant="outline"
                  size="sm"
                />
              </p>
            </TabsContent>

            <TabsContent value="transliterations">
              <p
                className="group bg-secondary p-2 rounded-md text-center"
                lang={transliteration?.language}
                dir={transliteration?.direction}
              >
                {ayah.transliteration}
                <CopyToClipboard
                  text={ayah.transliteration}
                  className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity p-0 h-7 w-6"
                  variant="outline"
                  size="sm"
                />
              </p>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
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
  ayah: AyahType;
  font: string;
};
function Ayah({ ayah, font }: AyahProps) {
  return (
    <ScrollArea className="max-h-52 w-full rounded-md border">
      <div className="group">
        <p
          className={cn(
            `text-center bg-card text-2xl/[3rem] px-2 rounded-md ${font === '__className_af25f8' ? AmiriQuranFont.className : AmiriFont.className}`,
            {
              'pb-4 pt-6': font === '__className_a12e74',
              'pb-6 pt-4': font === '__className_af25f8',
            },
          )}
          dir="rtl"
          lang="ar"
        >
          {ayah.text}
        </p>
        <CopyToClipboard
          text={ayah.text}
          className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity p-0 h-7 w-6"
          variant="outline"
          size="sm"
        />
      </div>
    </ScrollArea>
  );
}

type ChangeAyahProps = {
  ayah: AyahType;
  setNumberOfAyah: (numberOfAyah: number) => void;
};
function ChangeAyah(props: ChangeAyahProps) {
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

type OptionsProps = {
  getPrevAyah: () => void;
  getNextAyah: () => void;
  ayah: AyahType;
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
          title={`${props.ayah.surahEnglishName}: ${props.ayah.text}`}
          variant="outline"
        />
        <AyahImage surah={props.ayah.numberOfSurah} ayah={props.ayah.numberInSurah} />
      </div>
      <Settings />
    </div>
  );
}

type AyahImageProps = {
  surah: number;
  ayah: number;
};
function AyahImage({ surah, ayah }: AyahImageProps) {
  const src = `http://cdn.islamic.network/quran/images/${surah}_${ayah}.png`;

  const handleDownload = async () => {
    const a = document.createElement('a');
    a.href = src;
    a.setAttribute('download', 'true');
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icon icon={<ImageIcon />} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image of the Ayah</DialogTitle>
          <DialogDescription className="flex items-center gap-2 flex-wrap text-xs">
            <span className="fc gap-1 flex-wrap">
              <Badge variant={'secondary'}>Surah</Badge>
              {SURAHS[surah - 1].label}
            </span>
            <span className="fc gap-1 flex-wrap">
              <Badge variant={'secondary'}>Ayah</Badge>
              {ayah}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center flex-col gap-2">
          <Image
            src={src}
            width={1000}
            height={1000}
            placeholder="blur"
            blurDataURL="/imgs/ayah-placeholder.jpeg"
            className="bg-white rounded-md p-2"
            alt={`surah: ${surah}, ayah: ${ayah}`}
          />
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </DialogContent>
    </Dialog>
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
    audio,
    settings: {
      rate,
      volume,
      mode,
      autoplay,
      translation,
      tafsir,
      recitation,
      font,
      transliteration,
    },
    setVolume,
    setTranslation,
    setTafsir,
    setAutoplay,
    setRate,
    setRecitation,
    setFont,
    setTransliteration,
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
              checked={font === '__className_af25f8'}
              onCheckedChange={(e) => {
                setFont(e ? '__className_af25f8' : '__className_a12e74');
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
              icon={<MicVocal />}
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
                <SelectItem key={recitation.identifier} value={recitation.identifier}>
                  {recitation.englishName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label
            htmlFor="tafir"
            className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors"
          >
            <Icon
              icon={<BookOpen />}
              className="p-1 h-min text-foreground pointer-events-none"
              variant="link"
              size="sm"
            />
            <p className="flex-1">Tafsir</p>
          </Label>
          <Select
            value={tafsir}
            onValueChange={(newTafsir) => {
              setTafsir(newTafsir);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an Tafsir" />
            </SelectTrigger>
            <SelectContent>
              {TAFASIR.map((tafsir) => (
                <SelectItem key={tafsir.identifier} value={tafsir.identifier}>
                  {tafsir.englishName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
          </Label>
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
                <SelectItem key={translation.identifier} value={translation.identifier}>
                  {translation.englishName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label
            htmlFor="transliteration"
            className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors"
          >
            <Icon
              icon={<Speech />}
              className="p-1 h-min text-foreground pointer-events-none"
              variant="link"
              size="sm"
            />
            <p className="flex-1">Transliteration</p>
          </Label>
          <Select
            value={transliteration}
            onValueChange={(newTransliteration) => {
              setTransliteration(newTransliteration);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Transliteration" />
            </SelectTrigger>
            <SelectContent>
              {TRANSLITERATIONS.map((transliteration) => (
                <SelectItem key={transliteration.identifier} value={transliteration.identifier}>
                  {transliteration.englishName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

function AyahUnavailable() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ayah Unavailable
        </h1>
        <p className="mt-4 text-muted-foreground">
          We are sorry, but we were unable to fetch the ayah of the Quran you requested. Please try
          again later.
        </p>
        <div className="mt-6">
          <Button
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => {}} // TODO: fix this
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
