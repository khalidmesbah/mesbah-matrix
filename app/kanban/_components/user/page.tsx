'use client';

import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { useEffect } from 'react';
import { KanbanHeader, KanbanHeaderWithSheet } from '@/app/kanban/_components/kanban-header';
import List from '@/app/kanban/_components/list';
import NoBoards from '@/app/kanban/_components/no-boards';
import ParticlesLoader from '@/components/particles-loader';
import { useKanbanQuery } from '@/lib/hooks/use-kanban';
import useKanbanStore from '@/stores/kanban';
import AddList from '../add-list';

export default function UserKanbanPage() {
  const { kanban, setBoard, setKanban } = useKanbanStore((state) => state);
  const { data, isLoading } = useKanbanQuery();

  useEffect(() => {
    if (!isLoading && data) {
      setKanban(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onDragEnd = async (result: DropResult) => {
    const board = kanban.boards[kanban.selectedBoard];
    const { draggableId, destination, source, type } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'list') {
      const newListOrder = Array.from(board.listsOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const newList = {
        ...board.lists[draggableId],
        id: draggableId,
      };
      const newLists = {
        ...board.lists,
        [draggableId]: newList,
      };

      const newKanban = {
        ...board,
        lists: newLists,
        listsOrder: newListOrder,
      };
      setBoard(newKanban);
      return;
    }

    const start = board.lists[source.droppableId];
    const finish = board.lists[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);

      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...start,
        cardIds: newCardIds,
      };
      const newKanban = {
        ...board,
      };
      board.lists[newList.id] = newList;

      setBoard(newKanban);

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
      ...board,
    };

    newState.lists = {
      ...board.lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    setBoard(newState);
  };
  // TODO: merge the kanban header with the sheet header
  return (
    <div className='flex h-[calc(100dvh-16px)] flex-col overflow-hidden'>
      <KanbanHeaderWithSheet />
      <KanbanHeader />
      {isLoading ? (
        <ParticlesLoader />
      ) : Object.keys(kanban.boards).length === 0 ? (
        <NoBoards />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={kanban.selectedBoard} direction='horizontal' type='list'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='flex flex-1 overflow-auto'
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
