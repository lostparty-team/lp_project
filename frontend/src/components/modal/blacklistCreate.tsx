'use client';

import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import { CustomButton } from '../common';
import { Check, Edit } from 'lucide-react';
import { axiosInstance } from '@/api/axios';
import { toast } from 'react-toastify';

interface BlacklistUser {
  id: number;
  nickname: string;
  reason: string;
}

type ChildProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const BlacklistCreateModal = ({ setModalOpen }: ChildProps) => {
  const nameRegex = /^(?![0-9])[가-힣a-zA-Z][가-힣a-zA-Z0-9]{1,11}$/;
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);
  const [newUser, setNewUser] = useState<BlacklistUser>({ id: 0, nickname: '', reason: '' });
  const [isValidName, setIsValidName] = useState(true);
  const [title, setTitle] = useState('새로운 블랙리스트');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reasonInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_TITLE_LENGTH = 30; // 최대 제목 길이

  // ESC 키 감지
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setModalOpen]);

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
    setModalOpen(false);
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
      setModalOpen(false);
    } catch (error) {
      alert('블랙리스트 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black1/80 backdrop-blur-sm'>
      <div className='w-full max-w-3xl rounded-xl border border-white/20 bg-gradient-to-br from-black2 to-black1 shadow-2xl'>
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
          <div className='justify-left flex items-center space-x-3'>
            <h2 className='text-3xl font-bold text-white'>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type='text'
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_TITLE_LENGTH) {
                      setTitle(e.target.value);
                    }
                  }}
                  onBlur={() => setIsEditing(false)}
                  className='w-full max-w-[400px] overflow-hidden text-ellipsis rounded-lg bg-black2 px-4 py-2 text-white placeholder-white/50 transition-all duration-200 placeholder:text-2xl placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-lostark-500'
                  placeholder='제목 입력 (최대 30자)'
                  maxLength={MAX_TITLE_LENGTH}
                  autoFocus
                />
              ) : (
                <div className='flex items-center'>
                  <span
                    onClick={() => setIsEditing(true)}
                    className='cursor-pointer rounded-lg px-4 py-2 text-white/80 hover:bg-white/10'
                  >
                    {title}
                  </span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='rounded-full text-white/70 duration-300 hover:bg-white/10 hover:text-white'
                    aria-label='Edit'
                  >
                    <Edit size={28} />
                  </button>
                </div>
              )}
            </h2>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className='items-center rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white'
                aria-label='Complete Edit'
              >
                <Check size={28} />
              </button>
            )}
          </div>
          {/* 테이블 헤더 */}
          <div className='flex flex-col overflow-hidden rounded-xl border border-white/20 bg-black2/50'>
            <div className='flex w-full border-b border-white/20 bg-black1/50 py-4'>
              <div className='w-1/3 px-6 font-medium text-lostark-400'>이름</div>
              <div className='w-1/3 px-6 font-medium text-lostark-400'>사유</div>
              <div className='w-1/3 px-6 font-medium text-lostark-400'></div>
            </div>
            {/* 테이블 내용 */}
            <div className='scrollbar-thin scrollbar-track-black2 scrollbar-thumb-white/20 flex h-96 flex-col overflow-y-auto'>
              {blacklist.length !== 0 ? (
                [...blacklist]
                  .sort((a, b) => {
                    const nameCompare = a.nickname.localeCompare(b.nickname, 'ko');
                    return nameCompare !== 0 ? nameCompare : a.reason.localeCompare(b.reason, 'ko');
                  })
                  .map((user) => (
                    <div
                      key={user.id}
                      className='flex w-full items-center border-b border-white/10 transition hover:bg-white/5'
                    >
                      <div className='w-1/3 px-6 py-4 text-white/80'>{user.nickname}</div>
                      <div className='w-1/3 px-6 py-4 text-white/80'>{user.reason}</div>
                      {/* 제거 버튼 */}
                      <div className='ml-auto w-1/3 flex-[0.5] px-6 py-4'>
                        <CustomButton onClick={() => handleRemove(user.id)} size='sm' className='hover:bg-red-900/50'>
                          제거
                        </CustomButton>
                      </div>
                    </div>
                  ))
              ) : (
                <div className='flex w-full border-b border-white/10'>
                  <div className='w-1/3 px-6 py-4 text-white/50'>ex) 홍길동</div>
                  <div className='w-1/3 px-6 py-4 text-white/50'>ex) 숙코 행동</div>
                  <div className='w-1/3 px-6 py-4'></div>
                </div>
              )}
            </div>

            <div className='flex w-full items-center gap-4 border-t border-white/20 bg-black1/50 p-6'>
              {/* 이름 입력 */}
              <div className='flex-1'>
                <div className='relative'>
                  <input
                    ref={nameInputRef}
                    type='text'
                    value={newUser.nickname}
                    onChange={(e) => {
                      setNewUser({ ...newUser, nickname: e.target.value });
                      setIsValidName(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (e.nativeEvent.isComposing) return;
                        reasonInputRef.current?.focus();
                      }
                    }}
                    placeholder='이름'
                    className={`h-full w-full rounded-lg bg-black2 px-4 py-2 text-white/80 placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isValidName ? 'focus:ring-lostark-500' : 'ring-2 ring-red-500/50'
                    }`}
                  />
                  {!isValidName && (
                    <p className='absolute mt-1 text-sm text-red-400'>2~12자의 한글, 영문, 숫자만 사용 가능합니다.</p>
                  )}
                </div>
              </div>

              {/* 사유 입력 */}
              <div className='flex-1'>
                <input
                  ref={reasonInputRef}
                  type='text'
                  value={newUser.reason}
                  onChange={(e) => setNewUser({ ...newUser, reason: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (e.nativeEvent.isComposing) return;
                      handleAdd();
                    }
                  }}
                  placeholder='사유'
                  className='h-full w-full rounded-lg bg-black2 px-4 py-2 text-white/90 placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lostark-500'
                />
              </div>

              {/* 추가 버튼 */}
              <div className='flex-[0.3]'>
                <CustomButton onClick={handleAdd} size='sm'>
                  추가
                </CustomButton>
              </div>
            </div>
          </div>
          <CustomButton variant='primary' size='lg' onClick={handleCreate} disabled={isLoading}>
            {isLoading ? '생성 중...' : '만들기'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default BlacklistCreateModal;
