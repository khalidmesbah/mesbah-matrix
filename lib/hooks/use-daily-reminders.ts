import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addDailyReminder,
  getDailyReminders,
  getIsNewDay,
  setDailyReminders,
  toggleDailyReminder,
} from '@/actions/daily-reminders';
import type { DailyRemindersT, DailyReminderT } from '@/types/daily';

export const useIsNewDayQuery = () =>
  useQuery({
    queryKey: ['is-new-day'],
    queryFn: () => getIsNewDay(),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

export const useDailyRemindersQuery = () =>
  useQuery({
    queryKey: ['daily-reminders'],
    queryFn: () => getDailyReminders(),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

export const useSetDailyRemindersMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDailyReminders: DailyRemindersT) => setDailyReminders(newDailyReminders),
    onMutate: async (newDailyReminders) => {
      await queryClient.cancelQueries({ queryKey: ['daily-reminders'] });

      const previousDailyReminders = queryClient.getQueryData(['daily-reminders']);

      queryClient.setQueryData(['daily-reminders'], (_old: DailyRemindersT) => {
        return newDailyReminders;
      });

      return { previousDailyReminders };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['daily-reminders'], context?.previousDailyReminders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-reminders'] });
    },
  });
};

export const useAddDailyReminderMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDailyReminder: DailyReminderT) => addDailyReminder(newDailyReminder),
    onMutate: async (newDailyReminder) => {
      await queryClient.cancelQueries({ queryKey: ['daily-reminders'] });

      const previousDailyReminders = queryClient.getQueryData(['daily-reminders']);

      queryClient.setQueryData(['daily-reminders'], (old: DailyRemindersT) => {
        const newDailyReminders = structuredClone(old);
        newDailyReminders.order.push(newDailyReminder.id);
        newDailyReminders.reminders[newDailyReminder.id] = newDailyReminder;
        return newDailyReminders;
      });

      return { previousDailyReminders };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['daily-reminders'], context?.previousDailyReminders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-reminders'] });
    },
  });
};

export const useToggleDailyReminderMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDailyReminder: DailyReminderT) => toggleDailyReminder(newDailyReminder),
    onMutate: async (newDailyReminder) => {
      await queryClient.cancelQueries({ queryKey: ['daily-reminders'] });

      const previousDailyReminders = queryClient.getQueryData(['daily-reminders']);

      queryClient.setQueryData(['daily-reminders'], (old: DailyRemindersT) => {
        const newDailyReminders = structuredClone(old);
        newDailyReminders.reminders[newDailyReminder.id].done = !newDailyReminder.done;
        return newDailyReminders;
      });

      return { previousDailyReminders };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['daily-reminders'], context?.previousDailyReminders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-reminders'] });
    },
  });
};
