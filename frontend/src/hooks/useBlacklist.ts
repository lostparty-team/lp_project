import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BlacklistUser, SortType } from '@/types/blacklist';
import { useLoadingStore } from '@/stores/loadingStore';
import { axiosInstance } from '@/api/axios';

export const useBlacklist = () => {
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);
  const [myBlacklist, setMyBlacklist] = useState<BlacklistUser[]>([]);
  const { setIsLoading, isLoading } = useLoadingStore();

  // 블랙리스트 목록 호출
  const fetchBlacklist = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/api/blacklist`);
      console.log(data);
      setBlacklist(data);
    } catch (error) {
      toast.error('블랙리스트를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddToMyBlacklist = (user: BlacklistUser) => {
    // 이미 담은 블랙리스트인지 확인
    if (myBlacklist.some((item) => item.id === user.id)) {
      toast.error('이미 담은 블랙리스트입니다.');
      return;
    }
    setMyBlacklist((prev) => [...prev, user]);
  };

  const handleRemoveFromMyBlacklist = (userId: number) => {
    // 제거할 유저 찾기
    const removedUser = myBlacklist.find((user) => user.id === userId);
    // 내 블랙리스트에서 제거
    setMyBlacklist((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleSortBlacklist = async (sortType: SortType) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/blacklist`, {
        params: { sort: sortType },
      });
      setBlacklist(response.data);
    } catch (error) {
      toast.error('정렬에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlacklist();
  }, []);

  return {
    blacklist,
    myBlacklist,
    isLoading,
    handleAddToMyBlacklist,
    handleRemoveFromMyBlacklist,
    handleSortBlacklist,
  };
};
