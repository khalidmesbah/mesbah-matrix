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
  const { setTheme: setMode, theme: mode, resolvedTheme: resolvedMode } = useTheme();

  const [hasmounted, sethasmounted] = useState(false);

  useEffect(() => sethasmounted(true), []);

  if (!hasmounted) return null;

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
                {resolvedMode === 'light' && (
                  <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                )}
                {resolvedMode === 'dark' && (
                  <Moon className="size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                )}
                <p className="capitalize">{mode}</p>
              </div>
              <ChevronDownIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={mode}>
              <DropdownMenuRadioItem onClick={() => setMode('light')} value="light">
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem onClick={() => setMode('dark')} value="dark">
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem onClick={() => setMode('system')} value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
