import { useCallback, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import queryClient from '@/api/queryClient';
import {
  getBlacklist,
  getBlacklistDetail,
  postDislike,
  getCart,
  addToCart,
  removeFromCart,
  getMe,
} from '@/api/blacklist';
import { BlacklistUser, SortType } from '@/types/blacklist';

export const useBlacklist = (sortType?: SortType, page: number = 1, id?: string, searchTerm?: string) => {
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);
  const [myBlacklist, setMyBlacklist] = useState<BlacklistUser[]>([]);
  const [myPosts, setMyPosts] = useState<BlacklistUser[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 블랙리스트 목록 조회
  const { data: blacklistData, isLoading } = useQuery({
    queryKey: ['blacklist', sortType, page, searchTerm],
    queryFn: () => getBlacklist(sortType, page, searchTerm),
  });

  // 내가 담은 블랙리스트 조회
  const { data: cartData } = useQuery({
    queryKey: ['blacklist-cart'],
    queryFn: getCart,
  });

  // 내가 작성한 블랙리스트 조회
  const { data: myPostsData } = useQuery({
    queryKey: ['blacklist-myPosts'],
    queryFn: getMe,
  });

  // 블랙리스트 상세 조회
  const { data: blacklistDetailData } = useQuery({
    queryKey: ['blacklist-detail', id],
    queryFn: () => (id ? getBlacklistDetail(id) : null),
    enabled: !!id,
  });

  // 블랙리스트 싫어요
  const { mutateAsync: dislikeMutation } = useMutation({
    mutationFn: postDislike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
      queryClient.invalidateQueries({ queryKey: ['blacklist-detail'] });
    },
  });

  // 블랙리스트 담기
  const { mutateAsync: addToCartMutation } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklist-cart'] });
      toast.success('블랙리스트에 추가되었습니다.');
    },
    onError: () => {
      toast.error('이미 추가된 블랙리스트입니다.');
    },
  });

  // 블랙리스트 담기 해제
  const { mutateAsync: removeFromCartMutation } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blacklist-cart'] });
      toast.success('블랙리스트가 제거되었습니다.');
    },
  });

  // 블랙리스트 데이터 설정
  useEffect(() => {
    if (blacklistData) {
      setBlacklist(blacklistData.data);
      setTotalPages(blacklistData.totalPages);
    }
  }, [blacklistData]);

  // 내가 담은 블랙리스트 설정
  useEffect(() => {
    if (cartData) {
      setMyBlacklist(cartData.data);
    }
  }, [cartData]);

  // 내가 작성한 블랙리스트 설정
  useEffect(() => {
    if (myPostsData) {
      setMyPosts(myPostsData.data);
    }
  }, [myPostsData]);

  // 블랙리스트 싫어요
  const postDislikeMutation = useCallback(
    async (id: string) => {
      try {
        await dislikeMutation(id);
        toast.success('싫어요를 표시했습니다.');
      } catch (error) {
        toast.error('이미 싫어요를 표시했습니다.');
      }
    },
    [dislikeMutation],
  );

  // 본인 게시물 확인
  const isMyPost = useCallback(
    (postId: number) => {
      return myPosts.some((post) => post.id === postId);
    },
    [myPosts],
  );

  return {
    blacklist,
    myBlacklist,
    myPosts,
    isLoading,
    blacklistDetail: blacklistDetailData,
    addToCartMutation,
    removeFromCartMutation,
    postDislikeMutation,
    totalPages,
    isMyPost,
  };
};
