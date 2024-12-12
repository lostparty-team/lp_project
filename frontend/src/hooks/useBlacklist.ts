import { useQuery } from '@tanstack/react-query';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { blacklistApi } from '@/api/blacklist';
import { SortType } from '@/types/blacklist';

export const useBlacklist = (sortType?: SortType) => {
  const { myBlacklist, addToMyBlacklist, removeFromMyBlacklist } = useBlacklistStore();

  const { data: blacklist = [], isLoading } = useQuery({
    queryKey: ['blacklist', sortType],
    queryFn: () => blacklistApi.getBlacklist(sortType),
  });

  return {
    blacklist,
    myBlacklist,
    isLoading,
    handleAddToMyBlacklist: addToMyBlacklist,
    handleRemoveFromMyBlacklist: removeFromMyBlacklist,
  };
};
