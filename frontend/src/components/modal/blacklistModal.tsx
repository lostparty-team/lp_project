'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import '../../styles/pages/blacklist.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { handleBackdropClick } from '@/utils/modalUtils';
import { useBlacklistStore } from '@/stores/blacklistStore';

interface BlacklistUser {
  id: number;
  name: string;
  reason: string;
}

const BlacklistModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedBlacklistData, setIsModalOpen, setSelectedBlacklistData } = useBlacklistStore();
  const [blacklist] = useState<BlacklistUser[]>([]);

  useEffect(() => {
    return () => {
      setSelectedBlacklistData(null);
      setIsModalOpen(false);
    };
  }, [selectedBlacklistData, setSelectedBlacklistData, setIsModalOpen]);

  useEffect(() => {
    if (pathname === '/blacklist') {
      setIsModalOpen(false);
      setSelectedBlacklistData(null);
    }
  }, [pathname, setIsModalOpen, setSelectedBlacklistData]);

  const handleClose = () => {
    router.push('/blacklist');
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {pathname !== '/blacklist' && (
        <motion.div
          onClick={(e) => handleBackdropClick(e, handleClose)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black1/80 backdrop-blur-sm'
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className='w-full max-w-3xl rounded-xl border border-white/20 bg-gradient-to-br from-black2 to-black1 shadow-2xl'
          >
            {/* 모달 타이틀 */}
            <div className='flex items-center justify-between rounded-t-xl border-b border-white/20 bg-black1/90 p-6'>
              <h2 className='text-3xl font-bold text-lostark-400'>블랙리스트 상세보기</h2>
              <button
                onClick={handleClose}
                className='rounded-full p-2 text-white/70 transition duration-200 hover:bg-white/10 hover:text-white'
              >
                <X size={28} />
              </button>
            </div>

            <div className='space-y-6 p-6'>
              {/* 블랙리스트 제목 및 정보 */}
              <div className='space-y-4'>
                <h2 className='text-3xl font-bold text-white'>{selectedBlacklistData?.title}</h2>
                <div className='flex items-center justify-between'>
                  <span className='text-lg text-white/80'>작성자: {selectedBlacklistData?.title}</span>
                  <div className='text-sm text-white/60'>
                    작성일 {selectedBlacklistData?.title} | 담은수 {selectedBlacklistData?.id} | 비추천{' '}
                    {selectedBlacklistData?.id}
                  </div>
                </div>
              </div>

              {/* 테이블 */}
              <div className='flex flex-col overflow-hidden rounded-xl border border-white/20 bg-black2/50'>
                <div className='flex w-full border-b border-white/20 bg-black1/50 py-4'>
                  <div className='w-2/5 px-6 font-medium text-lostark-400'>이름</div>
                  <div className='w-3/5 px-6 font-medium text-lostark-400'>사유</div>
                </div>

                <div className='scrollbar-thin scrollbar-track-black2 scrollbar-thumb-white/20 flex h-96 flex-col overflow-y-auto'>
                  {blacklist.map((user) => (
                    <div
                      key={user.id}
                      className='flex w-full items-center border-b border-white/10 transition hover:bg-white/5'
                    >
                      <div className='w-2/5 px-6 py-4 text-white/80'>{user.name}</div>
                      <div className='w-3/5 px-6 py-4 text-white/80'>{user.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlacklistModal;
