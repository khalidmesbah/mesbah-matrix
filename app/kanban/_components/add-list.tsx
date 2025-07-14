'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Brush } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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

const AddListFormSchema = z.object({
  title: z.string().min(2, {
    message: 'The List must be at least 2 characters.',
  }),
  color: z.string().min(2, {
    message: 'No color selected.',
  }),
});

export default function AddList() {
  const { addList } = useKanbanStore((state) => state);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof AddListFormSchema>>({
    resolver: zodResolver(AddListFormSchema),
    defaultValues: {
      title: '',
      color: '',
    },
  });

  function onSubmit(data: z.infer<typeof AddListFormSchema>) {
    addList(data.title, data.color);
    toast.success('The list has been added successfully.');
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'} className={`m-2 max-w-[425px] min-w-[250px] flex-1 border`}>
          Add List
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add List</DialogTitle>
          <DialogDescription className="sr-only">Add a new List.</DialogDescription>
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
            <Button type="submit">Add</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
