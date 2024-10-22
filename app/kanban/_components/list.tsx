'use client';

import AddCard from '@/app/kanban/_components/add-card';
import Card from '@/app/kanban/_components/card';
import DeleteList from '@/app/kanban/_components/delete-list';
import { CardT, ListT } from '@/types/kanban';
import { Draggable, Droppable } from '@hello-pangea/dnd';
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
          className={`min-w-[250px] max-w-[425px] flex-1 px-[2px]`}
        >
          <div
            className="flex h-fit max-h-full flex-col rounded-md border-2 bg-background p-2"
            style={{ borderColor: headerColor }}
          >
            <div
              className={`group relative mb-3 flex items-center justify-between rounded-md p-2`}
              style={{ backgroundColor: headerColor }}
              {...provided.dragHandleProps}
            >
              <h2
                className={`font-lg max-h-[100px] overflow-y-auto whitespace-normal break-words font-extrabold`}
              >
                ({cards.length}) {title}
              </h2>
              <DeleteList listId={id} />
              <EditList title={title} headerColor={headerColor} id={id} />
            </div>

            <Droppable droppableId={id} type="card">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="overflow-auto">
                  {cards.length === 0 ? (
                    <p className="rounded-md bg-card p-2 text-center">No Cards yet.</p>
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
