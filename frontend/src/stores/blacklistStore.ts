import { create } from 'zustand';
import { toast } from 'react-toastify';
import { BlacklistUser } from '@/types/blacklist';

interface BlacklistStore {
  myBlacklist: BlacklistUser[];
  addToMyBlacklist: (user: BlacklistUser) => void;
  removeFromMyBlacklist: (userId: number) => void;
}

export const useBlacklistStore = create<BlacklistStore>((set, get) => ({
  myBlacklist: [],

  addToMyBlacklist: (user) => {
    const { myBlacklist } = get();
    if (myBlacklist.some((item) => item.id === user.id)) {
      toast.error('이미 담은 블랙리스트입니다.');
      return;
    }
    set({ myBlacklist: [...myBlacklist, user] });
  },

  removeFromMyBlacklist: (userId) => {
    const { myBlacklist } = get();
    set({ myBlacklist: myBlacklist.filter((user) => user.id !== userId) });
  },
}));
