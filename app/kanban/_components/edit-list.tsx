'use client';

import Icon from '@/components/icon';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useKanbanStore from '@/stores/kanban';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brush, Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type EditListProps = {
  id: string;
  title: string;
  headerColor: string;
};

const EditListFormSchema = z.object({
  title: z.string().min(2, {
    message: 'The List must be at least 2 characters.',
  }),
  color: z.string().min(2, {
    message: 'No color selected.',
  }),
});

export default function EditList({ id, title, headerColor }: EditListProps) {
  const { editList } = useKanbanStore((state) => state);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof EditListFormSchema>>({
    resolver: zodResolver(EditListFormSchema),
    defaultValues: {
      title,
    },
  });

  function onSubmit(data: z.infer<typeof EditListFormSchema>) {
    editList(id, data.title, data.color);
    setOpen(false);
    toast.success('The list has been edited successfully.');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Icon
        icon={
          <DialogTrigger asChild>
            <Pencil />
          </DialogTrigger>
        }
        description="Edit list"
        variant="link"
        className="border-background bg-card stroke-destructive hover:border-primary absolute top-1 right-7 hidden size-8 rounded-full border-2 p-2 transition-colors group-hover:flex hover:z-2"
      />

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit List</DialogTitle>
          <DialogDescription className="sr-only">Edit a List.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Type the title of the list" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Label htmlFor="color" className="fc gap-2">
                      <Icon
                        description="Choose a color"
                        icon={<Brush />}
                        className="text-foreground pointer-events-none h-min p-1"
                        variant="link"
                        size="sm"
                      />
                      <p>Color: </p>
                      <Input type="color" id="color" {...field} />
                    </Label>
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
