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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  useAddBoardMutate,
  useDeleteSelectedBoardMutate,
  useKanbanQuery,
  useSetCardsMutate,
  useSetSelectedBoardMutate,
} from '@/lib/hooks/use-kanban-query';
import { CardType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Plus, Trash, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface ColumnProps {
  title: string;
  column: string;
  headingColor: string;
}

interface CardProps {
  title: string;
  id: string;
  column: string;
  handleDragStart: (e: React.DragEvent, card: CardType) => void;
}

interface DropIndicatorProps {
  beforeId: string | null;
  column: string;
}

interface AddCardProps {
  column: string;
}

export default function UserKanbanPage() {
  const { data: kanban, isLoading, isError } = useKanbanQuery();

  console.log(kanban);
  if (isLoading) return <h1>loading</h1>;
  if (isError) return <h1>error</h1>;

  const boards = Object.keys(kanban?.boards || {});

  return (
    <div className="h-screen overflow-hidden">
      <KanbanHeader />
      {boards.length === 0 ? (
        <NoBoards />
      ) : (
        <div className="flex h-screen gap-2 overflow-auto p-2">
          <Column title="Backlog" column="backlog" headingColor="bg-neutral-500" />
          <Column title="TODO" column="todo" headingColor="bg-yellow-500" />
          <Column title="In progress" column="doing" headingColor="bg-blue-500" />
          <Column title="Complete" column="done" headingColor="bg-emerald-500" />
          <BurnBarrel />
        </div>
      )}
    </div>
  );
}

const Column = ({ title, headingColor, column }: ColumnProps) => {
  const [active, setActive] = useState(false);
  let { data: kanban } = useKanbanQuery();
  const { mutate: setCards } = useSetCardsMutate();

  if (!kanban) kanban = { boards: {}, selectedBoard: '' };
  const cards = kanban?.boards[kanban?.selectedBoard];

  const handleDragStart = (e: React.DragEvent, card: CardType) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData('cardId');

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || '-1';

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === '-1';

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = '0';
    });
  };

  const highlightIndicator = (e: React.DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    (el.element as HTMLElement).style.opacity = '1';
  };

  const getNearestIndicator = (e: React.DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIndicators = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[];
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards?.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className={`mb-3 flex items-center justify-between ${headingColor} rounded-md p-2`}>
        <h3 className={`font-medium`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">{filteredCards?.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${active ? 'bg-card' : 'bg-card/0'}`}
      >
        {filteredCards?.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  const onDragStart = (e: React.DragEvent) => {
    if (e.type === 'dragstart' && 'dataTransfer' in e) {
      handleDragStart(e, {
        title,
        id,
        column,
      });
    }
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => onDragStart(e as unknown as React.DragEvent)}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};
const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = () => {
  const [active, setActive] = useState(false);
  let { data: kanban } = useKanbanQuery();
  const { mutate: setCards } = useSetCardsMutate();

  if (!kanban) kanban = { boards: {}, selectedBoard: '' };
  const cards = kanban.boards[kanban.selectedBoard];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData('cardId');
    const newCards = cards.filter((c) => c.id !== cardId);

    setCards(newCards);

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'border-neutral-500 bg-neutral-500/20 text-neutral-500'
      }`}
    >
      {active ? <Trash2 className="animate-bounce" /> : <Trash />}
    </div>
  );
};

const AddCard = ({ column }: AddCardProps) => {
  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);
  let { data: kanban } = useKanbanQuery();
  const { mutate: setCards } = useSetCardsMutate();

  if (!kanban) kanban = { boards: {}, selectedBoard: '' };

  const cards = kanban.boards[kanban.selectedBoard];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: CardType = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };
    const newCards = [...cards, newCard];

    setCards(newCards);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="placeholder-border-300 w-full rounded border border-border bg-border/20 p-3 text-sm text-neutral-500 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-foreground transition-colors hover:text-foreground/50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <Plus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs transition-colors hover:text-foreground/50"
        >
          <span>Add card</span>
          <Plus />
        </motion.button>
      )}
    </>
  );
};

const createBoardSchema = (existingBoards: string[]) =>
  z.object({
    text: z
      .string()
      .min(2, 'The task must be at least 2 characters.')
      .refine((val) => val.trim() !== '', {
        message: "Board name can't be empty",
      })
      .refine((val) => !existingBoards.includes(val.trim()), {
        message: 'This board name already exists',
      }),
  });

function DeleteBoard() {
  let { data: kanban } = useKanbanQuery();
  if (!kanban) kanban = { boards: {}, selectedBoard: '' };
  const { mutate: deleteSelectedBoard } = useDeleteSelectedBoardMutate();

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
function AddBoard() {
  const [isOpen, setIsOpen] = useState(false);
  let { data: kanban } = useKanbanQuery();
  const { mutate: addBoard } = useAddBoardMutate();
  if (!kanban) kanban = { boards: {}, selectedBoard: '' };
  const existingBoards = Object.keys(kanban.boards);
  const boardSchema = createBoardSchema(existingBoards);

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
    toast.success(`The Board \`${newBoard}\` has been added successfully`);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Add Board</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Board</DialogTitle>
          <DialogDescription>Add A new Board to your kanban</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name of the board" {...field} />
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

function NoBoards() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="space-y-8 text-center">
        <div className="rounded-lg bg-card p-8 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">No Boards</h2>
            <p className="max-w-md text-muted-foreground">
              It looks like you haven&apos;t created any boards yet. Get started by creating your
              first board.
            </p>
          </div>
          <div className="mt-6 flex justify-center" />
        </div>
      </div>
    </div>
  );
}

function KanbanHeader() {
  let { data: kanban } = useKanbanQuery();
  if (!kanban) kanban = { boards: {}, selectedBoard: '' };
  const boards = Object.keys(kanban.boards);
  const { mutate: setSelectedBoard } = useSetSelectedBoardMutate();
  return (
    <Sheet>
      <div className="mb-2 flex flex-col items-center justify-between gap-2 rounded-md bg-secondary p-2 xs:flex-row">
        <h1>Your Boards</h1>
        <SheetTrigger asChild>
          <Button className="w-full xs:w-fit">Manage</Button>
        </SheetTrigger>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Kanban Board</SheetTitle>
          <SheetDescription className="sr-only">Manage your Kanban Board</SheetDescription>
        </SheetHeader>
        <header className="flex flex-col gap-2">
          <h2 className="flex flex-wrap items-center gap-2">
            <span>Board :</span>
            <Select onValueChange={(value) => setSelectedBoard(value)} value={kanban.selectedBoard}>
              <SelectTrigger>
                <SelectValue placeholder="No Boards" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>No Boards</SelectLabel>
                  {boards.map((b, i) => {
                    return (
                      <SelectItem key={i} value={b}>
                        {b}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </h2>
          <div className="flex flex-col justify-stretch gap-2">
            {boards.length !== 0 && <DeleteBoard />}
            <AddBoard />
          </div>
        </header>
      </SheetContent>
    </Sheet>
  );
}
