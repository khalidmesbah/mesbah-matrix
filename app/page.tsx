"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { _getMatrix } from "@/lib/server-actions/the-matrix-actions";
import useMatrixStore, {
  ColumnType,
  TaskType,
} from "@/lib/stores/the-matrix-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
// import Navbar from "@/components/navbar";
// import Image from "next/image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  Badge,
  BadgeCheck,
  BadgePlus,
  Grip,
  Settings,
  Pencil,
  BadgeX,
  BadgeInfo,
} from "lucide-react";
// TODO replace column with quadrant
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Home() {
  const { matrix, setMatrix } = useMatrixStore((state) => state);
  const { data, isLoading } = useQuery({
    queryKey: ["the-matrix"],
    queryFn: () => _getMatrix(),
  });
  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
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

  useEffect(() => {
    if (data) {
      setMatrix(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 h-full gap-1 bg-background">
        {matrix.columnOrder.map((columnId) => {
          const column = matrix.columns[columnId];
          const tasks = column.taskIds.map((taskId) => matrix.tasks[taskId]);
          return (
            <Column key={column.id} column={column} tasks={tasks}></Column>
          );
        })}
      </div>
    </DragDropContext>
  );
}

const FormSchema = z.object({
  text: z.string().min(2, {
    message: "The task must be at least 2 characters.",
  }),
});

function Column({ column, tasks }: { column: ColumnType; tasks: TaskType[] }) {
  const { matrix, setMatrix } = useMatrixStore((state) => state);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
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
      className={`flex flex-col sm:flex-row gap-1 ${column.title === "do" ? "bg-[#34a853]" : column.title === "schedule" ? "bg-[#4285f4]" : column.title === "delegate" ? "bg-[#fbbc05]" : "bg-[#ea4335]"} border-1 border-foreground`}
    >
      <div className="flex sm:flex-col gap-1 sm:border-r-2 sm:border-white">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"} variant={"link"} className="!rounded-none">
              <BadgePlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {column.title === "do"
                  ? "Urgent and Important"
                  : column.title === "schedule"
                    ? "Not Urgent but Important"
                    : column.title === "delegate"
                      ? "Urgent but Not Important"
                      : column.title === "delete"
                        ? "Not Urgent and Not Important"
                        : "Not A Valid Title!!"}
              </DialogTitle>
              <DialogDescription>
                Add a Task To `{column.title.toUpperCase()}` column.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 bg-card"
              >
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

        <h2 className="flex-1 uppercase flex justify-center items-center sm:scale-[-1] sm:[writing-mode:vertical-lr]">
          {column.title}
        </h2>

        <HoverCard>
          <HoverCardTrigger>
            <div className="w-10 h-10 flex justify-center items-center rounded-full">
              <BadgeInfo />
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            {column.title === "do"
              ? "Tasks with deadlines or consequences"
              : column.title === "schedule"
                ? "Tasks with unclear deadlines that contribute to long-term success."
                : column.title === "delegate"
                  ? "Tasks that must get done but don't require your specific skill set."
                  : column.title === "delete"
                    ? "Distractions and unnecessary tasks."
                    : "Not A Valid Title!!"}
          </HoverCardContent>
        </HoverCard>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="overflow-y-auto overflow-x-hidden w-full p-[2px]"
          >
            {tasks.length ? (
              tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  columnId={column.id}
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
}: {
  task: TaskType;
  index: number;
  columnId: string;
}) {
  const { matrix, setMatrix } = useMatrixStore((state) => state);
  const toggleCheck = (id: string) => {
    matrix.tasks[id].done = !matrix.tasks[id].done;
    setMatrix(matrix);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="p-[2px] flex"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div onClick={() => toggleCheck(task.id)} className="cursor-pointer">
            {task.done ? (
              <Icon icon={<BadgeCheck size={20} />} />
            ) : (
              <Icon icon={<Badge size={20} />} />
            )}
          </div>
          <p className="p-1 w-full line-clamp-1 flex items-center bg-card/40">
            {task.text}
          </p>
          <TaskSettings task={task} columnId={columnId} />
          <Icon icon={<Grip size={20} />} {...provided.dragHandleProps} />
        </div>
      )}
    </Draggable>
  );
}

function TaskSettings({
  task,
  columnId,
}: {
  task: TaskType;
  columnId: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className={`rounded-none !p-1 !w-6`}>
          <Icon icon={<Settings size={20} />} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EditTask task={task} />
        <DeleteTask task={task} columnId={columnId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DeleteTask({ task, columnId }: { task: TaskType; columnId: string }) {
  const { matrix, setMatrix } = useMatrixStore((state) => state);
  const deleteTask = (id: string) => {
    delete matrix.tasks[id];
    const newTaskIds = matrix.columns[columnId].taskIds.filter(
      (taskId) => taskId !== id,
    );
    matrix.columns[columnId].taskIds = newTaskIds;
    setMatrix(matrix);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <button className="flex items-center !w-full">
            <BadgeX className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </button>
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            color="destructive"
            onClick={() => deleteTask(task.id)}
            className={`${buttonVariants({ variant: "destructive" })}`}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EditTask({ task }: { task: TaskType }) {
  const { matrix, setMatrix } = useMatrixStore((state) => state);
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
      title: "You submitted the following values:",
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
          <button className="flex items-center !w-full">
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-card"
          >
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
      className={`${buttonVariants({ variant: "link" })} bg-card/40 rounded-none !p-1 !w-6`}
      {...props}
    >
      {icon}
    </div>
  );
}
