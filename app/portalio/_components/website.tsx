import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import usePortalioStore from '@/lib/stores/portalio';
import type { WebsiteStateT } from '@/lib/types/portalio';
import 'react-grid-layout/css/styles.css';
import { useForm } from 'react-hook-form';
import 'react-resizable/css/styles.css';
import 'swiper/css';
import * as z from 'zod';

interface WebsiteProps {
  id: string;
  url: string;
  name: string | undefined;
  iconUrl: string | undefined;
}

// Zod schema for website form
const websiteFormSchema = z.object({
  name: z.string().optional(),
  iconUrl: z.string().url('Must be a valid URL').or(z.string().length(0)),
  url: z.string().url().optional(),
});

function getWebsiteData(url: string) {
  const domain = url.replace('http://', '').replace('https://', '');
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
  const parsedUrl = new URL(url);
  const domainName = parsedUrl.hostname.replace(/^www\./, '');
  return { favicon: faviconUrl, name: domainName };
}

export function Website({ id, url, name, iconUrl }: WebsiteProps) {
  const websiteData = getWebsiteData(url);
  if (!name) name = websiteData.name;
  if (!iconUrl) iconUrl = websiteData.favicon;

  const { currentSlideId, updateSlideState, deleteSlideState, reOrder } = usePortalioStore();
  const [editWebsiteDialogOpen, setEditWebsiteDialogOpen] = useState(false);
  const [deleteWebsiteDialogOpen, setDeleteWebsiteDialogOpen] = useState(false);
  const [autoFillName, setAutoFillName] = useState(false);
  const [autoFillIconUrl, setAutoFillIconUrl] = useState(false);

  const editWebsiteForm = useForm<z.infer<typeof websiteFormSchema>>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: {
      url: '',
      name: '',
      iconUrl: '',
    },
  });

  const onEditWebsiteSubmit = (data: z.infer<typeof websiteFormSchema>) => {
    const newUrl = data.url || url;
    let newIconUrl = data.iconUrl || iconUrl;
    let newName = data.name || name;
    const { name: dataName, favicon: dataIconUrl } = getWebsiteData(newUrl);

    if (autoFillName) newName = dataName;
    if (autoFillIconUrl) newIconUrl = dataIconUrl;

    setEditWebsiteDialogOpen(false);
    console.log(data, 'onEditWebsiteSubmit');
    updateSlideState(id, {
      name: newName,
      url: newUrl,
      iconUrl: newIconUrl,
    } as WebsiteStateT);
    editWebsiteForm.reset();
  };

  useEffect(() => {
    // console.log(autoFillIconUrl);
  });

  return (
    <div className="size-full">
      <div className="fc bg-background absolute top-1/2 -right-9 -translate-y-1/2 flex-col gap-2 rounded-full p-1">
        <Button
          variant={'default'}
          className="aspect-square size-6 cursor-pointer rounded-full p-2"
          onClick={() => {
            setEditWebsiteDialogOpen(true);
          }}
        >
          <Pencil />
        </Button>
        <Button
          variant={'destructive'}
          className="aspect-square size-6 cursor-pointer rounded-full p-2"
          onClick={() => {
            setDeleteWebsiteDialogOpen(true);
          }}
        >
          <Trash />
        </Button>
      </div>

      <Link
        href={url}
        className={`${reOrder && 'pointer-events-none'} bg-primary flex size-full flex-col items-center justify-center rounded-md text-white transition-transform hover:scale-110`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit our ${name} page`}
      >
        <img src={iconUrl} title={name} className="size-10" />
        <span className="w-full truncate overflow-hidden p-1 text-center text-sm text-gray-200">
          {name}
        </span>
      </Link>

      <Dialog open={editWebsiteDialogOpen} onOpenChange={setEditWebsiteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Website</DialogTitle>
            <DialogDescription>
              Update the Name, Icon URL, and Website URL the website.
            </DialogDescription>
          </DialogHeader>

          <Form {...editWebsiteForm}>
            <form
              onSubmit={editWebsiteForm.handleSubmit(onEditWebsiteSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editWebsiteForm.control}
                name="name"
                disabled={autoFillName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editWebsiteForm.control}
                name="iconUrl"
                disabled={autoFillIconUrl}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/icon.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full max-w-sm items-center space-x-2">
                <Toggle
                  pressed={autoFillIconUrl}
                  onPressedChange={(e) => {
                    setAutoFillIconUrl(e);
                  }}
                >
                  Autofill IconUrl
                </Toggle>
                <Toggle
                  pressed={autoFillName}
                  onPressedChange={(e) => {
                    setAutoFillName(e);
                  }}
                >
                  Autofill Name
                </Toggle>
              </div>

              <FormField
                control={editWebsiteForm.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Edit Website</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteWebsiteDialogOpen} onOpenChange={setDeleteWebsiteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteSlideState(id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
