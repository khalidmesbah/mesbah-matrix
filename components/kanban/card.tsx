'use client';

import DeleteCard from '@/components/kanban/delete-card';
import EditCard from '@/components/kanban/edit-card';
import { CardT } from '@/types/kanban';
import { Draggable } from '@hello-pangea/dnd';

type CardProps = {
  card: CardT;
  index: number;
  listId: string;
  headerColor: string;
};

export default function Card({ card, index, listId }: CardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="py-1"
        >
          <div className="group relative flex h-fit max-h-[400px] w-full resize-none items-center justify-between gap-2 overflow-auto rounded-md border bg-card p-2">
            <p>{card.content}</p>
            <EditCard card={card} />
            <DeleteCard cardId={card.id} listId={listId} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
