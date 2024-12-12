'use client';
import { useState, useCallback } from 'react';
import { useBlacklist } from '@/hooks/useBlacklist';
import PopularList from '@/components/blacklist/PopularList';
import BlacklistCreateModal from '@/components/modal/blacklistCreate';
import BlacklistModal from '@/components/modal/blacklistModal';
import '../../styles/pages/blacklist.css';
import { Minus, Plus, Search } from 'lucide-react';

const BlacklistPage = () => {
  const { blacklist, myBlacklist, handleAddToMyBlacklist, handleRemoveFromMyBlacklist, handleSortBlacklist } =
    useBlacklist();
  const [listModalData, setListModalData] = useState<Record<string, any> | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleBlacklistSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredBlacklist = blacklist.filter(
    (item) => item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false,
  );

  return (
    <div className='min-h-screen bg-black1 text-gray-100'>
      {/* 인기 블랙리스트 */}
      {/* <section className='container mx-auto px-4 pt-16'>
        <h1 className='mb-8 text-3xl font-bold text-lostark-400'>가장 인기 있는 블랙리스트</h1>
        <PopularList blacklist={blacklist} onItemClick={setListModalData} />
      </section> */}

      <section className='container mx-auto px-4 py-16'>
        <div className='mb-6 flex items-center space-x-4'>
          <select
            aria-label='정렬 방식 선택'
            className='h-[40px] rounded-lg border border-transparent bg-black2 px-4 py-2 text-gray-300 transition-all duration-300 focus:border-lostark-400'
            onChange={(e) => handleSortBlacklist(e.target.value as 'popular' | 'newest')}
          >
            <option value=''>구분</option>
            <option value='popular'>인기순</option>
            <option value='newest'>최신순</option>
          </select>
          <div className='relative flex-1'>
            <input
              type='text'
              value={searchTerm}
              onChange={handleBlacklistSearch}
              aria-label='블랙리스트 검색'
              placeholder='제목을 입력하세요...'
              className='h-[40px] w-full rounded-lg border border-transparent bg-black2 px-4 py-2 pl-10 text-sm text-gray-400 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lostark-400'
            />
            <Search className='absolute left-3 top-2.5 text-[#e2d6c6]' size={20} />
          </div>
          <button
            onClick={() => setCreateModalOpen(true)}
            className='h-[40px] rounded-lg bg-lostark-400 px-6 py-2 font-semibold text-black1 shadow-lg transition-all duration-300 hover:bg-lostark-300'
          >
            새로 만들기
          </button>
        </div>

        <div className='grid grid-cols-2 gap-8 lg:grid-cols-3'>
          <ul
            role='list'
            className='col-span-2 space-y-4 overflow-y-auto rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
            style={{ height: 'calc(100vh - 316px)' }}
          >
            {filteredBlacklist.map((data) => (
              <li key={`blacklist-${data.id}`} className='flex items-center justify-between rounded-lg bg-black2 p-4'>
                <button className='w-full text-left' onClick={() => setListModalData(data)}>
                  <p className='mb-2 text-lg font-semibold text-lostark-300'>{data?.title || '이름 없음'}</p>
                  <p className='text-sm text-gray-400'>
                    {data.id} | {data.author} | 담은수 {data.add} | 비추천 {data.bad}
                  </p>
                </button>
                <button
                  onClick={() => handleAddToMyBlacklist(data)}
                  className='rounded-full bg-[#4CAF50] p-2 hover:bg-[#358438]'
                >
                  <Plus className='text-white' size={20} />
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
                    <p className='text-sm text-lostark-300'>{data?.title || '이름 없음'}</p>
                    {/* <p className='text-sm text-gray-400'>{data.createdBy}</p> */}
                  </button>
                  <button
                    onClick={() => handleRemoveFromMyBlacklist(data.id)}
                    className='rounded-full bg-red-500 p-2 hover:bg-red-600'
                  >
                    <Minus className='text-white' size={14} />
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
