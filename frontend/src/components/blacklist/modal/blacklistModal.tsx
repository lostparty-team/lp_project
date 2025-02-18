'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp } from 'lucide-react';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { useBlacklist } from '@/hooks/useBlacklist';
import { useModalDrag } from '@/hooks/useModalDrag';
import { BlacklistUserDetail } from '@/types/blacklist';

const BlacklistModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const id = params?.id as string;
  const { setIsModalOpen, setSelectedBlacklistData } = useBlacklistStore();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { postDislikeMutation, blacklistDetail } = useBlacklist(undefined, 1, id);

  const handleClose = () => {
    setIsVisible(false);
    router.push('/blacklist', { scroll: false });
  };

  const { handleMouseDown, handleMouseUp } = useModalDrag({ onClose: handleClose });

  useEffect(() => {
    if (pathname === '/blacklist') {
      setIsVisible(false);
      setIsModalOpen(false);
      setSelectedBlacklistData(null);
    } else {
      setIsVisible(true);
    }
  }, [pathname, setIsModalOpen, setSelectedBlacklistData]);

  const handleDislike = (blacklistId: string) => {
    postDislikeMutation(blacklistId);
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

  const metaItems = [
    { label: '작성일', value: '2024-12-14' },
    { label: '담은수', value: 128 },
    { label: '비추천', value: 2930 },
  ];

  return (
    <AnimatePresence mode='wait'>
      {isVisible && (
        <motion.div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
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
              <div className='space-y-4 rounded-lg border border-white/10 bg-black1/30 p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <h2 className='bg-gradient-to-r from-lostark-400 to-lostark-300 bg-clip-text text-3xl font-bold text-transparent text-white'>
                      {blacklistDetail?.post.title}
                    </h2>
                    {/* 태그 */}
                    <span className='rounded-full bg-lostark-400/20 px-3 py-1 text-sm font-medium text-lostark-400'>
                      블랙리스트
                    </span>
                  </div>

                  {/* dislike */}
                  <button
                    onClick={() => handleDislike(id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 ${
                      blacklistDetail?.post.userDisliked
                        ? 'bg-lostark-400 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <ThumbsUp
                      size={20}
                      className={`transition-transform duration-200 ${blacklistDetail?.post.userDisliked ? 'scale-110' : ''}`}
                    />
                    <span className='font-medium'>{blacklistDetail?.post.dislikes}</span>
                  </button>
                </div>
                <div className='flex items-center justify-between border-t border-white/10 pt-4'>
                  <div className='flex items-center gap-2'>
                    <span className='text-white/60'>작성자:</span>
                    <span className='text-lg font-medium text-white'>{blacklistDetail?.post.author.slice(10)}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-white/60'>
                    {metaItems.map((item, index) => (
                      <div key={`item-${index}`} className='flex items-center'>
                        {index > 0 && <div className='mx-2 h-4 w-[1px] bg-white/20'></div>}
                        <div className='flex items-center gap-2'>
                          <span className='font-semibold text-lostark-400'>{item.label}</span>
                          <span>{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 테이블 */}
              <div className='flex flex-col overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-black2/80 to-black1/50 backdrop-blur-sm'>
                <div className='flex w-full border-b border-white/20 bg-black1/70 px-2 py-5'>
                  <div className='flex w-2/5 items-center gap-2 px-6'>
                    <span className='font-medium text-lostark-400'>닉네임</span>
                    <span className='rounded-full bg-lostark-400/20 px-2 py-0.5 text-xs text-lostark-400'>
                      {blacklistDetail?.data.length || 0}
                    </span>
                  </div>
                  <div className='w-3/5 px-6 font-medium text-lostark-400'>제재 사유</div>
                </div>

                <div className='scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 flex h-[360px] flex-col overflow-y-auto'>
                  {isPageLoading ? (
                    <div className='flex items-center justify-center py-8 text-white/60'>
                      <div className='flex items-center gap-2'>
                        <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-lostark-400'></div>
                        로딩 중...
                      </div>
                    </div>
                  ) : blacklistDetail?.data.length ? (
                    blacklistDetail.data.map((user: BlacklistUserDetail, idx: number) => (
                      <div
                        key={idx}
                        className='group flex w-full items-center border-b border-white/10 px-2 transition hover:bg-white/5'
                      >
                        <div className='w-2/5 px-6 py-5'>
                          <span className='rounded bg-white/5 px-3 py-1.5 text-white/90 transition group-hover:bg-white/10'>
                            {user.nickname}
                          </span>
                        </div>
                        <div className='w-3/5 px-6 py-5'>
                          <p className='text-white/80 transition group-hover:text-white'>{user.reason}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='flex items-center justify-center py-8 text-white/60'>데이터가 없습니다.</div>
                  )}
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
