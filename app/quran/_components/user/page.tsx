'use client';

import CopyToClipboard from '@/components/copy-to-clipboard';
import ParticlesLoader from '@/components/particles-loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAyahQuery } from '@/hooks/use-quran';
import { AmiriFont } from '@/lib/fonts/fonts';
import {
  MAXIMUM_NUMBER_OF_AYAHS,
  MAXIMUM_NUMBER_OF_SURAHS,
  TRANSLATIONS,
  TRANSLITERATIONS,
  getNumberOfAyah,
} from '@/public/data/quran';
import useQuranStore from '@/stores/quran';
import { BookOpen, Languages, Speech } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Ayah from '../ayah';
import AyahUnavailable from '../ayah-unavailable';
import { ChangeAyah } from '../change-ayah';
import Options from './options';

export default function UserQuranPage() {
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
    getRandomAyah,
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
  if (isLoading || !ayah)
    return (
      <div className="fc h-full w-full">
        <ParticlesLoader />
      </div>
    );

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
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
                className={`group rounded-md bg-secondary p-2 text-center text-xl/10 ${AmiriFont.className}`}
                lang="ar"
                dir="rtl"
              >
                {ayah.tafsir}
                <CopyToClipboard
                  text={ayah.tafsir}
                  className="absolute bottom-1 left-1 h-7 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  variant="outline"
                  size="sm"
                />
              </p>
            </TabsContent>
            <TabsContent value="translation">
              <p
                className="group rounded-md bg-secondary p-2 text-center"
                lang={translation?.language}
                dir={translation?.direction}
              >
                {ayah.translation}
                <CopyToClipboard
                  text={ayah.translation}
                  className="absolute bottom-1 left-1 h-7 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  variant="outline"
                  size="sm"
                />
              </p>
            </TabsContent>

            <TabsContent value="transliterations">
              <p
                className="group rounded-md bg-secondary p-2 text-center"
                lang={transliteration?.language}
                dir={transliteration?.direction}
              >
                {ayah.transliteration}
                <CopyToClipboard
                  text={ayah.transliteration}
                  className="absolute bottom-1 left-1 h-7 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
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
        getRandomAyah={getRandomAyah}
        isLoading={isLoading}
        numberOfAyah={numberOfAyah}
      />
    </div>
  );
}
