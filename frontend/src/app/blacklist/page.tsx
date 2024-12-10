'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/pages/blacklist.css';
import BlacklistCreateModal from '@/components/modal/blacklistCreate';
import axiosInstance from '@/api/axios';

interface BlacklistUser {
  title: number;
  author: string;
  time: string;
}

const BlacklistPage: React.FC = () => {
  const router = useRouter();

  // 초기 데이터
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);

  const [selectedBlacklist, setSelectedBlacklist] = useState<BlacklistUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/blacklist');
      setBlacklist(res.data);
    };
    fetchData();
  }, []);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleCreateBlacklist = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // 항목 추가
  const handleAddToSelected = (user: BlacklistUser) => {
    setSelectedBlacklist((prev) => [...prev, user]);
    setBlacklist((prev) => prev.filter((item) => item.title !== user.title));
  };

  return (
    <div className='flex min-h-screen bg-gray-900 p-8 text-gray-100'>
      {/* 왼쪽 박스 */}
      <div className='mr-4 w-1/2 rounded-lg bg-gray-800 p-6 shadow-md'>
        <h2 className='mb-4 text-xl font-bold'>전체 블랙리스트</h2>
        <ul className='space-y-4'>
          {blacklist.map((user) => (
            <li key={user.title} className='flex items-center justify-between rounded-lg bg-gray-700 p-4'>
              <div>
                <p className='text-lg font-semibold'>{user.title}</p>
                <p className='text-sm text-gray-400'>생성자: {user.author}</p>
              </div>
              <button
                onClick={() => handleAddToSelected(user)}
                className='rounded-lg bg-blue-500 px-4 py-1 text-white transition duration-200 hover:bg-blue-400'
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 오른쪽 박스 */}
      <div className='ml-4 w-1/2 rounded-lg bg-gray-800 p-6 shadow-md'>
        <h2 className='mb-4 text-xl font-bold'>내 블랙리스트</h2>
        <ul className='space-y-4'>
          {selectedBlacklist.map((user) => (
            <li key={user.title} className='rounded-lg bg-gray-700 p-4 text-lg font-semibold'>
              {user.title}
            </li>
          ))}
        </ul>
      </div>

      {/* "블랙리스트 명단 만들기" 버튼 */}
      <div className='fixed bottom-8 right-8'>
        <button
          onClick={handleCreateBlacklist}
          className='rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg transition duration-300 hover:bg-green-400'
        >
          블랙리스트 명단 만들기
        </button>
      </div>
      {/* 모달 */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-3xl overflow-hidden rounded-lg bg-gray-800 shadow-lg'>
            <div className='flex items-center justify-between bg-gray-700 p-4 text-white'>
              <h2 className='text-xl font-bold'>블랙리스트 명단 만들기</h2>
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
    </div>
  );
};

export default BlacklistPage;
