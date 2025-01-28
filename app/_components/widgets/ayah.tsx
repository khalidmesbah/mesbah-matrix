'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { AmiriFont, AmiriQuranFont } from '@/lib/fonts/fonts';
import useWidgetsStore from '@/lib/stores/widgets';
import { AyahWidgetFontT, AyahWidgetT } from '@/lib/types/widgets';
import { cn } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { Settings2 } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_AYAH_DATA: AyahWidgetT = {
  text: 'بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ',
  font: '__className_af25f8',
};

export default function Ayah({ id }: { id: string }) {
  const { widgetStates, updateWidgetState } = useWidgetsStore((state) => state);
  if (!widgetStates[id]) updateWidgetState(id, DEFAULT_AYAH_DATA);
  const data = widgetStates[id] as AyahWidgetT;
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(data.text);
  const [font, setFont] = useState(data.font);

  return (
    <>
      <p
        className={cn(
          `break-words rounded-md bg-card px-2 text-center text-2xl/[3rem] ${
            data.font === '__className_af25f8' ? AmiriQuranFont.className : AmiriFont.className
          }`,
          {
            'pb-4 pt-6': data.font === '__className_a12e74',
            'pb-6 pt-4': data.font === '__className_af25f8',
          },
        )}
        dir="rtl"
        lang="ar"
      >
        {data.text}
      </p>
      <div className="absolute bottom-1 left-1 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0">
              <Settings2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Text and Font</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Arabic Text</Label>
                <Textarea
                  id="text"
                  dir="rtl"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="h-32"
                />
              </div>
              <div className="space-y-2">
                <Label>Font Style</Label>
                <RadioGroup
                  value={font}
                  onValueChange={(value) => setFont(value as AyahWidgetFontT)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="__className_af25f8" id="quran" />
                    <Label htmlFor="quran" className="font-normal">
                      Amiri Quran
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="__className_a12e74" id="regular" />
                    <Label htmlFor="regular" className="font-normal">
                      Amiri Regular
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogClose asChild>
                <Button
                  onClick={() =>
                    updateWidgetState(id, {
                      text,
                      font,
                    })
                  }
                >
                  Save
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
