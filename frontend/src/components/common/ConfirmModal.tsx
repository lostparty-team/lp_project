import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { CustomButton } from './ui/CustomButton';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  danger = false,
}: ConfirmModalProps) => {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-black1/90'
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className='w-[420px] rounded-xl border border-white/10 bg-gradient-to-b from-black2/80 to-black1 p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]'
          >
            <h2 className='mb-6 text-center text-2xl font-bold tracking-tight text-lostark-400'>{title}</h2>
            <div className='mb-8'>
              <p className='text-center text-gray-200'>{message}</p>
            </div>
            <div className='flex justify-center space-x-4'>
              <CustomButton onClick={onClose} size='sm'>
                {cancelText}
              </CustomButton>
              <CustomButton
                onClick={onConfirm}
                size='sm'
                variant='secondary'
                className={danger ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                {confirmText}
              </CustomButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
