import { useState } from 'react';
import { toast } from 'react-toastify';
import { BlacklistUser } from '@/types/blacklist';
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

  const handleSortBlacklist = (sortType: string) => {
    if (sortType === 'newest') {
      setBlacklist([...blacklist].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    if (sortType === 'popular') {
      setBlacklist([...blacklist].sort((a, b) => b.bad - a.bad));
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
