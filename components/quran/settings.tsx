'use client';

import Icon from '@/components/icon';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RECITATIONS, TAFASIR, TRANSLATIONS, TRANSLITERATIONS } from '@/public/data/quran';
import useQuranStore from '@/stores/quran';
import {
  BookOpen,
  Gauge,
  Languages,
  MicVocal,
  Palette,
  Repeat2,
  Settings as SettingsIcon,
  Speech,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function Settings() {
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
        <div className="flex items-center justify-center gap-2">
          <Icon description="Settings" icon={<SettingsIcon />} />
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
            className="flex flex-1 items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-secondary"
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
            <Label className="flex flex-1 items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-secondary">
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

          <Label className="flex flex-1 items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-secondary">
            <Icon
              description="Recitation"
              icon={<MicVocal />}
              className="pointer-events-none h-min p-1 text-foreground"
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
            className="flex flex-1 items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-secondary"
          >
            <Icon
              description="Tafsir"
              icon={<BookOpen />}
              className="pointer-events-none h-min p-1 text-foreground"
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
            className="flex flex-1 items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-secondary"
          >
            <Icon
              description="Translation"
              icon={<Languages />}
              className="pointer-events-none h-min p-1 text-foreground"
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
            className="flex flex-1 items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-secondary"
          >
            <Icon
              description="Transliteration"
              icon={<Speech />}
              className="pointer-events-none h-min p-1 text-foreground"
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
            className="flex flex-1 items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-secondary"
          >
            <Icon
              description="Reset Playback rate"
              onClick={() => {
                setRate(1);
                audio.rate(1);
              }}
              icon={<Gauge />}
              className="h-min p-1"
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
            className="flex flex-1 items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-secondary"
          >
            {volume === 0 ? (
              <Icon
                description="Mute"
                onClick={() => {
                  setVolume(0.33);
                  audio.volume(0.33);
                }}
                icon={<VolumeX />}
                className="h-min p-1"
                variant="ghost"
                size="sm"
              />
            ) : volume <= 0.33 ? (
              <Icon
                description="Low volume"
                onClick={() => {
                  setVolume(0.66);
                  audio.volume(0.66);
                }}
                icon={<Volume />}
                className="h-min p-1"
                variant="ghost"
                size="sm"
              />
            ) : volume <= 0.66 ? (
              <Icon
                description="Medium volume"
                onClick={() => {
                  setVolume(1);
                  audio.volume(1);
                }}
                icon={<Volume1 />}
                className="h-min p-1"
                variant="ghost"
                size="sm"
              />
            ) : (
              <Icon
                description="High volume"
                onClick={() => {
                  setVolume(0);
                  audio.volume(0);
                }}
                icon={<Volume2 />}
                className="h-min p-1"
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
