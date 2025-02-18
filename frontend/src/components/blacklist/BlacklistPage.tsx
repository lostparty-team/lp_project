'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlacklistItem from './BlacklistItem';
import { useBlacklist } from '@/hooks/useBlacklist';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { Plus, Search } from 'lucide-react';
import LikeButton from '@/components/common/LikeButton';
import { BlacklistUser, SortType } from '@/types/blacklist';
import PopularList from '@/components/blacklist/PopularList';
import { useLoadingStore } from '@/stores/loadingStore';
import { useRouter } from 'next/navigation';
import { CustomButton } from '../common';
import BlacklistCreateModal from './modal/blacklistCreate';
import { toast } from 'react-toastify';
import MyBlacklistItem from './MyBlacklistItem';
import { pageVariants } from '@/constants/animations';
import { deleteBlacklist } from '@/api/blacklist';
import { jwtDecode } from 'jwt-decode';
import queryClient from '@/api/queryClient';

const BlacklistPage = () => {
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<string>();

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
    setIsModalOpen,
    currentPage,
    setCurrentPage,
  } = useBlacklistStore();

  const {
    blacklist,
    myBlacklist,
    handleAddToMyBlacklist,
    handleRemoveFromMyBlacklist,
    isLoading,
    addToCartMutation,
    removeFromCartMutation,
    totalPages,
  } = useBlacklist(sortType, currentPage);
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

  const handleAddToBlacklist = async (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
    e.preventDefault();

    const buttonRect = e.currentTarget.getBoundingClientRect();
    const cartRect = cartRef.current?.getBoundingClientRect();

    if (cartRect) {
      try {
        addToCartMutation(blacklistItem.id);

        setFlyingItem({
          id: blacklistItem.id.toString(),
          x: buttonRect.left,
          y: buttonRect.top,
          type: 'add',
        });

        setTimeout(() => {
          setFlyingItem(null);
          handleAddToMyBlacklist(blacklistItem);

          setTimeout(() => {
            if (cartRef.current) {
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
          }, 250);
        });
      } catch (error) {
        console.error('장바구니 추가 실패:', error);
      }
    }
  };

  const handleRemoveFromBlacklist = (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      removeFromCartMutation(blacklistItem.postId);
      handleRemoveFromMyBlacklist(blacklistItem.id);
    } catch (error) {
      console.error('장바구니 제거 실패:', error);
    }
  };

  const handleDeleteBlacklist = async (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeletingId !== null) return; // 이미 삭제 진행 중이면 중단
    setIsDeletingId(blacklistItem.id);
    const postId = toast.warn(
      <div className=''>
        <p className='mb-4'>블랙리스트를 삭제하시겠습니까?</p>
        <div className='flex justify-end gap-2'>
          <button
            className='rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600'
            onClick={() => {
              toast.dismiss(postId);
              setIsDeletingId(null);
            }}
          >
            취소
          </button>
          <button
            className='rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600'
            onClick={async () => {
              try {
                toast.dismiss(postId);
                toast.success('블랙리스트가 삭제되었습니다.');
                await deleteBlacklist(blacklistItem.id);
                await queryClient.invalidateQueries({ queryKey: ['blacklist'] });
              } catch (error) {
                toast.dismiss(postId);
                toast.error('블랙리스트 삭제에 실패했습니다.');
              } finally {
                setIsDeletingId(null);
              }
            }}
          >
            삭제
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        draggable: false,
        className: 'no-transition',
      },
    );
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

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='min-h-screen overflow-x-hidden p-8'
    >
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
            <div className='col-span-2'>
              <ul role='list' className='space-y-4 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'>
                {blacklist.map((blacklistItem: BlacklistUser) => (
                  <BlacklistItem
                    key={`blacklist-${blacklistItem.id}`}
                    blacklistItem={blacklistItem}
                    currentUser={currentUser}
                    onItemClick={handleBlacklistItemClick}
                    onAddClick={handleAddToBlacklist}
                    onDeleteClick={handleDeleteBlacklist}
                    isDeleting={isDeletingId === blacklistItem.id}
                  />
                ))}
              </ul>
              {/* 페이지네이션 */}
              <div className='mt-8 flex justify-center gap-2'>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='rounded-lg bg-black2 px-4 py-2 text-white/80 transition-all duration-300 hover:enabled:bg-black2/70 disabled:opacity-50'
                >
                  이전
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`rounded-lg px-4 py-2 transition-all duration-300 ${
                      currentPage === page ? 'bg-lostark-400 text-white' : 'bg-black2 text-white/80 hover:bg-black2/70'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='rounded-lg bg-black2 px-4 py-2 text-white/80 transition-all duration-300 hover:enabled:bg-black2/70 disabled:opacity-50'
                >
                  다음
                </button>
              </div>
            </div>
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
                  {[...myBlacklist]
                    // .sort((a, b) => a - b) // 내림차순 정렬 추가
                    .map((blacklistItem, index) => (
                      <MyBlacklistItem
                        key={`blacklistItem-${index}`}
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
    </motion.div>
  );
};

export default BlacklistPage;
