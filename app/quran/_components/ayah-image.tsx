'use client';

import Icon from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SURAHS } from '@/public/data/quran';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

type AyahImageProps = {
  surah: number;
  ayah: number;
};
export function AyahImage({ surah, ayah }: AyahImageProps) {
  const src = `http://cdn.islamic.network/quran/images/${surah}_${ayah}.png`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.target = '_blank';
    link.download = `${surah}_${ayah}.png`;
    link.click();
  };

  return (
    <Dialog>
      <Icon
        description="Image of the Ayah"
        icon={
          <DialogTrigger asChild className="flex items-center gap-2">
            <ImageIcon />
          </DialogTrigger>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image of the Ayah</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="fc flex-wrap gap-1">
            <Badge variant={'secondary'}>Surah</Badge>
            {SURAHS[surah - 1].label}
          </span>
          <span className="fc flex-wrap gap-1">
            <Badge variant={'secondary'}>Ayah</Badge>
            {ayah}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Image
            src={src}
            width={1000}
            height={1000}
            placeholder="blur-sm"
            blurDataURL="/imgs/ayah-placeholder.jpeg"
            className="rounded-md bg-white p-2"
            alt={`surah: ${surah}, ayah: ${ayah}`}
          />
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
