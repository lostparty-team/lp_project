import { useQuery, useMutation } from '@tanstack/react-query';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { SortType } from '@/types/blacklist';
import queryClient from '@/api/queryClient';
import { getBlacklist, deleteBlacklist, postDislike } from '@/api/blacklist';
import { toast } from 'react-toastify';

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

  const { mutate: postDislikeMutation } = useMutation({
    mutationFn: postDislike,
    onSuccess: () => {
      toast.success('비추천이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    },
    onError: (error: any) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 400:
          toast.error('잘못된 요청입니다.');
          break;
        case 409:
          toast.error('이미 비추천한 게시글입니다.');
          break;
        default:
          toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  return {
    blacklist,
    myBlacklist,
    isLoading,
    handleAddToMyBlacklist: addToMyBlacklist,
    handleRemoveFromMyBlacklist: removeFromMyBlacklist,
    deleteBlacklist: deleteBlacklistMutation,
    postDislikeMutation,
  };
};
