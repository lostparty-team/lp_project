import { useState, useEffect } from 'react';
import axios from 'axios';
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
    // 원본 블랙리스트에서 추가된 아이템 제거
    setBlacklist((prev) => prev.filter((item) => item.id !== user.id));
  };
  // const handleAddToMyBlacklist = async (user: BlacklistUser) => {
  //   if (myBlacklist.some((item) => item.id === user.id)) {
  //     toast.error('이미 담은 블랙리스트입니다.');
  //     return;
  //   }
  //   try {
  //     setIsLoading(true);
  //     await axiosInstance.post(`/my-blacklist`, user);
  //     setMyBlacklist((prev) => [...prev, user]);
  //     toast.success('내 블랙리스트에 추가되었습니다.');
  //   } catch (error) {
  //     toast.error('블랙리스트 추가에 실패했습니다.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleRemoveFromMyBlacklist = async (userId: number) => {
  //   try {
  //     setIsLoading(true);
  //     await axiosInstance.delete(`/my-blacklist/${userId}`);
  //     setMyBlacklist((prev) => prev.filter((user) => user.id !== userId));
  //     toast.success('블랙리스트에서 제거되었습니다.');
  //   } catch (error) {
  //     toast.error('블랙리스트 제거에 실패했습니다.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleRemoveFromMyBlacklist = (userId: number) => {
    // 제거할 유저 찾기
    const removedUser = myBlacklist.find((user) => user.id === userId);
    // 내 블랙리스트에서 제거
    setMyBlacklist((prev) => prev.filter((user) => user.id !== userId));
    // 원본 블랙리스트로 다시 추가
    if (removedUser) {
      setBlacklist((prev) => [...prev, removedUser]);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'newest') {
      setBlacklist([...blacklist].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    if (event.target.value === 'popular') {
      setBlacklist([...blacklist].sort((a, b) => b.bad - a.bad));
    }
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
