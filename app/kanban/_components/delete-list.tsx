'use client';

import { Trash } from 'lucide-react';
import Icon from '@/components/icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import useKanbanStore from '@/stores/kanban';

type DeleteListProps = {
  listId: string;
};

export default function DeleteList({ listId }: DeleteListProps) {
  const { deleteList } = useKanbanStore((state) => state);

  return (
    <AlertDialog>
      <Icon
        icon={
          <AlertDialogTrigger asChild>
            <Trash className='stroke-inherit' />
          </AlertDialogTrigger>
        }
        description='Delete List'
        variant='link'
        className='border-background bg-card stroke-destructive hover:border-destructive absolute top-1 right-1 hidden size-8 rounded-full border-2 p-2 transition-colors group-hover:flex hover:z-2'
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your card and remove it from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            color='destructive'
            onClick={() => deleteList(listId)}
            className={`${buttonVariants({ variant: 'destructive' })}`}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
