'use client';

import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import '../../styles/pages/blacklist.css';

interface BlacklistUser {
  id: number;
  name: string;
  reason: string;
}

type ChildProps = {
  data: Record<string, any>;
  setModalData: Dispatch<SetStateAction<Record<string, any> | null>>;
};

const BlacklistModal = ({ data, setModalData }: ChildProps) => {
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalData(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setModalData]);

  const handleClose = () => {
    setModalData(null);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black1/80 backdrop-blur-sm'>
      <div className='w-full max-w-3xl rounded-xl border border-white/20 bg-gradient-to-br from-black2 to-black1 shadow-2xl'>
        {/* 모달 타이틀 */}
        <div className='flex items-center justify-between rounded-t-xl border-b border-white/20 bg-black1/90 p-6'>
          <h2 className='text-3xl font-bold text-lostark-400'>블랙리스트 상세보기</h2>
          <button
            onClick={handleClose}
            className='rounded-full p-2 text-white/70 transition duration-200 hover:bg-white/10 hover:text-white'
          >
            ✕
          </button>
        </div>

        <div className='space-y-6 p-6'>
          {/* 블랙리스트 제목 및 정보 */}
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold text-white'>{data.name}</h2>
            <div className='flex items-center justify-between'>
              <span className='text-lg text-white/80'>작성자: {data.createdBy}</span>
              <div className='text-sm text-white/60'>
                작성일 {data.createdAt} | 담은수 {data.add} | 비추천 {data.bad}
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
      </div>
    </div>
  );
};

export default BlacklistModal;
