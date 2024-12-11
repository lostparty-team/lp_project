'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import '../../styles/pages/blacklist.css';
import BlacklistCreateModal from '@/components/modal/blacklistCreate';
import BlacklistModal from '@/components/modal/blacklistModal';
import axiosInstance from '@/api/axios';

interface BlacklistUser {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  add: number;
  bad: number;
}

const BlacklistPage: React.FC = () => {
  viewer: number;
  rate: number;
};

const BlacklistPage: React.FC = () => {
  const router = useRouter();
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([
    {
      id: 1,
      name: '욕설 플레이어 모음',
      createdBy: '방울토마토라면',
      createdAt: '2024-11-25',
      add: 1294,
      bad: 153,
    },
    {
      id: 2,
      name: '숙코 모음',
      createdBy: '남양쮸강아지우',
      createdAt: '2024-11-28',
      add: 16,
      bad: 2,
    },
    {
      id: 3,
      name: '비매너 플레이어',
      createdBy: '아기사슴설장군',
      createdAt: '2024-10-15',
      add: 112,
      bad: 33,
    },
    {
      id: 4,
      name: '비매너 모음집',
      createdBy: '애니츠의겨울은너무추오',
      createdAt: '2024-11-26',
      add: 133,
      bad: 30,
    },
    {
      id: 5,
      name: '내 블랙리스트',
      createdBy: '낟찔',
      createdAt: '2024-08-23',
      add: 10,
      bad: 1,
    },
    {
      id: 6,
      name: '레이드 빌런',
      createdBy: 'HaeSungs',
      createdAt: '2024-09-19',
      add: 242,
      bad: 50,
    },
    {
      id: 7,
      name: '레이드 빌런',
      createdBy: 'HaeSungs',
      createdAt: '2024-09-19',
      add: 242,
      bad: 50,
    },
    {
      id: 8,
      name: '레이드 빌런',
      createdBy: 'HaeSungs',
      createdAt: '2024-09-19',
      add: 242,
      bad: 50,
    },
    {
      id: 9,
      name: '레이드 빌런',
      createdBy: 'HaeSungs',
      createdAt: '2024-09-19',
      add: 242,
      bad: 50,
    },
  ]);

  const [myBlacklist, setMyBlacklist] = useState<BlacklistUser[]>([]);
  const [listModalData, setListModalData] = useState<Record<string, any> | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const handleCreateBlacklist = () => {
    setCreateModalOpen(true);
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
      setBlacklist([...blacklist].sort((a, b) => b.bad - a.bad));
    }
  };

  return (
    <div className='min-h-screen bg-black1 text-gray-100'>
      <section className='container mx-auto px-4 pt-16'>
        <h1 className='mb-8 text-3xl font-bold text-lostark-400'>가장 인기 있는 블랙리스트</h1>
        <div className='grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {blacklist
            .sort((a, b) => b.bad - a.bad)
            .slice(0, 3)
            .map((data, index) => (
              <button
                key={data.id}
                onClick={() => setListModalData(data)}
                className='relative overflow-hidden rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 text-left shadow-lg transition-all duration-300 hover:scale-105'
              >
                <span className='absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-sm text-white'>
                  #{index + 1}
                </span>
                <h3 className='mb-2 text-xl font-bold text-lostark-300'>{data.name}</h3>
                <p className='text-sm text-gray-400'>{data.createdBy}</p>
              </button>
            ))}
        </div>
      </section>

      <section className='container mx-auto px-4 py-16'>
        <div className='mb-6 flex items-center space-x-4'>
          <select
            className='h-[40px] rounded-lg border border-transparent bg-black2 px-4 py-2 text-gray-300 transition-all duration-300 focus:border-lostark-400'
            onChange={handleSortChange}
          >
            <option value=''>구분</option>
            <option value='popular'>인기순</option>
            <option value='newest'>최신순</option>
          </select>
          <input
            type='text'
            placeholder='제목을 입력하세요...'
            className='h-[40px] flex-grow rounded-lg border border-transparent bg-black2 px-4 py-2 text-sm text-gray-400 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lostark-400'
          />
          <button
            onClick={handleCreateBlacklist}
            className='h-[40px] rounded-lg bg-lostark-400 px-6 py-2 font-semibold text-black1 shadow-lg transition-all duration-300 hover:bg-lostark-300'
          >
            새로 만들기
          </button>
        </div>

        <div className='grid grid-cols-2 gap-8 lg:grid-cols-3'>
          <ul
            className='col-span-2 space-y-4 overflow-y-auto rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
            style={{ height: 'calc(100vh - 316px)' }}
          >
            {blacklist.map((data) => (
              <li key={data.id} className='flex items-center justify-between rounded-lg bg-black2 p-4'>
                <button className='w-full text-left' onClick={() => setListModalData(data)}>
                  <p className='mb-2 text-lg font-semibold text-lostark-300'>{data.name}</p>
                  <p className='text-sm text-gray-400'>
                    {data.createdBy} | {data.createdAt} | 담은수 {data.add} | 비추천 {data.bad}
                  </p>
                </button>
                <button
                  onClick={() => handleAddToMyBlacklist(data)}
                  className='rounded-lg bg-green-500 px-3 py-1 text-black1 transition-all duration-300 hover:bg-green-400'
                >
                  +
                </button>
              </li>
            ))}
          </ul>

          <div className='rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'>
            <h2 className='mb-6 text-2xl font-bold text-lostark-400'>내가 담은 블랙리스트</h2>
            <ul className='space-y-2 overflow-y-auto' style={{ height: 'calc(100vh - 420px)' }}>
              {myBlacklist.map((data) => (
                <li key={data.id} className='flex items-center justify-between rounded-lg bg-black2 p-2'>
                  <button className='w-full text-left' onClick={() => setListModalData(data)}>
                    <p className='text-sm text-lostark-300'>{data.name}</p>
                    <p className='text-sm text-gray-400'>{data.createdBy}</p>
                  </button>
                  <button
                    onClick={() => handleRemoveFromMyBlacklist(data.id)}
                    className='w-[32px] rounded-lg bg-red-500 px-2 py-1 text-black1 transition-all duration-300 hover:bg-red-400'
                  >
                    -
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className='border-t border-black2 py-12'>
        <div className='mx-auto px-4 text-center text-white/50'>Copyright © All rights reserved.</div>
      </footer>

      {isCreateModalOpen && <BlacklistCreateModal setModalOpen={setCreateModalOpen} />}
      {listModalData && <BlacklistModal data={listModalData} setModalData={setListModalData} />}
    </div>
  );
};

export default BlacklistPage;
