import ColorSelect from '@/components/settings/color-select';
import ModeSelect from '@/components/settings/mode-select';
import SoundSwitch from '@/components/settings/sound-switch';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Settings',
  description: 'Configure your preferred settings for a personalized experience.',
};

export default function SettingsPage() {
  return (
    <div className="grid gap-8 p-2">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your account and preferences.</p>
      </div>
      <div className="grid grid-cols-fit gap-4">
        <ModeSelect />
        <ColorSelect />
        <SoundSwitch />
      </div>
    </div>
  );
}
