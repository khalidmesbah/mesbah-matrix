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

export default function ModeSelect() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Choose the theme for the website.</CardDescription>
      </CardHeader>
      <CardContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <div className="flex-1 flex items-center gap-2">
                {resolvedTheme === 'light' && (
                  <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                )}
                {resolvedTheme === 'dark' && (
                  <Moon className="size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                )}
                <p className="capitalize">{theme}</p>
              </div>
              <ChevronDownIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={theme}>
              <DropdownMenuRadioItem onClick={() => setTheme('light')} value="light">
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem onClick={() => setTheme('dark')} value="dark">
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem onClick={() => setTheme('system')} value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
