'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
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
import useKanbanStore from '@/stores/kanban';
import AddBoard from './add-board';
import DeleteBoard from './delete-board';

export function KanbanHeaderWithSheet() {
  const { kanban, setSelectedBoard } = useKanbanStore((state) => state);
  const boards = Object.keys(kanban.boards);
  return (
    <Sheet>
      <div className="mb-2 flex items-center justify-between gap-2 rounded-md bg-secondary p-2 sm:hidden">
        <h1 className="text-2xl">{kanban.selectedBoard}</h1>
        <SheetTrigger asChild>
          <Button className="xs:w-fit">Manage</Button>
        </SheetTrigger>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Kanban Board</SheetTitle>
          <SheetDescription className="sr-only">Manage your Kanban Board</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          <h2 className="flex flex-wrap items-center gap-2">
            <span>Board:</span>
            <Select onValueChange={(value) => setSelectedBoard(value)} value={kanban.selectedBoard}>
              <SelectTrigger>
                <SelectValue placeholder="No Boards" />
              </SelectTrigger>
              <SelectContent>
                {boards.length === 0 ? (
                  <SelectItem value="No Boards">
                    <p className="max-w-fit pr-4">No Boards</p>
                  </SelectItem>
                ) : (
                  boards.map((b, i) => {
                    return (
                      <SelectItem key={i} value={b}>
                        <p className="max-w-fit pr-4">{b}</p>
                      </SelectItem>
                    );
                  })
                )}
              </SelectContent>
            </Select>
          </h2>
          <div className="flex flex-col justify-stretch gap-2">
            {boards.length !== 0 && <DeleteBoard />}
            <AddBoard />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function KanbanHeader() {
  const { kanban, setSelectedBoard } = useKanbanStore((state) => state);
  const boards = Object.keys(kanban.boards);
  return (
    <div className="mb-2 hidden items-center justify-between gap-2 rounded-md bg-secondary p-2 sm:flex">
      <div className="flex items-center gap-2">
        <h1>Board:</h1>
        <Select onValueChange={(value) => setSelectedBoard(value)} value={kanban.selectedBoard}>
          <SelectTrigger>
            <SelectValue placeholder="No Boards" />
          </SelectTrigger>
          <SelectContent>
            {boards.length === 0 ? (
              <SelectItem value="No Boards">
                <p className="max-w-fit pr-4">No Boards</p>
              </SelectItem>
            ) : (
              boards.map((b, i) => {
                return (
                  <SelectItem key={i} value={b}>
                    <p className="max-w-fit pr-4">{b}</p>
                  </SelectItem>
                );
              })
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <div className="flex justify-stretch gap-2">
          {boards.length !== 0 && <DeleteBoard />}
          <AddBoard />
        </div>
      </div>
    </div>
  );
}
