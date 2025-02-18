import { useModalStore } from '@/stores/modalStore';

interface UseModalDragProps {
  onClose: () => void;
}

export const useModalDrag = ({ onClose }: UseModalDragProps) => {
  const { dragStartPosition, setDragStartPosition } = useModalStore();

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartPosition) {
      const deltaX = Math.abs(e.clientX - dragStartPosition.x);
      const deltaY = Math.abs(e.clientY - dragStartPosition.y);

      const isDragging = deltaX > 5 || deltaY > 5;

      if (!isDragging && e.target === e.currentTarget) {
        onClose();
      }
    }
    setDragStartPosition(null);
  };

  return { handleMouseDown, handleMouseUp };
};
