'use client';
import { useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlacklist } from '@/hooks/useBlacklist';
import { useBlacklistStore } from '@/stores/blacklistStore';
import BlacklistCreateModal from '@/components/modal/blacklistCreate';
import { Minus, Plus, Search } from 'lucide-react';
import LikeButton from '@/components/common/LikeButton';
import { BlacklistUser, SortType } from '@/types/blacklist';
import PopularList from '@/components/blacklist/PopularList';
import { useLoadingStore } from '@/stores/loadingStore';
import { useRouter } from 'next/navigation';

const BlacklistPage = () => {
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);
  const {
    searchTerm,
    flyingItem,
    isCreateModalOpen,
    sortType,
    setSearchTerm,
    setFlyingItem,
    setIsCreateModalOpen,
    setSelectedBlacklistData,
    setSortType,
    setCartRef,
    isModalOpen,
    setIsModalOpen,
  } = useBlacklistStore();

  const { blacklist, myBlacklist, handleAddToMyBlacklist, handleRemoveFromMyBlacklist, isLoading } =
    useBlacklist(sortType);
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  // cartRef 설정
  useEffect(() => {
    setCartRef(cartRef);
  }, [setCartRef]);

  const handleBlacklistSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm],
  );

  const filteredBlacklist = blacklist.filter(
    (item) => item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false,
  );

  const handleAddToBlacklist = (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
    e.preventDefault();
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const cartRect = cartRef.current?.getBoundingClientRect();

    if (cartRect) {
      setFlyingItem({
        id: blacklistItem.id.toString(),
        x: buttonRect.left,
        y: buttonRect.top,
        type: 'add',
      });

      setTimeout(() => {
        setFlyingItem(null);
        handleAddToMyBlacklist(blacklistItem);
      }, 400);
    }
  };

  const handleRemoveFromBlacklist = (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
    e.stopPropagation();
    handleRemoveFromMyBlacklist(blacklistItem.id);
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.5,
      },
    }),
    hover: {
      scale: 1.02,
      backgroundColor: '#1a1a1a',
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className='relative min-h-screen bg-black1 text-gray-100'>
      {/* 인기 블랙리스트 */}
      <section className='container mx-auto px-4 pt-16'>
        <h1 className='mb-8 text-3xl font-bold text-lostark-400'>가장 인기 있는 블랙리스트</h1>
        <PopularList blacklist={blacklist} onItemClick={setSelectedBlacklistData} />
      </section>
      <section className='container mx-auto px-4 py-16'>
        <div className='mb-6 flex items-center space-x-4'>
          <select
            aria-label='정렬 방식 선택'
            className='h-[40px] rounded-lg border border-transparent bg-black2 px-4 py-2 text-gray-300 transition-all duration-300 focus:border-lostark-400'
            onChange={(e) => setSortType(e.target.value as SortType)}
          >
            <option value=''>구분</option>
            <option value='popular'>인기순</option>
            <option value='newest'>최신순</option>
          </select>
          <LikeButton />
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
          {/* 새로 만들기 버튼 */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className='h-[40px] rounded-lg bg-black2 px-6 py-2 font-semibold text-white/80 shadow-lg transition-all duration-300 hover:bg-black2/70'
          >
            새로 만들기
          </button>
        </div>

        {/* 블랙리스트 목록 */}
        <div className='grid grid-cols-2 gap-8 lg:grid-cols-3'>
          <ul
            role='list'
            className='col-span-2 space-y-4 overflow-y-auto rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
            style={{ height: 'calc(100vh - 316px)' }}
          >
            {filteredBlacklist.map((blacklistItem, index) => (
              <motion.li
                key={`blacklist-${blacklistItem.id}`}
                variants={listItemVariants}
                initial='hidden'
                animate='visible'
                whileHover='hover'
                custom={index}
                className='flex items-center justify-between rounded-lg bg-black2 p-4'
                layout
              >
                <button
                  className='w-full text-left outline-none'
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedBlacklistData(blacklistItem);
                    router.push(`/blacklist/${blacklistItem.id}`);
                  }}
                >
                  <p className='mb-2 text-lg font-semibold text-lostark-300'>{blacklistItem.title || '이름 없음'}</p>
                  <p className='text-sm text-gray-400'>
                    {blacklistItem.id} | {blacklistItem.author} | 담은수 {blacklistItem.id} | 비추천
                  </p>
                </button>
                <button
                  onClick={(e) => handleAddToBlacklist(blacklistItem, e)}
                  className='rounded-full bg-[#4CAF50] p-2 hover:bg-[#358438]'
                >
                  <Plus className='text-white' size={20} />
                </button>
              </motion.li>
            ))}
          </ul>

          <div ref={cartRef} className='rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'>
            <h2 className='mb-6 text-2xl font-bold text-lostark-400'>내가 담은 블랙리스트</h2>
            <ul className='space-y-2 overflow-y-auto' style={{ height: 'calc(100vh - 420px)' }}>
              <AnimatePresence mode='popLayout'>
                {myBlacklist.map((blacklistItem, index) => (
                  <motion.li
                    key={blacklistItem.id}
                    layout
                    initial={{
                      opacity: 0,
                      x: -20,
                      height: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      height: 'auto',
                      scale: 1,
                      transition: {
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      },
                    }}
                    exit={{
                      opacity: [1, 0],
                      height: ['auto', 0],
                      transition: {
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.15 },
                      },
                    }}
                    className='flex items-center justify-between overflow-hidden rounded-lg bg-black2 p-2'
                    whileHover={{ scale: 1.02 }}
                  >
                    <button className='w-full text-left' onClick={() => setSelectedBlacklistData(blacklistItem)}>
                      <p className='text-sm text-lostark-300'>{blacklistItem?.title || '이름 없음'}</p>
                      <p className='text-sm text-gray-400'>{blacklistItem.author}</p>
                    </button>
                    <button
                      onClick={(e) => handleRemoveFromBlacklist(blacklistItem, e)}
                      className='rounded-full bg-red-500 p-2 hover:bg-red-600'
                    >
                      <Minus className='text-white' size={14} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {flyingItem && flyingItem.type === 'add' && (
          <motion.div
            key={flyingItem.id}
            initial={{
              scale: 1,
              x: flyingItem.x,
              y: flyingItem.y,
              opacity: 1,
            }}
            animate={{
              scale: 0.5,
              x: cartRef.current?.getBoundingClientRect().left ?? 0,
              y: cartRef.current?.getBoundingClientRect().top ?? 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              pointerEvents: 'none',
              zIndex: 9999,
            }}
            className='rounded-full bg-[#4CAF50] p-2 shadow-lg'
          >
            <Plus className='text-white' size={20} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className='border-t border-black2 py-12'>
        <div className='mx-auto px-4 text-center text-white/50'>Copyright © All rights reserved.</div>
      </footer>

      <AnimatePresence>
        {isCreateModalOpen && <BlacklistCreateModal />}
        {/* {isModalOpen && <BlacklistModal />} */}
      </AnimatePresence>
    </div>
  );
};

export default BlacklistPage;
