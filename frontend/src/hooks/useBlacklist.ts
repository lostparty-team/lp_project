import { useQuery, useMutation } from '@tanstack/react-query';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { SortType } from '@/types/blacklist';
import queryClient from '@/api/queryClient';
import { getBlacklist, deleteBlacklist } from '@/api/blacklist';

export const useBlacklist = (sortType?: SortType) => {
  const { myBlacklist, addToMyBlacklist, removeFromMyBlacklist } = useBlacklistStore();

  const { data: blacklist = [], isLoading } = useQuery({
    queryKey: ['blacklist', sortType],
    queryFn: () => getBlacklist(sortType),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { mutate: deleteBlacklistMutation } = useMutation({
    mutationFn: deleteBlacklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    },
  });

  return {
    blacklist,
    myBlacklist,
    isLoading,
    handleAddToMyBlacklist: addToMyBlacklist,
    handleRemoveFromMyBlacklist: removeFromMyBlacklist,
    deleteBlacklist: deleteBlacklistMutation,
  };
};
