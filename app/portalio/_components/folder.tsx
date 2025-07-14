import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
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
import usePortalioStore from '@/lib/stores/portalio';
import type { FolderStateT } from '@/lib/types/portalio';
import 'react-grid-layout/css/styles.css';
import { useForm } from 'react-hook-form';
import 'react-resizable/css/styles.css';
import 'swiper/css';
import * as z from 'zod';

interface FolderProps {
  id: string;
  name: string | undefined;
  iconUrl: string | undefined;
}
// Zod schema for folder form
const folderFormSchema = z.object({
  name: z.string().min(1, 'Folder name is required'),
  iconUrl: z.string().url('Must be a valid URL').or(z.string().length(0)),
});

export function Folder({ id, name, iconUrl }: FolderProps) {
  const { currentSlideId, updateSlideState, deleteSlideState } = usePortalioStore();
  const [editFolderDialogOpen, setEditFolderDialogOpen] = useState(false);
  const [deleteFolderDialogOpen, setDeleteFolderDialogOpen] = useState(false);

  const editFolderForm = useForm<z.infer<typeof folderFormSchema>>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: {
      name: '',
      iconUrl: '',
    },
  });

  const onEditFolderSubmit = (data: z.infer<typeof folderFormSchema>) => {
    setEditFolderDialogOpen(false);
    console.log(data, 'onEditFolderSubmit');
    updateSlideState(id, {
      name: data.name,
      iconUrl: data.iconUrl || iconUrl,
    } as FolderStateT);
    editFolderForm.reset();
  };

  return (
    <div className="bg-primary flex size-full flex-col items-center justify-center rounded-md text-white transition-transform hover:scale-110">
      <div className="fc bg-background absolute top-1/2 -right-9 -translate-y-1/2 flex-col gap-2 rounded-full p-1">
        <Button
          variant={'default'}
          className="aspect-square size-6 cursor-pointer rounded-full p-2"
          onClick={() => {
            setEditFolderDialogOpen(true);
          }}
        >
          <Pencil />
        </Button>
        <Button
          variant={'destructive'}
          className="aspect-square size-6 cursor-pointer rounded-full p-2"
          onClick={() => {
            setDeleteFolderDialogOpen(true);
          }}
        >
          <Trash />
        </Button>
      </div>
      <img src={iconUrl || undefined} title={name} className="size-10" />
      <span className="w-full truncate overflow-hidden p-1 text-center text-sm text-gray-200">
        {name}
      </span>

      <Dialog open={editFolderDialogOpen} onOpenChange={setEditFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
            <DialogDescription>Enter a new name for the folder.</DialogDescription>
          </DialogHeader>

          <Form {...editFolderForm}>
            <form onSubmit={editFolderForm.handleSubmit(onEditFolderSubmit)} className="space-y-4">
              <FormField
                control={editFolderForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Folder" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editFolderForm.control}
                name="iconUrl"
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

              <DialogFooter>
                <Button type="submit">Edit Folder</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteFolderDialogOpen} onOpenChange={setDeleteFolderDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your folder.
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
