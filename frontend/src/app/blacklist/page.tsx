'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import '../../styles/pages/blacklist.css';
import BlacklistCreateModal from '@/components/modal/blacklistCreate';

interface BlacklistUser {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  viewer: number;
  rate: number;
}

const BlacklistPage: React.FC = () => {
  const router = useRouter();

  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([
    {
      id: 1,
      name: '욕설 플레이어 모음',
      createdBy: '방울토마토라면',
      createdAt: '2024-11-25',
      viewer: 1294,
      rate: 153,
    },
    {
      id: 2,
      name: '숙코 모음',
      createdBy: '남양쮸강아지우',
      createdAt: '2024-11-28',
      viewer: 16,
      rate: 2,
    },
    {
      id: 3,
      name: '비매너 플레이어',
      createdBy: '아기사슴설장군',
      createdAt: '2024-10-15',
      viewer: 112,
      rate: 33,
    },
    {
      id: 4,
      name: '비매너 모음집',
      createdBy: '애니츠의겨울은너무추오',
      createdAt: '2024-11-26',
      viewer: 133,
      rate: 30,
    },
    {
      id: 5,
      name: '내 블랙리스트',
      createdBy: '낟찔',
      createdAt: '2024-08-23',
      viewer: 10,
      rate: 1,
    },
    {
      id: 6,
      name: '레이드 빌런',
      createdBy: 'HaeSungs',
      createdAt: '2024-09-19',
      viewer: 242,
      rate: 50,
    },
  ]);

  const [myBlacklist, setMyBlacklist] = useState<BlacklistUser[]>([]);
  const [isBlacklistModalOpen, setBlacklistModalOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleCreateBlacklist = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddToMyBlacklist = (user: BlacklistUser) => {
    // 이미 담은 블랙리스트인지 확인
    if (myBlacklist.some((item) => item.id === user.id)) {
      toast.error('이미 담은 블랙리스트입니다.');
      return;
    }
    setMyBlacklist((prev) => [...prev, user]);
  };

  const handleRemoveFromMyBlacklist = (userId: number) => {
    setMyBlacklist((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'newest') {
      setBlacklist([...blacklist].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    if (event.target.value === 'popular') {
      setBlacklist([...blacklist].sort((a, b) => b.rate - a.rate));
    }
  };

  return (
    <div className='bg-gray-900 p-8 text-gray-100' style={{ height: 'calc(100vh - 68px)', overflow: 'hidden' }}>
      <main className='mx-auto flex h-full max-w-screen-xl flex-col gap-10 overflow-hidden px-20'>
        <h1>가장 인기 있는 블랙리스트</h1>
        <div className='grid grid-cols-3 gap-4'>
          {blacklist // 인기순으로 정렬된 배열에서
            .sort((a, b) => b.rate - a.rate) // 인기순 정렬
            .slice(0, 3) // 상위 3개 항목만 가져오기
            .map((data, index) => (
              <div key={data.id} className='overflow-hidden rounded-lg bg-gray-800 shadow-md'>
                <div className='relative'>
                  <span className='absolute right-2 top-2 rounded-full bg-orange-500 px-2 py-1 text-sm text-white'>
                    #{index + 1}
                  </span>
                </div>
                <div className='p-4'>
                  <h3 className='mb-2 text-lg font-semibold'>{data.name}</h3>
                  <p className='text-sm text-gray-400'>{data.createdBy}</p>
                </div>
              </div>
            ))}
        </div>

        <div className='flex h-auto flex-grow overflow-hidden'>
          <div className='mr-4 flex-[2] overflow-hidden'>
            <div className='mb-6 flex items-center space-x-4'>
              <select className='rounded-lg bg-gray-800 px-4 py-2 text-gray-300' onChange={handleSortChange}>
                <option value=''>구분</option>
                <option value='popular'>인기순</option>
                <option value='newest'>최신순</option>
              </select>
              <input
                type='text'
                placeholder='제목을 입력하세요.'
                className='flex-grow rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600'
              />
              <button
                onClick={handleCreateBlacklist}
                className='rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition duration-300 hover:bg-blue-400'
              >
                New
              </button>
            </div>

            <ul className='space-y-4 overflow-y-auto' style={{ height: 'calc(100vh - 396px)' }}>
              {blacklist.map((data) => (
                <li key={data.id} className='flex items-center justify-between rounded-lg bg-gray-800 p-4'>
                  <button className='text-left'>
                    <p className='mb-2 text-lg font-semibold'>{data.name}</p>
                    <p className='text-sm text-gray-400'>
                      {data.createdBy} | {data.createdAt} | 조회수 {data.viewer} | 추천 {data.rate}
                    </p>
                  </button>
                  <button
                    onClick={() => handleAddToMyBlacklist(data)}
                    className='rounded-lg bg-green-500 px-3 py-1 text-white transition duration-300 hover:bg-green-400'
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex-[1] rounded-lg bg-gray-800 p-4 shadow-md'>
            <h2 className='mb-6 mt-2 text-lg font-semibold'>내가 담은 블랙리스트</h2>
            <ul className='space-y-2 overflow-y-auto rounded-lg' style={{ height: 'calc(100vh - 420px)' }}>
              {myBlacklist.map((data) => (
                <li key={data.id} className='flex items-center justify-between rounded-lg bg-gray-700 p-2'>
                  <div className='p-2'>
                    <p className='mb-[2px] text-sm'>{data.name}</p>
                    <p className='text-sm text-gray-400'>{data.createdBy}</p>
                  </div>

                  <button
                    onClick={() => handleRemoveFromMyBlacklist(data.id)}
                    className='rounded-lg bg-red-500 px-2 py-1 text-white transition duration-300 hover:bg-red-400'
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-3xl overflow-hidden rounded-lg bg-gray-800 shadow-lg'>
            <div className='flex items-center justify-between bg-gray-700 p-4 text-white'>
              <h2 className='text-xl font-bold'>블랙리스트 명단 생성</h2>
              <button onClick={handleCloseModal} className='text-gray-300 transition duration-200 hover:text-white'>
                ✕
              </button>
            </div>
            <div className='p-4'>
              <BlacklistCreateModal setModalOpen={setModalOpen} />
            </div>
          </div>
        </div>
      )}

      {isBlacklistModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-3xl overflow-hidden rounded-lg bg-gray-800 shadow-lg'>
            <div className='flex items-center justify-between bg-gray-700 p-4 text-white'>
              <h2 className='text-xl font-bold'>Blacklist.name</h2>
              <button onClick={handleCloseModal} className='text-gray-300 transition duration-200 hover:text-white'>
                ✕
              </button>
            </div>
            <div className='p-4'>
              <p className='text-sm text-gray-400'>이 블랙리스트에 포함된 유저들:</p>
              {/* 여기서 해당 블랙리스트에 포함된 유저 목록을 보여줄 수 있습니다. */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlacklistPage;
