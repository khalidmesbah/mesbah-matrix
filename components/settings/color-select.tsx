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
import { ChevronDownIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const colors = [
  'red',
  'rose',
  'orange',
  'green',
  'blue',
  'yellow',
  'violet',
  'zinc',
  'slate',
  'stone',
  'gray',
  'neutral',
];

export default function ColorSelect() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  const [hasmounted, sethasmounted] = useState(false);

  useEffect(() => sethasmounted(true), []);

  if (!hasmounted) return null;

  const [color = 'green', mode = 'dark'] = resolvedTheme
    ? resolvedTheme.split('-')
    : ['green', 'dark'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Choose A Theme.</CardDescription>
      </CardHeader>
      <CardContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <div className="flex flex-1 items-center gap-2">
                <p className="capitalize">{color}</p>
              </div>
              <ChevronDownIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={color}>
              {colors.map((color) => (
                <DropdownMenuRadioItem
                  key={color}
                  onClick={() => setTheme(`${color}-${mode}`)}
                  value={color}
                  className="capitalize"
                >
                  {color}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
