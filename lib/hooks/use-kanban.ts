import {
  addBoard,
  deleteSelectedBoard,
  getKanban,
  setCards,
  setSelectedBoard,
} from '@/actions/kanban';
import { CardT, KanbanT } from '@/types/kanban';
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

      queryClient.setQueryData(['kanban'], (old: KanbanT) => {
        const newKanban = structuredClone(old);
        newKanban.boards[board] = [];
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
    mutationFn: async (board: string) => setSelectedBoard(board),
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
    mutationFn: async () => deleteSelectedBoard(),
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

export const useSetCardsMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cards: CardT[]) => setCards(cards),
    onMutate: async (cards) => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });

      const previousKanban = queryClient.getQueryData(['kanban']);

      queryClient.setQueryData(['kanban'], (old: KanbanT) => {
        const newKanban = structuredClone(old);
        newKanban.boards[newKanban.selectedBoard] = cards;
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
