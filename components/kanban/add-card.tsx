'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import useKanbanStore from '@/stores/kanban';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type AddCardProps = {
  listId: string;
  headerColor: string;
};

const AddCardFormSchema = z.object({
  text: z.string().min(2, {
    message: 'The card must be at least 2 characters.',
  }),
});

export default function AddCard({ listId, headerColor }: AddCardProps) {
  const { addCard } = useKanbanStore((state) => state);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof AddCardFormSchema>>({
    resolver: zodResolver(AddCardFormSchema),
    defaultValues: {
      text: '',
    },
  });

  function onSubmit(data: z.infer<typeof AddCardFormSchema>) {
    addCard(listId, data.text);
    toast.success('The card has been added successfully.');
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'} style={{ borderColor: headerColor }} className="mt-2 border">
          Add Card
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription className="sr-only">Add a Card to your list.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Type a card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
