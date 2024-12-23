import { create } from 'zustand';

interface RegisterStore {
  idChecked: boolean;
  setIdChecked: (value: boolean) => void;
  idCheckStatus: 'initial' | 'valid' | 'duplicate' | 'checked';
  setIdCheckStatus: (status: 'initial' | 'valid' | 'duplicate' | 'checked') => void;
  isChecking: boolean;
  setIsChecking: (value: boolean) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  idChecked: false,
  idCheckStatus: 'initial',
  isChecking: false,
  isSubmitting: false,
  setIdChecked: (value: boolean) => set({ idChecked: value }),
  setIdCheckStatus: (status: 'initial' | 'valid' | 'duplicate' | 'checked') => set({ idCheckStatus: status }),
  setIsChecking: (value: boolean) => set({ isChecking: value }),
  reset: () =>
    set({
      idChecked: false,
      idCheckStatus: 'initial',
      isChecking: false,
    }),
}));
