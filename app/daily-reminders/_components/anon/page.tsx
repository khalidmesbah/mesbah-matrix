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
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import useMySound from '@/hooks/use-my-sound';
import { startFireworks } from '@/lib/utils';
import useDailyRemindersStore from '@/stores/daily-reminders';
import { DailyReminderT } from '@/types/daily';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge, BadgeCheck, CalendarIcon, Edit, PartyPopperIcon, XSquare } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Masonry } from 'react-plock';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  text: z.string().min(2, {
    message: 'The task must be at least 2 characters.',
  }),
});

export default function AnonDailyRemindersPage() {
  const current = useDailyRemindersStore((state) => state.current);

  return (
    <div className="flex flex-col gap-2">
      <DailyReminderHeaderWithSheet />
      <DailyReminderHeader />
      {current === 'browse' ? <BrowseReminders /> : <PractiseReminders />}
    </div>
  );
}

function PractiseReminders() {
  const { dailyReminders, setDailyReminders } = useDailyRemindersStore((state) => state);
  const order = dailyReminders.order.filter((id) => dailyReminders.reminders[id].done === false);
  const [play] = useMySound('/sounds/winfantasia-6912.mp3');

  return (
    <div>
      {dailyReminders.order.length === 0 ? (
        <NoReminders />
      ) : order.length === 0 ? (
        <FinishedReminders />
      ) : (
        <div>
          <Masonry
            items={order.map((id) => dailyReminders.reminders[id])}
            config={{
              columns: [1, 2, 3],
              gap: [8, 8, 8],
              media: [600, 850, 1024],
            }}
            render={(reminder) => (
              <Card key={reminder.id} className="p-2">
                <CardContent className="select-none break-all p-0 text-2xl font-semibold">
                  {reminder.text}
                </CardContent>
                <CardFooter className="mt-2 p-0">
                  <Button
                    onClick={() => {
                      if (order.length === 1) {
                        startFireworks();
                        play();
                      }
                      dailyReminders.reminders[reminder.id].done = !reminder.done;
                      setDailyReminders(dailyReminders);
                    }}
                  >
                    Got it
                  </Button>
                </CardFooter>
              </Card>
            )}
          />
        </div>
      )}
    </div>
  );
}

function DailyReminderHeader() {
  const { current, setCurrent } = useDailyRemindersStore((state) => state);
  return (
    <div className="mb-2 hidden items-center justify-between gap-2 rounded-md bg-secondary p-2 xs:flex-row sm:flex">
      <h1 className="text-2xl">Daily Reminders</h1>

      <div className="flex items-center justify-between gap-2">
        {current === 'practise' ? (
          <Button onClick={() => setCurrent('browse')}>Browse Reminders</Button>
        ) : (
          <Button onClick={() => setCurrent('practise')}>Practise Reminders</Button>
        )}
        <AddReminder />
      </div>
    </div>
  );
}

function DailyReminderHeaderWithSheet() {
  const { current, setCurrent } = useDailyRemindersStore((state) => state);
  return (
    <Sheet>
      <div className="mb-2 flex flex-col items-center justify-between gap-2 rounded-md bg-secondary p-2 xs:flex-row sm:hidden">
        <h1 className="text-2xl">Daily Reminders</h1>
        <SheetTrigger asChild>
          <Button className="w-full xs:w-fit">Manage</Button>
        </SheetTrigger>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>daily reminders</SheetTitle>
          <SheetDescription className="sr-only">Manage your Kanban Board</SheetDescription>
        </SheetHeader>
        <div className="my-2 flex flex-col justify-stretch gap-2">
          {current === 'practise' ? (
            <Button onClick={() => setCurrent('browse')}>Browse Reminders</Button>
          ) : (
            <Button onClick={() => setCurrent('practise')}>Practise Reminders</Button>
          )}
          <AddReminder />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function AddReminder() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: '',
    },
  });
  const { addDailyReminder } = useDailyRemindersStore((state) => state);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addDailyReminder(data.text);
    form.reset();
    setIsOpen(false);
    toast.success(`The Reminder \`${data.text}\` has been added successfully`);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Reminder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Daily Reminder</DialogTitle>
          <DialogDescription>Add a daily reminder.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function BrowseReminders() {
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

  if (dailyReminders?.order.length === 0) return <NoReminders />;

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
                      className="my-[2px] flex items-center gap-1 rounded-md border border-white bg-card p-1"
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

const EditReminder = ({ reminder }: { reminder: DailyReminderT }) => {
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
    toast.success(JSON.stringify(data));
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
                    <Textarea placeholder="T a reminder" className="resize-none" {...field} />
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

function FinishedReminders() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary">Hooray! You&apos;re all caught up!</h2>
        <p className="mt-4 text-xl text-foreground">
          Take a moment to celebrate your productivity and accomplishments.
        </p>
        <div className="mt-6">
          <PartyPopperIcon className="mx-auto h-12 w-12 text-primary" />
        </div>
      </div>
    </div>
  );
}

function NoReminders() {
  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CalendarIcon className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          No reminders yet
        </h2>
        <p className="mt-4 text-muted-foreground">
          It looks like you haven&apos;t added any reminders yet. Why not create one and stay on top
          of your tasks?
        </p>
        <div className="mt-6">
          <AddReminder />
        </div>
      </div>
    </div>
  );
}
