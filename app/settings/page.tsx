import type { Metadata } from 'next';
import ColorSelect from './_components/color-select';
import ModeSelect from './_components/mode-select';
import SoundSwitch from './_components/sound-switch';
export const metadata: Metadata = {
  title: 'Settings',
  description: 'Configure your preferred settings for a personalized experience.',
};

export default function SettingsPage() {
  return (
    <div className='grid gap-8 p-2'>
      <div className='grid gap-2'>
        <h1 className='text-3xl font-bold'>Settings</h1>
        <p className='text-muted-foreground'>Customize your preferences.</p>
      </div>
      <div className='grid-cols-fit grid gap-4'>
        <ModeSelect />
        <ColorSelect />
        <SoundSwitch />
      </div>
    </div>
  );
}
