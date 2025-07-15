'use client';

import { Play, StopCircle } from 'lucide-react';
import { useEffect } from 'react';
import Icon from '@/components/icon';
import useQuranStore from '@/stores/quran';

export default function PlayPauseButton() {
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
        <Icon description='Pause' onClick={pause} icon={<StopCircle />} />
      ) : (
        <Icon description='Play' onClick={play} icon={<Play />} />
      )}
    </>
  );
}
