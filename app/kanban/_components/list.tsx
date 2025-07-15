'use client';

import { Draggable, Droppable } from '@hello-pangea/dnd';
import AddCard from '@/app/kanban/_components/add-card';
import Card from '@/app/kanban/_components/card';
import DeleteList from '@/app/kanban/_components/delete-list';
import type { CardT, ListT } from '@/types/kanban';
import EditList from './edit-list';

type ListProps = {
  list: ListT;
  cards: CardT[];
  index: number;
};

export default function List({ list: { headerColor, id, title }, cards, index }: ListProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`max-w-[425px] min-w-[250px] flex-1 px-[2px]`}
        >
          <div
            className='bg-background flex h-fit max-h-full flex-col rounded-md border-2 p-2'
            style={{ borderColor: headerColor }}
          >
            <div
              className={`group relative mb-3 flex items-center justify-between rounded-md p-2`}
              style={{ backgroundColor: headerColor }}
              {...provided.dragHandleProps}
            >
              <h2
                className={`font-lg max-h-[100px] overflow-y-auto font-extrabold break-words whitespace-normal`}
              >
                ({cards.length}) {title}
              </h2>
              <DeleteList listId={id} />
              <EditList title={title} headerColor={headerColor} id={id} />
            </div>

            <Droppable droppableId={id} type='card'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='overflow-auto'>
                  {cards.length === 0 ? (
                    <p className='bg-card rounded-md p-2 text-center'>No Cards yet.</p>
                  ) : (
                    cards.map((card, index) => {
                      return (
                        <Card
                          key={card.id}
                          card={card}
                          index={index}
                          listId={id}
                          headerColor={headerColor}
                        />
                      );
                    })
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <AddCard listId={id} headerColor={headerColor} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
