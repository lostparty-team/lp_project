import { create } from 'zustand';
import { RegisterInfo } from '@/types/domain';

interface RegisterStore {
  idChecked: boolean;
  idCheckStatus: 'initial' | 'valid' | 'duplicate' | 'checked';
  formData: Partial<RegisterInfo>;
  isChecking: boolean;
  formValues: {
    id: string;
    password: string;
  };
  isSubmitting: boolean;
  setIsChecking: (value: boolean) => void;
  setFormValues: (values: Partial<{ id: string; password: string }>) => void;
  setIsSubmitting: (value: boolean) => void;
  setIdChecked: (value: boolean) => void;
  setIdCheckStatus: (status: 'initial' | 'valid' | 'duplicate' | 'checked') => void;
  setFormData: (data: Partial<RegisterInfo>) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  idChecked: false,
  idCheckStatus: 'initial',
  formData: {},
  isChecking: false,
  formValues: {
    id: '',
    password: '',
  },
  isSubmitting: false,
  setIdChecked: (value) => set({ idChecked: value }),
  setIdCheckStatus: (status) => set({ idCheckStatus: status }),
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setIsChecking: (value) => set({ isChecking: value }),
  setFormValues: (values) =>
    set((state) => ({
      formValues: { ...state.formValues, ...values },
    })),
  setIsSubmitting: (value) => set({ isSubmitting: value }),
  reset: () =>
    set({
      idChecked: false,
      idCheckStatus: 'initial',
      formData: {},
      isChecking: false,
      formValues: { id: '', password: '' },
      isSubmitting: false,
    }),
}));
