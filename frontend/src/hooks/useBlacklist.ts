import { useQuery, useMutation } from '@tanstack/react-query';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { blacklistApi } from '@/api/blacklist';
import { SortType } from '@/types/blacklist';
import queryClient from '@/api/queryClient';

export const useBlacklist = (sortType?: SortType) => {
  const { myBlacklist, addToMyBlacklist, removeFromMyBlacklist } = useBlacklistStore();

  const { data: blacklist = [], isLoading } = useQuery({
    queryKey: ['blacklist', sortType],
    queryFn: () => blacklistApi.getBlacklist(sortType),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { mutate: deleteBlacklist } = useMutation({
    mutationFn: blacklistApi.deleteBlacklist,
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
    deleteBlacklist,
  };
};
