'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, YoutubeIcon } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useWidgetsStore from '@/lib/stores/widgets';
import type { VideoWidgetStateT } from '@/lib/types/widgets';

const FormSchema = z.object({
  src: z.string().url({
    message: 'Please enter a valid URL',
  }),
});

export default function Video({ id }: { id: string }) {
  const { widgetStates, updateWidgetState } = useWidgetsStore((state) => state);
  const widgetState = widgetStates[id] as VideoWidgetStateT;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      src: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      updateWidgetState(id, { src: form.watch('src') });
      toast.success('Video added successfully!');
      setIsLoading(false);
    }, 600); // Simulate loading for better UX feedback
  }

  function resetVideo() {
    updateWidgetState(id, { src: '' });
    toast.info('Video removed');
  }

  useLayoutEffect(() => {
    if (!widgetState) updateWidgetState(id, { src: '' });
  }, []);

  // Extract video ID from different YouTube URL formats
  const getYoutubeId = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url.split('be/')[1] || '';
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {!widgetState?.src ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="src"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Video URL</FormLabel>
                  <div className="relative">
                    <YoutubeIcon className="absolute top-3 left-3 text-gray-400" />
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="border-gray-300 py-6 pl-10 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                  </div>
                  <FormDescription className="text-sm text-gray-500">
                    Paste a YouTube video link (supports youtube.com and youtu.be URLs)
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" className="w-full" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Video'}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="group relative overflow-hidden rounded-lg shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId(widgetState.src)}`}
            title="YouTube video player"
            allowFullScreen
            className="aspect-video w-full"
            loading="lazy"
          />
          <Button
            onClick={resetVideo}
            className="bg-opacity-60 hover:bg-opacity-80 absolute top-5 right-1 hidden h-6 w-6 rounded-full bg-black p-0 group-hover:flex"
            title="Remove video"
          >
            <X size={10} className="text-white" />
          </Button>
        </div>
      )}
    </div>
  );
}
