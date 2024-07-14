import {
  addBoard,
  deleteSelectedBoard,
  getKanban,
  setCards,
  setSelectedBoard,
} from '@/lib/server-actions/kanban-actions';
import { CardType, KanbanType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useKanbanQuery = () =>
  useQuery({
    queryKey: ['kanban'],
    queryFn: () => getKanban(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

export const useAddBoardMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (board: string) => addBoard(board),
    onMutate: async (board) => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanType) => {
        const newKanban = structuredClone(old);
        console.log(`before mutation`, Object.keys(newKanban.boards));
        newKanban.boards[board] = [];
        newKanban.selectedBoard = board;
        console.log(`after mutation`, Object.keys(newKanban.boards));
        return newKanban;
      });

      return { previousKanban };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['kanban'], context?.previousKanban);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['kanban'] });
    },
  });
};

export const useSetSelectedBoardMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (board: string) => setSelectedBoard(board),
    onMutate: async (board) => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanType) => {
        const newKanban = structuredClone(old);
        console.log(`before mutation`, newKanban.selectedBoard);
        newKanban.selectedBoard = board;
        console.log(`after mutation`, newKanban.selectedBoard);
        return newKanban;
      });

      return { previousKanban };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['kanban'], context?.previousKanban);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['kanban'] });
    },
  });
};

export const useDeleteSelectedBoardMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => deleteSelectedBoard(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanType) => {
        const newKanban = structuredClone(old);
        console.log(`before useDeleteSelectedBoardMutate mutation`, Object.keys(newKanban.boards));
        delete newKanban.boards[newKanban.selectedBoard];
        const boards = Object.keys(newKanban.boards);
        newKanban.selectedBoard = boards.length !== 0 ? boards[0] : '';
        console.log(`after useDeleteSelectedBoardMutate mutation`, Object.keys(newKanban.boards));
        return newKanban;
      });

      return { previousKanban };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['kanban'], context?.previousKanban);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['kanban'] });
    },
  });
};

export const useSetCardsMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cards: CardType[]) => setCards(cards),
    onMutate: async (cards) => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanType) => {
        const newKanban = structuredClone(old);
        console.log(`before mutation`, newKanban.boards[newKanban.selectedBoard]);
        newKanban.boards[newKanban.selectedBoard] = cards;
        console.log(`after mutation`, newKanban.boards[newKanban.selectedBoard]);
        return newKanban;
      });

      return { previousKanban };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['kanban'], context?.previousKanban);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['kanban'] });
    },
  });
};
