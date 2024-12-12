'use client';
import { useState } from 'react';
import { useBlacklist } from '@/hooks/useBlacklist';
import PopularList from '@/components/blacklist/PopularList';
import BlacklistCreateModal from '@/components/modal/blacklistCreate';
import BlacklistModal from '@/components/modal/blacklistModal';
import '../../styles/pages/blacklist.css';

const BlacklistPage = () => {
  const { blacklist, myBlacklist, handleAddToMyBlacklist, handleRemoveFromMyBlacklist, handleSortBlacklist } =
    useBlacklist();
  const [listModalData, setListModalData] = useState<Record<string, any> | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

  return (
    <div className='min-h-screen bg-black1 text-gray-100'>
      <section className='container mx-auto px-4 pt-16'>
        <h1 className='mb-8 text-3xl font-bold text-lostark-400'>가장 인기 있는 블랙리스트</h1>
        <PopularList blacklist={blacklist} onItemClick={setListModalData} />
      </section>

      <section className='container mx-auto px-4 py-16'>
        <div className='mb-6 flex items-center space-x-4'>
          <select
            className='h-[40px] rounded-lg border border-transparent bg-black2 px-4 py-2 text-gray-300 transition-all duration-300 focus:border-lostark-400'
            onChange={(e) => handleSortBlacklist(e.target.value)}
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
            onClick={() => setCreateModalOpen(true)}
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
