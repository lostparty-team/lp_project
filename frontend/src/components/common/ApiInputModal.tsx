import { useState, useEffect } from 'react';
import { CustomInput } from './ui/CustomInput';
import { CustomButton } from './ui/CustomButton';
import { toast } from 'react-toastify';
import { setHeader } from '@/utils/header';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiInputModal = ({ isOpen, onClose }: ApiInputModalProps) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error('API 키를 입력해주세요.');
      return;
    }
    setHeader('Authorization', `Bearer ${apiKey}`);
    localStorage.setItem('lostark-api', apiKey);
    toast.success('API 키가 저장되었습니다.');
    onClose();
  };

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
            <h2 className='mb-6 text-center text-2xl font-bold tracking-tight text-lostark-300'>로스트아크 API 입력</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-1'>
                <CustomInput
                  label='API'
                  placeholder='API 키를 입력하세요.'
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className='text-xs text-gray-400'>* API 키는 로스트아크 공식 홈페이지에서 발급 받을 수 있습니다.</p>
              </div>
              <div className='flex justify-end space-x-3'>
                <CustomButton onClick={onClose} size='sm'>
                  취소
                </CustomButton>
                <CustomButton type='submit' size='sm'>
                  저장
                </CustomButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApiInputModal;
