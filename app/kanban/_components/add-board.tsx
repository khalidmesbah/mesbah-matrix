'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useKanbanStore from '@/stores/kanban';

const AddBoardSchema = (existingBoards: string[]) =>
  z.object({
    text: z
      .string()
      .min(2, 'The card must be at least 2 characters.')
      .refine((val) => val.trim() !== '', {
        message: "Board name can't be empty",
      })
      .refine((val) => !existingBoards.includes(val.trim()), {
        message: 'This board name already exists',
      }),
  });

export default function AddBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const { kanban, addBoard } = useKanbanStore((state) => state);
  const existingBoards = Object.keys(kanban.boards);
  const boardSchema = AddBoardSchema(existingBoards);

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      text: '',
    },
  });

  function onSubmit(data: z.infer<typeof boardSchema>) {
    const newBoard = data.text.trim();
    addBoard(newBoard);
    setIsOpen(false);
    form.reset();
    // fix board
    toast.success(`The Board \`${newBoard}\` has been added successfully`);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Add Board</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Board</DialogTitle>
          <DialogDescription>Add A new Board to your kanban</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='text'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Name of the board' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
