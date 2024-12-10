'use client';

import '../../styles/pages/party-info.css';
import React, { useState } from 'react';

interface ScreenShareProps {
  minimized?: boolean;
  onToggle?: () => void;
}

const ScreenShare: React.FC<ScreenShareProps> = ({ minimized = false, onToggle }) => {
  return (
    <div
      className={`${
        minimized ? 'slide-animation' : 'w-full'
      } rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 p-1 pt-4 shadow-lg`}
    >
      <div className='h-full rounded-lg bg-gray-900 p-4'>
        <div className='pb-4 text-xl'>{minimized ? '화면 공유 중...' : '화면 공유'}</div>
        <div className='aspect-w-16 aspect-h-9 mb-4 h-40 rounded-lg bg-black'></div>
        <button className='w-full rounded bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600' onClick={onToggle}>
          {minimized ? '화면 공유 종료' : '화면 공유 시작'}
        </button>
      </div>
    </div>
  );
};

const PartyInfoScreenShare: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);

  const members = [
    { server: '카단', name: 'HaeSungs', level: 70, itemLevel: 1676.67 },
    { server: '아만', name: '낟찔', level: 60, itemLevel: 1660 },
    { server: '아만', name: '애니츠의겨울은너무추워', level: 60, itemLevel: 1430 },
  ];

  const toggleScreenShare = () => {
    setIsSharing(!isSharing);
  };

  return (
    <div className='bg-gray-900 p-8 text-gray-100' style={{ height: 'calc(100vh - 68px)', overflow: 'hidden' }}>
      <main className='mx-auto flex h-full max-w-screen-xl flex-col gap-10 overflow-hidden px-20'>
        <header className='p-4 text-center text-2xl font-bold'>파티원 정보 확인</header>
        <div className='relative h-[750px] p-4'>
          {/* 화면 공유 또는 파티원 정보 표시 */}
          <div className='relative flex h-full gap-[10px]'>
            {/* 오른쪽으로 이동하는 작은 화면 공유 창 */}
            {isSharing ? (
              <>
                <div className='z-10 flex-[1]'>
                  <ScreenShare minimized={true} onToggle={toggleScreenShare} />
                </div>
                {/* 내용 영역 */}
                <div className='w-full flex-[2] space-y-4 rounded-lg border border-yellow-500 bg-gray-900 p-4 shadow-lg'>
                  {/* 파티원 정보 */}
                  {members.map((data) => (
                    <div className='flex items-center justify-between rounded-md bg-gray-700 p-4'>
                      <div>
                        <div className='font-semibold text-yellow-300'>{data.name}</div>
                        <div className='text-sm text-gray-400'>레벨 {data.level}</div>
                        <div className='text-sm text-gray-400'>세구빛 30각 | 엘40 | 126초 | 7겁작x4 6겁작x7</div>
                        <div className='text-sm text-gray-400'>진화 120 깨달음 95 도약 60</div>
                      </div>
                      <div className='text-right'>
                        <div className='font-semibold text-gray-200'>아이템 레벨 {data.itemLevel}</div>
                        <div className='text-sm text-gray-400'>{data.server} · 수락 대기</div>
                      </div>
                    </div>
                  ))}
                  <div className='flex items-center justify-between rounded-md bg-gray-800 p-4'>
                    <div className='w-full text-center font-semibold text-yellow-300'>
                      파티원을 기다리는 중 입니다...
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <ScreenShare minimized={false} onToggle={toggleScreenShare} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartyInfoScreenShare;
