'use client';

import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import useKanbanStore from '@/stores/kanban';
import { CardT } from '@/types/kanban';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const EditCardFormSchema = z.object({
  text: z.string().min(2, {
    message: 'The card must be at least 2 characters.',
  }),
});

type EditCardProps = {
  card: CardT;
};

export default function EditCard({ card }: EditCardProps) {
  const { editCard } = useKanbanStore((state) => state);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof EditCardFormSchema>>({
    resolver: zodResolver(EditCardFormSchema),
    defaultValues: {
      text: card.content,
    },
  });

  function onSubmit(data: z.infer<typeof EditCardFormSchema>) {
    editCard(card.id, data.text);
    setOpen(false);
    toast.success('The card has been edited successfully.');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Icon
        icon={<Pencil />}
        description="Edit card"
        variant="link"
        className="border-background bg-card hover:border-primary absolute top-1 right-7 hidden size-8 rounded-full border-2 p-2 transition-colors group-hover:flex hover:z-2"
        onClick={() => setOpen(true)}
      />

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Card</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your card here. Click save when you're done.
          </DialogDescription>
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

            <Button type="submit">Edit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
