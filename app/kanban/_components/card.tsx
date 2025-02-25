'use client';

import { CardT } from '@/types/kanban';
import { Draggable } from '@hello-pangea/dnd';
import DeleteCard from './delete-card';
import EditCard from './edit-card';

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
          <div className="group bg-card relative flex h-fit max-h-[400px] w-full resize-none items-center justify-between gap-2 overflow-auto rounded-md border p-2">
            <p>{card.content}</p>
            <EditCard card={card} />
            <DeleteCard cardId={card.id} listId={listId} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
