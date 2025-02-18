import { useQuery, useMutation } from '@tanstack/react-query';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { SortType } from '@/types/blacklist';
import queryClient from '@/api/queryClient';
import {
  getBlacklist,
  deleteBlacklist,
  postDislike,
  getCart,
  addToCart,
  removeFromCart,
  getBlacklistDetail,
} from '@/api/blacklist';
import { toast } from 'react-toastify';

export const useBlacklist = (sortType?: SortType, page: number = 1, blacklistId?: string) => {
  const { addToMyBlacklist, removeFromMyBlacklist } = useBlacklistStore();

  const { data, isLoading } = useQuery({
    queryKey: ['blacklist', sortType, page],
    queryFn: () => getBlacklist(sortType, page),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { data: myBlacklist = [], isLoading: isMyBlacklistLoading } = useQuery({
    queryKey: ['myBlacklist'],
    queryFn: () => getCart(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { data: blacklistDetail } = useQuery({
    queryKey: ['blacklistModal', blacklistId],
    queryFn: () => (blacklistId ? getBlacklistDetail(blacklistId) : null),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!blacklistId,
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
      queryClient.invalidateQueries({ queryKey: ['blacklistModal'] });
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

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success('장바구니 추가가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myBlacklist'] });
    },
    onError: (error: any) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 400:
          toast.error('잘못된 요청입니다.');
          break;
        case 409:
          toast.error('이미 장바구니에 존재하는 아이템입니다.');
          break;
        default:
          toast.error('장바구니 추가에 실패했습니다.');
      }
    },
  });

  const { mutate: removeFromCartMutation } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      toast.success('장바구니에서 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myBlacklist'] });
    },
    onError: (error: any) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 400:
          toast.error('잘못된 요청입니다.');
          break;
        case 404:
          toast.error('존재하지 않는 블랙리스트입니다.');
          break;
        default:
          toast.error('장바구니에서 삭제하는데 실패했습니다.');
      }
    },
  });

  return {
    blacklist: data?.data || [],
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || 1,
    totalPosts: data?.totalPosts || 0,
    myBlacklist: Array.isArray(myBlacklist.data) ? myBlacklist.data : [],
    isLoading,
    isMyBlacklistLoading,
    handleAddToMyBlacklist: addToMyBlacklist,
    handleRemoveFromMyBlacklist: removeFromMyBlacklist,
    deleteBlacklist: deleteBlacklistMutation,
    postDislikeMutation,
    addToCartMutation,
    removeFromCartMutation,
    blacklistDetail,
  };
};
