'use client';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlacklistItem from './BlacklistItem';
import { useBlacklist } from '@/hooks/useBlacklist';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { Plus, Search } from 'lucide-react';
import { BlacklistUser, SortType } from '@/types/blacklist';
import { useLoadingStore } from '@/stores/loadingStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { CustomButton } from '../common';
import BlacklistCreateModal from './modal/blacklistCreate';
import { toast } from 'react-toastify';
import MyBlacklistItem from './MyBlacklistItem';
import { pageVariants } from '@/constants/animations';
import { deleteBlacklist } from '@/api/blacklist';
import queryClient from '@/api/queryClient';

const BlacklistPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [currentUser] = useState<string>();

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

  // 검색어 감지
  useEffect(() => {
    const urlSearchTerm = searchParams?.get('search');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
      if (searchInputRef.current) {
        searchInputRef.current.value = urlSearchTerm;
      }
    } else {
      setSearchTerm('');
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
      }
    }
  }, [searchParams, setSearchTerm]);

  const { blacklist, myBlacklist, isLoading, addToCartMutation, removeFromCartMutation, totalPages } = useBlacklist(
    sortType,
    currentPage,
    undefined,
    searchTerm,
  );

  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    setCartRef(cartRef);
  }, [setCartRef]);

  // 검색 입력 시 상태 업데이트 및 URL 변경
  const handleBlacklistSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);
      setCurrentPage(1);
    },
    [setSearchTerm, setCurrentPage],
  );

  const handleAddToBlacklist = useCallback(
    async (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
      e.preventDefault();

      const buttonRect = e.currentTarget.getBoundingClientRect();
      const cartRect = cartRef.current?.getBoundingClientRect();

      if (!cartRect) return;

      try {
        await addToCartMutation(blacklistItem.id);

        setFlyingItem({
          id: blacklistItem.id.toString(),
          x: buttonRect.left,
          y: buttonRect.top,
          type: 'add',
        });

        setTimeout(() => {
          setFlyingItem(null);
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
        console.error('블랙리스트 추가 실패:', error);
        toast.error('블랙리스트 추가에 실패했습니다.');
      }
    },
    [addToCartMutation, setFlyingItem],
  );

  const handleRemoveFromBlacklist = useCallback(
    (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        removeFromCartMutation(blacklistItem.postId);
      } catch (error) {
        console.error('블랙리스트 제거 실패:', error);
        toast.error('블랙리스트 제거에 실패했습니다.');
      }
    },
    [removeFromCartMutation],
  );

  const handleDeleteBlacklist = useCallback(
    async (blacklistItem: BlacklistUser, e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDeletingId !== null) return;

      setIsDeletingId(blacklistItem.id);

      const confirmDelete = () => {
        return new Promise<boolean>((resolve) => {
          const postId = toast.warn(
            <div className=''>
              <p className='mb-4'>블랙리스트를 삭제하시겠습니까?</p>
              <div className='flex justify-end gap-2'>
                <button
                  className='rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600'
                  onClick={() => {
                    toast.dismiss(postId);
                    resolve(false);
                  }}
                >
                  취소
                </button>
                <button
                  className='rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600'
                  onClick={() => {
                    toast.dismiss(postId);
                    resolve(true);
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
        });
      };

      try {
        const confirmed = await confirmDelete();
        if (confirmed) {
          await deleteBlacklist(blacklistItem.id);
          await queryClient.invalidateQueries({ queryKey: ['blacklist'] });
          toast.success('블랙리스트가 삭제되었습니다.');
        }
      } catch (error) {
        toast.error('블랙리스트 삭제에 실패했습니다.');
      } finally {
        setIsDeletingId(null);
      }
    },
    [isDeletingId],
  );

  // 모달
  const handleCreateModalOpen = useCallback(() => {
    setIsCreateModalOpen(true);
  }, [setIsCreateModalOpen]);

  // 블랙리스트 항목 클릭
  const handleBlacklistItemClick = useCallback(
    (blacklistItem: BlacklistUser) => {
      setIsModalOpen(true);
      setSelectedBlacklistData(blacklistItem);
      router.push(`/blacklist/${blacklistItem.id}`, { scroll: false });
    },
    [setIsModalOpen, setSelectedBlacklistData, router],
  );

  // 정렬 방식 변경
  const handleSortTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortType(e.target.value as SortType);
    },
    [setSortType],
  );

  // 페이지 변경
  const handlePageChange = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      await queryClient.invalidateQueries({ queryKey: ['blacklist'] });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setCurrentPage],
  );

  const flyingAnimationProps = useMemo(
    () => ({
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
    }),
    [flyingItem],
  );

  // 페이지네이션 버튼
  const paginationButtons = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        aria-label={`${page} 페이지로 이동`}
        aria-current={currentPage === page ? 'page' : undefined}
        className={`rounded-lg px-4 py-2 transition-all duration-300 ${
          currentPage === page ? 'bg-lostark-400 text-white' : 'bg-black2 text-white/80 hover:bg-black2/70'
        }`}
      >
        {page}
      </button>
    ));
  }, [totalPages, currentPage, handlePageChange]);

  return (
    <motion.div
      variants={pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='min-h-screen overflow-x-hidden p-8'
    >
      <div className='relative min-h-screen bg-black1 text-gray-100'>
        <section className='container mx-auto px-4 py-16'>
          <div className='mb-6 flex items-center space-x-4'>
            <select
              aria-label='정렬 방식 선택'
              className='h-[40px] rounded-lg border border-transparent bg-black2 px-4 py-2 text-gray-300 transition-all duration-300 focus:border-lostark-400'
              onChange={handleSortTypeChange}
              value={sortType}
            >
              <option value=''>구분</option>
              <option value='popular'>인기순</option>
              <option value='newest'>최신순</option>
            </select>
            <div className='relative flex-1'>
              <input
                ref={searchInputRef}
                type='text'
                defaultValue={searchTerm}
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
              aria-label='블랙리스트 새로 만들기'
            >
              새로 만들기
            </button>
          </div>

          {/* 블랙리스트 목록 */}
          <div className='grid grid-cols-2 gap-8 lg:grid-cols-3'>
            <div className='col-span-2'>
              {blacklist.length === 0 && !isLoading ? (
                <div className='flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 text-gray-400 shadow-lg'>
                  표시할 블랙리스트가 없습니다.
                </div>
              ) : (
                <ul
                  role='list'
                  aria-label='블랙리스트 목록'
                  className='space-y-4 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
                >
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
              )}

              {/* 페이지네이션 */}
              {totalPages > 0 && (
                <nav aria-label='페이지 탐색' className='mt-8 flex justify-center gap-2'>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label='이전 페이지로 이동'
                    className='rounded-lg bg-black2 px-4 py-2 text-white/80 transition-all duration-300 hover:enabled:bg-black2/70 disabled:opacity-50'
                  >
                    이전
                  </button>

                  {paginationButtons}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label='다음 페이지로 이동'
                    className='rounded-lg bg-black2 px-4 py-2 text-white/80 transition-all duration-300 hover:enabled:bg-black2/70 disabled:opacity-50'
                  >
                    다음
                  </button>
                </nav>
              )}
            </div>

            {/* 내가 담은 블랙리스트 */}
            <div
              ref={cartRef}
              className='sticky top-4 h-[480px] overflow-auto rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'
              aria-label='내가 담은 블랙리스트'
            >
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-lostark-400'>내가 담은 블랙리스트</h2>
                <CustomButton size='sm' onClick={handleCreateModalOpen}>
                  생성하기
                </CustomButton>
              </div>
              <ul className='space-y-2'>
                <AnimatePresence mode='popLayout'>
                  {myBlacklist.length === 0 ? (
                    <li className='py-4 text-center text-gray-400'>담은 블랙리스트가 없습니다.</li>
                  ) : (
                    myBlacklist.map((blacklistItem: BlacklistUser, index: number) => (
                      <MyBlacklistItem
                        key={`blacklistItem-${blacklistItem.id || index}`}
                        blacklistItem={blacklistItem}
                        onItemClick={handleBlacklistItemClick}
                        onRemoveClick={handleRemoveFromBlacklist}
                      />
                    ))
                  )}
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
              aria-hidden='true'
            >
              <Plus className='text-white' size={20} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{isCreateModalOpen && <BlacklistCreateModal />}</AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BlacklistPage;
