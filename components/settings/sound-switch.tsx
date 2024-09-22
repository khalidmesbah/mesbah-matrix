'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useSettingsStore from '@/stores/settings';

export default function SoundSwitch() {
  const { isSoundAllowed, setIsSoundAllowed } = useSettingsStore((state) => state);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sounds</CardTitle>
        <CardDescription>Turn on or off the sounds.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Sounds</span>
          <Switch
            aria-label="Toggle sounds"
            checked={isSoundAllowed}
            onCheckedChange={(isChecked) => setIsSoundAllowed(isChecked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
