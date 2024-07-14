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
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import useDailyRemindersStore, { DailyReminderType } from '@/lib/stores/daily-reminders-store';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge, BadgeCheck, Edit, XSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// TODO: handle if no reminders

export default function BrowseRemindersPage() {
  const { dailyReminders, setDailyReminders } = useDailyRemindersStore((state) => state);
  const deleteReminder = (id: string) => {
    delete dailyReminders.reminders[id];
    dailyReminders.order = dailyReminders.order.filter((_id) => _id !== id);
    setDailyReminders(dailyReminders);
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const newOrder = dailyReminders.order;
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);
    dailyReminders.order = newOrder;
    setDailyReminders(dailyReminders);
  };
  const toggleCheck = (id: string) => {
    dailyReminders.reminders[id].done = !dailyReminders.reminders[id].done;
    setDailyReminders(dailyReminders);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'reminders'}>
        {(provided) => (
          <div className="flex flex-col p-1" {...provided.droppableProps} ref={provided.innerRef}>
            {dailyReminders.order.map((id, index) => {
              const reminder = dailyReminders.reminders[id];
              return (
                <Draggable index={index} draggableId={id} key={id}>
                  {(provided) => (
                    <div
                      className="my-[2px] flex items-center gap-1 border border-white bg-card p-1"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div onClick={() => toggleCheck(reminder.id)} className="cursor-pointer">
                        {reminder.done ? <BadgeCheck size={20} /> : <Badge size={20} />}
                      </div>

                      <p className="line-clamp-3 flex-1 break-all font-semibold">{reminder.text}</p>

                      <EditReminder reminder={reminder} />

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={'ghost'} size={'icon'}>
                            <XSquare />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              reminder and remove it from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              color="destructive"
                              onClick={() => deleteReminder(id)}
                              className={`${buttonVariants({ variant: 'destructive' })}`}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const FormSchema = z.object({
  text: z.string().min(2, {
    message: 'The reminder must be at least 2 characters.',
  }),
});

const EditReminder = ({ reminder }: { reminder: DailyReminderType }) => {
  const { dailyReminders, setDailyReminders } = useDailyRemindersStore((state) => state);

  const editReminder = (id: string, newText: string) => {
    dailyReminders.reminders[id].text = newText;
    setDailyReminders(dailyReminders);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: reminder.text,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Reminder</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Type a reminder" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                editReminder(reminder.id, form.watch().text);
              }}
            >
              Edit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
