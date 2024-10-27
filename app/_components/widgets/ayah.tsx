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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { AmiriFont, AmiriQuranFont } from '@/lib/fonts/fonts';
import { getWidgetData, setWidgetData } from '@/lib/server-actions/widgets';
import { AyahWidgetFontT, AyahWidgetT } from '@/lib/types/widgets';
import { cn } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Settings2 } from 'lucide-react';
import { useState } from 'react';
import WidgetLoader from './loader';

const DEFAULT_AYAH_DATA: AyahWidgetT = {
  text: 'بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ',
  font: '__className_af25f8',
};

export default function Ayah({ id = 'none' }: { id?: string }) {
  const [open, setOpen] = useState(false);
  const [localAyahData, setLocalAyahData] = useState<AyahWidgetT>(DEFAULT_AYAH_DATA);
  let { isAuthenticated } = useKindeBrowserClient();
  const [text, setText] = useState(DEFAULT_AYAH_DATA.text);
  const [font, setFont] = useState(DEFAULT_AYAH_DATA.font);

  isAuthenticated = isAuthenticated || false;

  const queryClient = useQueryClient();
  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ayah', id],
    queryFn: () => getWidgetData(id) as Promise<AyahWidgetT>,
    enabled: isAuthenticated,
  });

  // TODO: Fix this mutation (setQueryData)
  const mutation = useMutation({
    mutationFn: (newWidgetData: AyahWidgetT) => setWidgetData(id, newWidgetData),
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey: ['ayah', id] });
      queryClient.setQueryData(['ayah', id], newData);
      setOpen(false);
    },
  });

  // Use either the query data or local state depending on whether there's a user

  const handleData = () => {
    if (isAuthenticated) {
      mutation.mutate({ text, font });
    } else {
      setLocalAyahData({ text, font });
    }
  };

  if ((isAuthenticated && isLoading) || !queryData) return <WidgetLoader />;
  if (isAuthenticated && error) return <div>Error: {error.message}</div>;
  const data = isAuthenticated ? queryData : localAyahData;

  return (
    <ScrollArea className="max-h-52 w-full rounded-md border">
      <div className="group relative">
        <p
          className={cn(
            `rounded-md bg-card px-2 text-center text-2xl/[3rem] ${
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
                  <Button onClick={handleData}>Save</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ScrollArea>
  );
}
