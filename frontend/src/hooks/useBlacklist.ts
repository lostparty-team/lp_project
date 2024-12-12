import { useState } from 'react';
import { toast } from 'react-toastify';
import { BlacklistUser, SortType } from '@/types/blacklist';
import { MOCK_BLACKLIST } from '@/constants/mockData';

export const useBlacklist = () => {
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>(MOCK_BLACKLIST);
  const [myBlacklist, setMyBlacklist] = useState<BlacklistUser[]>([]);

  const handleAddToMyBlacklist = (user: BlacklistUser) => {
    if (myBlacklist.some((item) => item.id === user.id)) {
      toast.error('이미 담은 블랙리스트입니다.');
      return;
    }
    setMyBlacklist((prev) => [...prev, user]);
  };

  const handleRemoveFromMyBlacklist = (userId: number) => {
    setMyBlacklist((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleSortBlacklist = (sortType: SortType) => {
    switch (sortType) {
      case 'newest':
        setBlacklist([...blacklist].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        break;
      case 'popular':
        setBlacklist([...blacklist].sort((a, b) => b.bad - a.bad));
        break;
      default:
        toast.error('올바르지 않은 정렬 방식입니다.');
    }
  };

  return {
    blacklist,
    myBlacklist,
    handleAddToMyBlacklist,
    handleRemoveFromMyBlacklist,
    handleSortBlacklist,
  };
};
