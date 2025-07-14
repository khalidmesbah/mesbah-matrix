import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPublicURL, setPublicURL } from '@/lib/server-actions/calendar';

export const useCalendarQuery = () =>
  useQuery({
    queryKey: ['public-url'],
    queryFn: () => getPublicURL(),
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

export const useCalendarMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (publicUrl: string) => setPublicURL(publicUrl),
    mutationKey: ['update-public-url'],
    onMutate: async (publicUrl) => {
      await queryClient.cancelQueries({ queryKey: ['public-url'] });

      const previousPublicUrl = queryClient.getQueryData(['public-url']);

      queryClient.setQueryData(['public-url'], publicUrl);

      return { previousPublicUrl };
    },
    onError: (_err, _old, context) => {
      queryClient.setQueryData(['public-url'], context?.previousPublicUrl);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['public-url'] });
    },
  });
};
