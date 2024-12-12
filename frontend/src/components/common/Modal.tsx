import { motion } from 'framer-motion';
import { modalBackdrop, modalContent } from '@/constants/animations';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      variants={modalBackdrop}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black1/80 backdrop-blur-sm'
      onClick={onClose}
    >
      <motion.div
        variants={modalContent}
        className='w-full max-w-3xl rounded-xl border border-white/20 bg-gradient-to-br from-black2 to-black1 shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
