'use client';

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
import { Button } from '@/components/ui/button';
import useKanbanStore from '@/stores/kanban';
import { toast } from 'sonner';

export default function DeleteBoard() {
  const { kanban, deleteSelectedBoard } = useKanbanStore((state) => state);
  const selectedBoard = kanban.selectedBoard;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'}>Delete board</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your board and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild variant="destructive">
            <Button
              onClick={() => {
                deleteSelectedBoard();
                toast.success(`The Board \`${selectedBoard}\` has been deleted successfully`);
              }}
            >
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
