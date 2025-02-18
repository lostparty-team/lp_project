import { create } from 'zustand';

interface Position {
  x: number;
  y: number;
}

interface ModalStore {
  dragStartPosition: Position | null;
  setDragStartPosition: (position: Position | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  dragStartPosition: null,
  setDragStartPosition: (position) => set({ dragStartPosition: position }),
}));
