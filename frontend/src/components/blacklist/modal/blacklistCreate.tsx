'use client';

import { useEffect, useState, useRef } from 'react';
import { CustomButton } from '../../common';
import { Check, Edit } from 'lucide-react';
import { axiosInstance } from '@/api/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion'; // 추가
import { useLoadingStore } from '@/stores/loadingStore';
import { handleBackdropClick } from '@/utils/modalUtils';
import { useBlacklistStore } from '@/stores/blacklistStore';

interface BlacklistUser {
  id: number;
  nickname: string;
  reason: string;
}

const BlacklistCreateModal = () => {
  const { isLoading, setIsLoading } = useLoadingStore();
  const { setIsCreateModalOpen } = useBlacklistStore();
  const nameRegex = /^(?![0-9])[가-힣a-zA-Z][가-힣a-zA-Z0-9]{1,11}$/;
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);
  const [newUser, setNewUser] = useState<BlacklistUser>({ id: 0, nickname: '', reason: '' });
  const [isValidName, setIsValidName] = useState(true);
  const [title, setTitle] = useState('새로운 블랙리스트');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reasonInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const MAX_TITLE_LENGTH = 30; // 최대 제목 길이

  // ESC 키 감지
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCreateModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setIsCreateModalOpen]);

  useEffect(() => {
    if (inputRef.current) {
      // 제목 입력 최대 너비 제한
      const width = Math.min(title.length + 4, 400);
      console.log(width);
      inputRef.current.style.width = `${width + 1}ch`;
    }
  }, [title, isEditing]);

  // 모달 창 닫기
  const handleClose = () => {
    setIsCreateModalOpen(false);
  };

  // 블랙리스트 명단 삭제
  const handleRemove = (id: number) => {
    setBlacklist(blacklist.filter((user) => user.id !== id));
  };

  // 블랙리스트 명단 추가
  const handleAdd = () => {
    if (!nameRegex.test(newUser.nickname)) {
      setIsValidName(false);
      nameInputRef.current?.focus();
      return;
    }
    if (!newUser.nickname || !newUser.reason) {
      if (!newUser.nickname) {
        nameInputRef.current?.focus();
      }
      return;
    }

    setBlacklist([...blacklist, { ...newUser, id: blacklist.length + 1 }]);
    setNewUser({ id: 0, nickname: '', reason: '' });
    setIsValidName(true);
    nameInputRef.current?.focus();
  };

  // 아이템 애니메이션
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      height: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      x: 0,
      height: 'auto',
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      x: 20,
      height: 0,
      transition: { duration: 0.2 },
    },
  };

  // 블랙리스트 최종 제출
  const createBlacklist = async (blacklistData: {
    title: string;
    author: string;
    blacklist: { nickname: string; reason: string }[];
  }) => {
    try {
      console.log('제출');
      const { data } = await axiosInstance.post('/api/blacklist/create', blacklistData);
      toast.success('블랙리스트가 생성되었습니다.');
      return data;
    } catch (err) {
      toast.error('블랙리스트 생성에 실패했습니다.');
    }
  };

  const handleCreate = async () => {
    if (blacklist.length === 0) {
      toast.warn('최소 1명 이상의 유저를 등록해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      await createBlacklist({
        title,
        author: 'test',
        blacklist: blacklist.map(({ nickname, reason }) => ({
          nickname,
          reason,
        })),
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error('블랙리스트 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <h2 className='text-3xl font-bold text-lostark-400'>블랙리스트 명단 생성</h2>
          <button
            onClick={handleClose}
            className='rounded-full p-2 text-white/70 transition duration-200 hover:bg-white/10 hover:text-white'
          >
            ✕
          </button>
        </div>

        <div className='space-y-6 p-6'>
          {/* 블랙리스트 제목 입력 섹션 */}
          <div className='space-y-4 rounded-lg border border-white/10 bg-black1/30 p-6'>
            <div className='flex items-center gap-3'>
              {isEditing ? (
                <div className='flex items-center gap-2'>
                  <input
                    ref={inputRef}
                    type='text'
                    value={title}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_TITLE_LENGTH) {
                        setTitle(e.target.value);
                      }
                    }}
                    className='w-full max-w-[400px] overflow-hidden text-ellipsis rounded-lg bg-black2/50 px-4 py-2 text-3xl font-bold text-white/70 placeholder-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lostark-500'
                    placeholder='제목 입력 (최대 30자)'
                    maxLength={MAX_TITLE_LENGTH}
                    autoFocus
                  />
                  <button
                    onClick={() => setIsEditing(false)}
                    className='rounded-full p-1.5 text-lostark-400 transition duration-200 hover:bg-white/10'
                  >
                    <Check size={24} />
                  </button>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <h2
                    onClick={() => setIsEditing(true)}
                    className='cursor-pointer bg-gradient-to-r from-lostark-400 to-lostark-300 bg-clip-text text-3xl font-bold text-transparent'
                  >
                    {title}
                  </h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='rounded-full p-1.5 text-white/70 transition duration-200 hover:bg-white/10 hover:text-white'
                  >
                    <Edit size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* 테이블 */}
          <div className='flex flex-col overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-black2/80 to-black1/50 backdrop-blur-sm'>
            <div className='flex w-full border-b border-white/20 bg-black1/70 px-2 py-5'>
              <div className='w-1/3 px-6 font-medium text-lostark-400'>이름</div>
              <div className='w-1/3 px-6 font-medium text-lostark-400'>사유</div>
              <div className='w-1/3 px-6 font-medium text-lostark-400'></div>
            </div>

            {/* 리스트 영역 */}
            <div className='scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 flex h-[360px] flex-col overflow-y-auto'>
              <AnimatePresence initial={false}>
                {blacklist.length !== 0 ? (
                  [...blacklist]
                    .sort((a, b) => {
                      const nameCompare = a.nickname.localeCompare(b.nickname, 'ko');
                      return nameCompare !== 0 ? nameCompare : a.reason.localeCompare(b.reason, 'ko');
                    })
                    .map((user) => (
                      <motion.div
                        key={user.id}
                        variants={itemVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        layout
                        className='group flex w-full items-center border-b border-white/10 px-2 transition hover:bg-white/5'
                      >
                        <div className='w-1/3 px-6 py-5'>
                          <span className='inline-block whitespace-nowrap rounded bg-white/5 px-3 py-1.5 text-white/90 transition group-hover:bg-white/10'>
                            {user.nickname}
                          </span>
                        </div>
                        <div className='w-1/3 px-6 py-5'>
                          <p className='text-white/80 transition group-hover:text-white'>{user.reason}</p>
                        </div>
                        <div className='w-1/3 px-6 py-5 text-right'>
                          <button
                            onClick={() => handleRemove(user.id)}
                            className='rounded-lg bg-red-500/20 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/30'
                          >
                            제거
                          </button>
                        </div>
                      </motion.div>
                    ))
                ) : (
                  <div className='flex items-center justify-center py-8 text-white/60'>
                    아래에서 블랙리스트 대상을 추가해주세요.
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* 입력 폼 */}
            <div className='border-t border-white/20 bg-black1/70 p-6'>
              <div className='flex items-center gap-4'>
                <div className='flex-1'>
                  <div className='h-[72px]'>
                    {' '}
                    <input
                      ref={nameInputRef}
                      type='text'
                      value={newUser.nickname}
                      onChange={(e) => {
                        setNewUser({ ...newUser, nickname: e.target.value });
                        setIsValidName(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                          e.preventDefault();
                          reasonInputRef.current?.focus();
                        }
                      }}
                      placeholder='이름'
                      className={`w-full rounded-lg border ${
                        isValidName ? 'border-white/20' : 'border-red-500/50'
                      } overflow-hidden text-ellipsis whitespace-nowrap bg-black2/50 px-4 py-2.5 text-white/70 placeholder-white/50 transition-all duration-300 focus:border-lostark-400 focus:outline-none`}
                    />
                    {!isValidName && (
                      <p className='mt-1 text-sm text-red-400'>2~12자의 한글, 영문, 숫자만 사용 가능합니다.</p>
                    )}
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='h-[72px]'>
                    <input
                      ref={reasonInputRef}
                      type='text'
                      value={newUser.reason}
                      onChange={(e) => setNewUser({ ...newUser, reason: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                          e.preventDefault();
                          handleAdd();
                        }
                      }}
                      placeholder='사유'
                      className='w-full rounded-lg border border-white/20 bg-black2/50 px-4 py-2.5 text-white/70 placeholder-white/50 transition-all duration-300 focus:border-lostark-400 focus:outline-none'
                    />
                  </div>
                </div>
                <div className='flex h-[72px] items-start'>
                  <CustomButton onClick={handleAdd}>추가</CustomButton>
                </div>
              </div>
            </div>
          </div>
          <CustomButton variant='primary' size='lg' onClick={handleCreate} disabled={isLoading} className='w-full'>
            {isLoading ? '생성 중...' : '만들기'}
          </CustomButton>{' '}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlacklistCreateModal;
