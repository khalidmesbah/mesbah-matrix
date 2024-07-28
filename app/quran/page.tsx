'use client';

import Icon from '@/components/icon';
import { ParticlesLoader } from '@/components/particles-loader';
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
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGetAyahQuery } from '@/lib/hooks/use-quran-query';
import useQuranStore from '@/lib/stores/quran-store';
import { AyahType } from '@/types';
import {
  ArrowLeft,
  ArrowRight,
  Folder,
  Heart,
  LoaderIcon,
  Pen,
  Play,
  Repeat,
  Settings as SettingsIcon,
  Share,
  Shuffle,
  StopCircle,
} from 'lucide-react';
import { Amiri_Quran } from 'next/font/google';
import { useEffect } from 'react';

const myFont = Amiri_Quran({
  weight: '400',
  subsets: ['arabic'],
});

export default function QuranPage() {
  const {
    setIsSoundPlaying,
    audio,
    setAudio,
    settings: {
      rate,
      volume,
      isSoundPlaying,
      mode: { autoplay, loop },
    },
    numberOfAyah,
    settings,
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
    numberOfAyah: numberOfAyah,
    recitation: settings.recitation,
    translation: settings.translation,
    interpretation: settings.interpretation,
  });

  useEffect(() => {
    if (ayah) {
      audio.stop();
      audio.unload();
      const newAudio = new Howl({
        src: [ayah.audio, ...ayah.audioSecondary],
        rate,
        volume,
        preload: true,
        autoplay,
        loop,
        html5: true,
        onplay: () => setIsEnded(false),
        onend: () => setIsEnded(true),
      });
      setAudio(newAudio);
    }
    return () => {
      console.log('finished -----------', ayah?.audio);
      setIsSoundPlaying(autoplay);
    };
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
          className={`text-center bg-primary select-none text-2xl/10 p-2 pb-5 rounded-md ${myFont.className}`}
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
  return (
    <div className="fc gap-2 p-2 bg-card">
      <h1 className="text-2xl rounded-md">
        {props.ayah.surahEnglishName} ({props.ayah.numberInSurah}/{props.ayah.numberOfAyahs})
      </h1>
      <Icon size="sm" icon={<Pen />} />
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
        <Icon onClick={() => {}} icon={<Repeat />} />
        <Icon onClick={() => {}} icon={<Share />} />
      </div>
      <Settings />
    </div>
  );
}

type PlayPauseButtonProps = {
  audio: any;
};
function PlayPauseButton() {
  const {
    audio,
    settings: {
      isSoundPlaying,
      mode: { loop },
    },
    setIsSoundPlaying,
    isEnded,
  } = useQuranStore((state) => state);
  // useEffect(() => {
  //   console.log('hi from PlayPauseButton', audio);
  //   // return () => {
  //   //   audio.stop();
  //   //   audio.unload();
  //   //   console.log('finished!!!!!!!!!1');
  //   // };
  // }, []);
  useEffect(() => {
    setIsSoundPlaying(loop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnded]);
  return (
    <>
      {isSoundPlaying ? (
        <Icon
          onClick={() => {
            audio.pause();
            setIsSoundPlaying(false);
          }}
          icon={<StopCircle />}
        />
      ) : (
        <Icon
          onClick={() => {
            if (!isSoundPlaying) audio.play();
            setIsSoundPlaying(true);
          }}
          icon={<Play />}
        />
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
      mode: { autoplay, loop },
    },
    numberOfAyah,
    settings,
    getNextAyah,
    getPrevAyah,
    isInterpretation,
    isTranslation,
    setAutoplay,
    setPlaybackRate,
    setLoop,
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
          <Label className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors">
            Autoplay
            <Switch
              checked={autoplay}
              onCheckedChange={(e) => {
                setAutoplay(e);
              }}
            />
          </Label>
          <Label className="flex-1 flex items-center justify-between gap-2 p-1 hover:bg-secondary rounded-md transition-colors">
            Loop
            <Switch
              checked={loop}
              onCheckedChange={(e) => {
                setLoop(e);
                audio.loop(e);
              }}
            />
          </Label>
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
