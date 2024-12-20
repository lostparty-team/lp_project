import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginStore {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<LoginStore>()(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (value: boolean) => set({ isLogin: value }),
      logout: () => {
        localStorage.clear();
        set({ isLogin: false });
      },
    }),
    {
      name: 'authStorage',
    },
  ),
);
