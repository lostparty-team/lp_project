import { create } from 'zustand';
import { toast } from 'react-toastify';
import { BlacklistUser, SortType } from '@/types/blacklist';

interface BlacklistStore {
  myBlacklist: BlacklistUser[];
  searchTerm: string;
  flyingItem: { id: string; x: number; y: number; type: 'add' | 'remove' } | null;
  showCreateModal: boolean;
  selectedBlacklistData: Record<string, any> | null;
  sortType: SortType | undefined;
  cartRef: React.RefObject<HTMLDivElement> | null;

  addToMyBlacklist: (user: BlacklistUser) => void;
  removeFromMyBlacklist: (userId: number) => void;
  setSearchTerm: (term: string) => void;
  setFlyingItem: (item: { id: string; x: number; y: number; type: 'add' | 'remove' } | null) => void;
  setShowCreateModal: (show: boolean) => void;
  setSelectedBlacklistData: (data: Record<string, any> | null) => void;
  setSortType: (type: SortType | undefined) => void;
  setCartRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

export const useBlacklistStore = create<BlacklistStore>((set, get) => ({
  myBlacklist: [],
  searchTerm: '',
  flyingItem: null,
  showCreateModal: false,
  selectedBlacklistData: null,
  sortType: undefined,
  cartRef: null,
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
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFlyingItem: (item) => set({ flyingItem: item }),
  setShowCreateModal: (show) => set({ showCreateModal: show }),
  setSelectedBlacklistData: (data) => set({ selectedBlacklistData: data }),
  setSortType: (type) => set({ sortType: type }),
  setCartRef: (ref) => set({ cartRef: ref }),
}));
