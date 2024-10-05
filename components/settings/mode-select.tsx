'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ModeSelect() {
  const { setTheme, resolvedTheme } = useTheme();
  const [color, setColor] = useState('green');
  const [mode, setMode] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      const [themeColor, themeMode] = resolvedTheme.split('-');
      setColor(themeColor);
      setMode(themeMode);
      setIsLoaded(true);
    }
  }, [resolvedTheme]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mode</CardTitle>
        <CardDescription>Choose A Mode.</CardDescription>
      </CardHeader>
      <CardContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative size-5">
                  <Sun className="absolute size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
                <p className="capitalize">{isLoaded ? mode : '...'}</p>
              </div>
              <ChevronDownIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={mode}>
              <DropdownMenuRadioItem
                onClick={() => {
                  setTheme(`${color}-light`);
                }}
                value="light"
              >
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                onClick={() => {
                  setTheme(`${color}-dark`);
                }}
                value="dark"
              >
                Dark
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
