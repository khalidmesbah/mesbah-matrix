'use client';

import { _getMatrix } from '@/actions/the-matrix';
import ParticlesLoader from '@/components/particles-loader';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import useMatrixStore, { ColumnType, MatrixType, TaskType } from '@/stores/the-matrix';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Badge,
  BadgeCheck,
  BadgeInfo,
  BadgePlus,
  BadgeX,
  Grip,
  Pencil,
  Settings,
} from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';
// TODO replace column with quadrant
// FIX: fix the onsubmit function to add user feedback to the project

const FormSchema = z.object({
  text: z.string().min(2, {
    message: 'The task must be at least 2 characters.',
  }),
});

export default function MatrixPage() {
  const { isLoading, data } = useQuery({
    queryKey: ['the-matrix'],
    queryFn: (): Promise<MatrixType> => _getMatrix(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: true,
  });
  const { matrix, setMatrix: _setMatrix } = useMatrixStore();
  const queryClient = useQueryClient();

  const setMatrix = (newMatrix: MatrixType) => {
    _setMatrix(newMatrix);
    queryClient.invalidateQueries({ queryKey: ['the-matrix'] });
  };

  useEffect(() => {
    if (!isLoading && data) {
      setMatrix(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onDragEnd = async (result: DropResult) => {
    const { draggableId, destination, source } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const start = matrix.columns[source.droppableId];
    const finish = matrix.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...matrix,
        columns: {
          ...matrix.columns,
          [newColumn.id]: newColumn,
        },
      };

      setMatrix(newState);
      return;
    }
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...matrix,
      columns: {
        ...matrix.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setMatrix(newState);
  };

  if (isLoading) return <ParticlesLoader />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid h-[calc(100dvh_-_16px)] grid-cols-1 gap-1 sm:grid-cols-2 sm:grid-rows-2">
        {matrix.columnOrder.map((columnId) => {
          const column = matrix.columns[columnId];
          const tasks = column.taskIds.map((taskId) => matrix.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} setMatrix={setMatrix} />;
        })}
      </div>
    </DragDropContext>
  );
}

function Column({
  column,
  tasks,
  setMatrix,
}: {
  column: ColumnType;
  tasks: TaskType[];
  setMatrix: (newMatrix: MatrixType) => void;
}) {
  const { matrix } = useMatrixStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: '',
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

  const addTask = (text: string) => {
    const id = uuidV4();
    matrix.tasks[id] = { id, text, done: false };
    matrix.columns[column.id].taskIds.push(id);
    setMatrix(matrix);
  };

  return (
    <div
      className={`flex flex-col rounded-md border-2 sm:flex-row ${column.title === 'do' ? 'border-[#34a853]' : column.title === 'schedule' ? 'border-[#4285f4]' : column.title === 'delegate' ? 'border-[#fbbc05]' : 'border-[#ea4335]'}`}
    >
      <div
        className={`flex gap-1 sm:flex-col ${column.title === 'do' ? 'bg-[#34a853]' : column.title === 'schedule' ? 'bg-[#4285f4]' : column.title === 'delegate' ? 'bg-[#fbbc05]' : 'bg-[#ea4335]'}`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button size={'icon'} variant={'link'} className="text-foreground">
              <BadgePlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {column.title === 'do'
                  ? 'Urgent and Important'
                  : column.title === 'schedule'
                    ? 'Not Urgent but Important'
                    : column.title === 'delegate'
                      ? 'Urgent but Not Important'
                      : column.title === 'delete'
                        ? 'Not Urgent and Not Important'
                        : 'Not A Valid Title!!'}
              </DialogTitle>
              <DialogDescription>
                Add a Task To `{column.title.toUpperCase()}` column.
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
                        <Input placeholder="Type a task" {...field} />
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
                    addTask(form.getValues().text);
                    form.reset();
                  }}
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <h2 className="flex flex-1 items-center justify-center font-extrabold uppercase sm:scale-[-1] sm:[writing-mode:vertical-lr]">
          {column.title}
        </h2>

        <HoverCard>
          <HoverCardTrigger>
            <div className="flex h-10 w-10 items-center justify-center rounded-full">
              <BadgeInfo />
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            {column.title === 'do'
              ? 'Tasks with deadlines or consequences'
              : column.title === 'schedule'
                ? 'Tasks with unclear deadlines that contribute to long-term success.'
                : column.title === 'delegate'
                  ? "Tasks that must get done but don't require your specific skill set."
                  : column.title === 'delete'
                    ? 'Distractions and unnecessary tasks.'
                    : 'Not A Valid Title!!'}
          </HoverCardContent>
        </HoverCard>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full overflow-y-auto overflow-x-hidden rounded-md p-[2px]"
          >
            {tasks.length ? (
              tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  columnId={column.id}
                  setMatrix={setMatrix}
                />
              ))
            ) : (
              <p className="border-1 border-border p-1">No Tasks Yet!</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function Task({
  task,
  index,
  columnId,
  setMatrix,
}: {
  task: TaskType;
  index: number;
  columnId: string;
  setMatrix: (newMatrix: MatrixType) => void;
}) {
  const { matrix } = useMatrixStore();

  const toggleCheck = (id: string) => {
    matrix.tasks[id].done = !matrix.tasks[id].done;
    setMatrix(matrix);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div className="p-[2px]" {...provided.draggableProps} ref={provided.innerRef}>
          <div className="flex items-stretch rounded-md bg-secondary">
            <div className="relative w-6 px-3">
              <Button
                variant={'link'}
                size="sm"
                className="absolute inset-0 h-full w-full rounded-none"
                onClick={() => toggleCheck(task.id)}
              >
                {task.done ? (
                  <Icon icon={<BadgeCheck size={20} />} />
                ) : (
                  <Icon icon={<Badge size={20} />} />
                )}
              </Button>
            </div>

            <p className="line-clamp-1 flex w-full items-center p-1">{task.text}</p>
            <div className="relative">
              <TaskSettings task={task} columnId={columnId} setMatrix={setMatrix} />
            </div>
            <div className="relative">
              <Icon icon={<Grip size={20} />} {...provided.dragHandleProps} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

function TaskSettings({
  task,
  columnId,
  setMatrix,
}: {
  task: TaskType;
  columnId: string;
  setMatrix: (newMatrix: MatrixType) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className={`h-full w-6! rounded-none bg-none! p-1!`}>
          <Icon icon={<Settings size={20} />} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EditTask task={task} setMatrix={setMatrix} />
        <DeleteTask task={task} columnId={columnId} setMatrix={setMatrix} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DeleteTask({
  task,
  columnId,
  setMatrix,
}: {
  task: TaskType;
  columnId: string;

  setMatrix: (newMatrix: MatrixType) => void;
}) {
  const { matrix } = useMatrixStore();

  const deleteTask = (id: string) => {
    delete matrix.tasks[id];
    const newTaskIds = matrix.columns[columnId].taskIds.filter((taskId) => taskId !== id);
    matrix.columns[columnId].taskIds = newTaskIds;
    setMatrix(matrix);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <button className="flex w-full! items-center">
            <BadgeX className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </button>
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task and remove it from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            color="destructive"
            onClick={() => deleteTask(task.id)}
            className={`${buttonVariants({ variant: 'destructive' })}`}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EditTask({
  task,
  setMatrix,
}: {
  task: TaskType;
  setMatrix: (newMatrix: MatrixType) => void;
}) {
  const { matrix } = useMatrixStore();

  const editTask = (id: string, text: string) => {
    matrix.tasks[id].text = text;
    setMatrix(matrix);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: task.text,
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <button className="flex w-full! items-center">
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </button>
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
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
                    <Input placeholder="Type a task" {...field} />
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
                editTask(task.id, form.getValues().text);
              }}
            >
              Edit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Icon({ icon, ...props }: { icon: ReactNode }) {
  return (
    <div
      className={`${buttonVariants({ variant: 'link' })} h-full w-6! rounded-none p-1!`}
      {...props}
    >
      {icon}
    </div>
  );
}
