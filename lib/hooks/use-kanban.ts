import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addBoardAction,
  deleteSelectedBoardAction,
  getKanbanAction,
  setBoardAction,
  setSelectedBoardAction,
} from '@/actions/kanban';
import type { BoardT, KanbanT } from '../types/kanban';

export const useKanbanQuery = () =>
  useQuery({
    queryKey: ['kanban'],
    queryFn: () => getKanbanAction(),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

export const useAddBoardMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (board: string) => addBoardAction(board),
    onMutate: async (board) => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanT) => {
        const newKanban = structuredClone(old);
        newKanban.boards[board] = {
          cards: {},
          lists: {},
          listsOrder: [],
        };
        newKanban.selectedBoard = board;
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
    mutationFn: async (board: string) => setSelectedBoardAction(board),
    onMutate: async (board) => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanT) => {
        const newKanban = structuredClone(old);
        newKanban.selectedBoard = board;
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
    mutationFn: async () => deleteSelectedBoardAction(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanT) => {
        const newKanban = structuredClone(old);
        delete newKanban.boards[newKanban.selectedBoard];
        const boards = Object.keys(newKanban.boards);
        newKanban.selectedBoard = boards.length !== 0 ? boards[0] : '';
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

export const useSetKanbanMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (board: BoardT) => setBoardAction(board),
    onMutate: async (board) => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanT) => {
        const newKanban = structuredClone(old);
        newKanban.boards[newKanban.selectedBoard] = board;
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
