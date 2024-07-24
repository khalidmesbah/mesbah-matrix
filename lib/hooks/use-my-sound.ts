import useSound from 'use-sound';
import useSettingsStore from '../stores/settings-store';

export declare type SpriteMap = {
  [key: string]: [number, number];
};
export declare type HookOptions<T = any> = T & {
  id?: string;
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  sprite?: SpriteMap;
  onload?: () => void;
};
export interface PlayOptions {
  id?: string;
  forceSoundEnabled?: boolean;
  playbackRate?: number;
}

export default function useMySound<T = any>(src: string | string[], others?: HookOptions<T>) {
  const [play] = useSound(src, others);

  const isSoundAllowed = useSettingsStore((state) => state.isSoundAllowed);

  const customPlay = () => {
    if (isSoundAllowed) play();
  };

  return [customPlay];
}
