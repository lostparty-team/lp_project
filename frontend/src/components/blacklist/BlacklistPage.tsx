'use client';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlacklist } from '@/hooks/useBlacklist';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { Minus, Plus, Search } from 'lucide-react';
import LikeButton from '@/components/common/LikeButton';
import { BlacklistUser, SortType } from '@/types/blacklist';
import PopularList from '@/components/blacklist/PopularList';
import { useLoadingStore } from '@/stores/loadingStore';
import { useRouter } from 'next/navigation';
import { CustomButton } from '../common';
import BlacklistCreateModal from './modal/blacklistCreate';
import { toast } from 'react-toastify';

const BlacklistItem = ({
  blacklistItem,
  onItemClick,
  onAddClick,
}: {
  blacklistItem: BlacklistUser;
  onItemClick: (item: BlacklistUser) => void;
  onAddClick: (item: BlacklistUser, e: React.MouseEvent) => void;
}) => {
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
    <motion.li
      variants={listItemVariants}
      initial='hidden'
      animate='visible'
      whileHover='hover'
      className='flex items-center justify-between rounded-lg bg-black2 p-4'
      layout
    >
      <button className='w-full text-left outline-none' onClick={() => onItemClick(blacklistItem)}>
        <p className='mb-2 text-lg font-semibold text-lostark-300'>{blacklistItem.title || '이름 없음'}</p>
        <p className='text-sm text-gray-400'>
          {blacklistItem.id} | {blacklistItem.author} | 담은수 {blacklistItem.id} | 비추천
        </p>
      </button>
      <button
        onClick={(e) => onAddClick(blacklistItem, e)}
        className='rounded-full bg-[#4CAF50] p-2 hover:bg-[#358438]'
      >
        <Plus className='text-white' size={20} />
      </button>
    </motion.li>
  );
};

const MyBlacklistItem = ({
  blacklistItem,
  onItemClick,
  onRemoveClick,
}: {
  blacklistItem: BlacklistUser;
  onItemClick: (item: BlacklistUser) => void;
  onRemoveClick: (item: BlacklistUser, e: React.MouseEvent) => void;
}) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: 'auto',
        transition: { duration: 0.2 }, // 명시적 duration 설정
      }}
      exit={{
        opacity: 0,
        height: 0,
        transition: { duration: 0.2 },
      }}
      className='flex items-center justify-between overflow-hidden rounded-lg bg-black2 p-2'
      whileHover={{ scale: 1.02 }}
    >
      <button className='w-full text-left' onClick={() => onItemClick(blacklistItem)}>
        <p className='text-sm text-lostark-300'>{blacklistItem?.title || '이름 없음'}</p>
        <p className='text-sm text-gray-400'>{blacklistItem.author}</p>
      </button>
      <button onClick={(e) => onRemoveClick(blacklistItem, e)} className='rounded-full bg-red-500 p-2 hover:bg-red-600'>
        <Minus className='text-white' size={14} />
      </button>
    </motion.li>
  );
};

const BlacklistPage = () => {
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
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

  const handleBlacklistSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

        // 장바구니 추가 완료 후 스크롤
        setTimeout(() => {
          if (cartRef.current) {
            // 다음 프레임에서 최종 높이 계산
            requestAnimationFrame(() => {
              const container = cartRef.current;
              if (!container) return;
              const scrollableHeight = container.scrollHeight - container.clientHeight;
              container.scrollTo({
                top: scrollableHeight,
                behavior: 'smooth',
              });
            });
          }
        }, 250); // 아이템 추가 애니메이션 완료 대기
      });
    }
  };

  const handleRemoveFromBlacklist = (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
    e.stopPropagation();
    handleRemoveFromMyBlacklist(blacklistItem.id);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleBlacklistItemClick = (blacklistItem: BlacklistUser) => {
    setIsModalOpen(true);
    setSelectedBlacklistData(blacklistItem);
    router.push(`/blacklist/${blacklistItem.id}`, { scroll: false });
  };

  const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as SortType);
  };

  const handleMyBlacklistItemClick = (blacklistItem: BlacklistUser) => {
    setSelectedBlacklistData(blacklistItem);
  };

  useEffect(() => {
    if (searchInputRef.current && searchTerm) {
      searchInputRef.current.value = searchTerm;
      const filteredResults = blacklist.filter(
        (item) => item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false,
      );
      if (filteredResults.length === 0) {
        toast.info('검색 결과가 없습니다.');
      }
    }
  }, [searchTerm, blacklist]);

  const flyingAnimationProps = {
    initial: {
      scale: 1,
      x: flyingItem?.x,
      y: flyingItem?.y,
      opacity: 1,
    },
    animate: {
      scale: 0.5,
      x: cartRef.current?.getBoundingClientRect().left ?? 0,
      y: cartRef.current?.getBoundingClientRect().top ?? 0,
      opacity: 0,
    },
    exit: { opacity: 0 },
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
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
            onChange={handleSortTypeChange}
          >
            <option value=''>구분</option>
            <option value='popular'>인기순</option>
            <option value='newest'>최신순</option>
          </select>
          <LikeButton />
          <div className='relative flex-1'>
            <input
              ref={searchInputRef}
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
            onClick={handleCreateModalOpen}
            className='h-[40px] rounded-lg bg-black2 px-6 py-2 text-white/80 shadow-lg transition-all duration-300 hover:bg-black2/70'
          >
            새로 만들기
          </button>
        </div>

        {/* 블랙리스트 목록 */}
        <div className='grid grid-cols-2 gap-8 lg:grid-cols-3'>
          <ul
            role='list'
            className='col-span-2 space-y-4 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
          >
            {filteredBlacklist.map((blacklistItem, index) => (
              <BlacklistItem
                key={`blacklist-${blacklistItem.id}`}
                blacklistItem={blacklistItem}
                onItemClick={handleBlacklistItemClick}
                onAddClick={handleAddToBlacklist}
              />
            ))}
          </ul>
          {/* 내가 담은 블랙리스트 */}
          <div
            ref={cartRef}
            className='sticky top-4 h-[480px] overflow-auto rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
          >
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-lostark-400'>내가 담은 블랙리스트</h2>
              <CustomButton size='sm' onClick={() => setIsCreateModalOpen(true)}>
                생성하기
              </CustomButton>
            </div>
            <ul className='space-y-2'>
              <AnimatePresence mode='popLayout'>
                {myBlacklist.map((blacklistItem, index) => (
                  <MyBlacklistItem
                    key={blacklistItem.id}
                    blacklistItem={blacklistItem}
                    onItemClick={handleMyBlacklistItemClick}
                    onRemoveClick={handleRemoveFromBlacklist}
                  />
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
            {...flyingAnimationProps}
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

      <AnimatePresence>{isCreateModalOpen && <BlacklistCreateModal />}</AnimatePresence>
    </div>
  );
};

export default BlacklistPage;
