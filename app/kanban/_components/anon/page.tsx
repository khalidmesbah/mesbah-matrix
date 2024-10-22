'use client';

import useKanbanStore from '@/stores/kanban';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import AddList from '../add-list';
import { KanbanHeader, KanbanHeaderWithSheet } from '../kanban-header';
import List from '../list';
import NoBoards from '../no-boards';

export default function AnonKanbanPage() {
  const { kanban, setKanban } = useKanbanStore((state) => state);
  const boards = Object.keys(kanban.boards);

  const onDragEnd = async (result: DropResult) => {
    const { draggableId, destination, source, type } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'list') {
      const newListOrder = Array.from(kanban.boards[kanban.selectedBoard].listsOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const newList = {
        ...kanban.boards[kanban.selectedBoard].lists[draggableId],
        id: draggableId,
      };
      const newLists = {
        ...kanban.boards[kanban.selectedBoard].lists,
        [draggableId]: newList,
      };

      const newKanban = {
        ...kanban,
        boards: {
          ...kanban.boards,
          [kanban.selectedBoard]: {
            ...kanban.boards[kanban.selectedBoard],
            lists: newLists,
            listsOrder: newListOrder,
          },
        },
      };
      setKanban(newKanban);
      return;
    }

    const start = kanban.boards[kanban.selectedBoard].lists[source.droppableId];
    const finish = kanban.boards[kanban.selectedBoard].lists[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);

      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...start,
        cardIds: newCardIds,
      };
      const newKanban = {
        ...kanban,
      };
      newKanban.boards[kanban.selectedBoard].lists[newList.id] = newList;

      setKanban(newKanban);

      return;
    }

    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds,
    };
    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };
    const newState = {
      ...kanban,
    };

    newState.boards[kanban.selectedBoard].lists = {
      ...kanban.boards[kanban.selectedBoard].lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    setKanban(newState);
  };

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden">
      <KanbanHeaderWithSheet />
      <KanbanHeader />
      {boards.length === 0 ? (
        <NoBoards />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={kanban.selectedBoard} direction="horizontal" type="list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-1 overflow-auto"
              >
                {kanban.boards[kanban.selectedBoard].listsOrder.map((listId, index) => {
                  const list = kanban.boards[kanban.selectedBoard].lists[listId];
                  const cards = list.cardIds.map(
                    (cardId) => kanban.boards[kanban.selectedBoard].cards[cardId],
                  );
                  return <List key={listId} list={list} cards={cards} index={index} />;
                })}

                {provided.placeholder}

                <AddList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
