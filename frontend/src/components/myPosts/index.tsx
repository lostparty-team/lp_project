'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getMe, deleteBlacklist } from '@/api/blacklist';
import { BlacklistUser } from '@/types/blacklist';
import { pageVariants } from '@/constants/animations';
import { useRouter } from 'next/navigation';
import { useBlacklistStore } from '@/stores/blacklistStore';
import { toast } from 'react-toastify';
import { useLoadingStore } from '@/stores/loadingStore';
import { Trash2, Edit2 } from 'lucide-react';
import ConfirmModal from '../common/ConfirmModal';
import queryClient from '@/api/queryClient';
import CustomCheckbox from '../common/ui/CustomCheckbox';
import BlacklistModal from '../blacklist/modal/blacklistModal';
import BlacklistEditModal from '../blacklist/modal/blacklistEdit';

interface MyBlacklistItem {
  id: number;
  title: string;
  author: string;
  views: number;
  created_at: string;
  cart_count: number;
  dislikes: number;
}

export default function MyPosts() {
  const [myPosts, setMyPosts] = useState<MyBlacklistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsLoading: setGlobalLoading } = useLoadingStore();
  const { setIsModalOpen, setSelectedBlacklistData, setIsEditModalOpen } = useBlacklistStore();

  // 체크박스 관련 상태
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchMyPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setGlobalLoading(true);
      const response = await getMe('latest', currentPage);
      setMyPosts(response.data || []);
      setTotalPages(response.totalPages || 1);
      setCurrentPage(response.currentPage || 1);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
      setGlobalLoading(false);
    }
  }, [setGlobalLoading, currentPage]);

  useEffect(() => {
    fetchMyPosts();

    // 블랙리스트 모달 초기화
    setIsModalOpen(false);
    setSelectedBlacklistData(null);
    setIsEditModalOpen(false);
  }, [fetchMyPosts, setIsModalOpen, setSelectedBlacklistData, setIsEditModalOpen]);

  const handleItemClick = (post: MyBlacklistItem) => {
    const blacklistItem: BlacklistUser = {
      id: post.id,
      title: post.title,
      views: post.views,
      dislikes: post.dislikes,
      created_at: post.created_at,
      cart_count: post.cart_count,
      author: post.author,
    };

    setIsModalOpen(true);
    setSelectedBlacklistData(blacklistItem);
  };

  // 수정
  const handleEditClick = (e: React.MouseEvent, post: MyBlacklistItem) => {
    e.stopPropagation();

    const blacklistItem: BlacklistUser = {
      id: post.id,
      title: post.title,
      views: post.views,
      dislikes: post.dislikes,
      created_at: post.created_at,
      cart_count: post.cart_count,
      author: post.author,
    };

    setSelectedBlacklistData(blacklistItem);
    setIsEditModalOpen(true);
  };

  // 페이지네이션
  const handlePageChange = useCallback(
    async (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      await queryClient.invalidateQueries({ queryKey: ['blacklist-myPosts'] });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setCurrentPage, totalPages],
  );

  // 체크박스 선택 처리
  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (selectedItems.length === myPosts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(myPosts.map((post) => post.id));
    }
  };

  // 선택된 항목 삭제 확인 모달 열기
  const handleOpenDeleteModal = () => {
    if (selectedItems.length === 0) {
      toast.warn('삭제할 항목을 선택해주세요.');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  // 선택된 항목 삭제 실행
  const handleDeleteSelected = async () => {
    try {
      setIsLoading(true);
      setGlobalLoading(true);

      // 선택된 모든 항목에 대해 삭제 요청
      const deletePromises = selectedItems.map((id) => deleteBlacklist(id));
      await Promise.all(deletePromises);

      // 데이터 다시 불러오기
      await queryClient.invalidateQueries({ queryKey: ['blacklist'] });
      await fetchMyPosts();

      // 선택 항목 초기화
      setSelectedItems([]);
      toast.success(`${selectedItems.length}개의 블랙리스트가 삭제되었습니다.`);
    } catch (error) {
      console.error('블랙리스트 삭제 실패:', error);
      toast.error('블랙리스트 삭제에 실패했습니다.');
    } finally {
      setIsDeleteModalOpen(false);
      setIsLoading(false);
      setGlobalLoading(false);
    }
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
        <section className='container mx-auto px-4 py-16'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-lostark-300'>내가 작성한 블랙리스트</h1>

            {/* 삭제 버튼 */}
            {myPosts.length > 0 && (
              <button
                onClick={handleOpenDeleteModal}
                disabled={selectedItems.length === 0}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
                  selectedItems.length > 0
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'cursor-not-allowed bg-gray-700 text-gray-400'
                }`}
              >
                <Trash2 size={18} />
                <span>선택 삭제 ({selectedItems.length})</span>
              </button>
            )}
          </div>

          {isLoading ? (
            <div className='flex h-40 items-center justify-center'>
              <p className='text-gray-400'>로딩 중...</p>
            </div>
          ) : myPosts.length === 0 ? (
            <div className='flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 text-gray-400 shadow-lg'>
              작성한 블랙리스트가 없습니다.
            </div>
          ) : (
            <>
              {/* 체크박스 전체 선택 컨트롤 */}
              <div className='mb-4 flex items-center rounded-lg bg-black2 p-3'>
                <CustomCheckbox
                  checked={selectedItems.length === myPosts.length && myPosts.length > 0}
                  onChange={handleSelectAll}
                  label={`전체 선택 (${selectedItems.length}/${myPosts.length})`}
                />
              </div>

              {/* 블랙리스트 목록 */}
              <ul className='space-y-4 rounded-lg bg-gradient-to-br from-black2 to-black1 p-6 shadow-lg'>
                {myPosts.map((post) => (
                  <li
                    key={post.id}
                    className='relative cursor-pointer rounded-lg border border-white/5 bg-black2/50 p-4 transition-all duration-300 hover:border-lostark-400/30 hover:bg-black2/70'
                  >
                    {/* 체크박스 */}
                    <div className='absolute left-4 top-1/2 -translate-y-1/2' onClick={(e) => e.stopPropagation()}>
                      <CustomCheckbox
                        checked={selectedItems.includes(post.id)}
                        onChange={() => handleCheckboxChange(post.id)}
                      />
                    </div>

                    {/* 컨텐츠 */}
                    <div className='flex flex-col gap-2 pl-8' onClick={() => handleItemClick(post)}>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-lg font-semibold text-lostark-300'>{post.title}</h3>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={(e) => handleEditClick(e, post)}
                            className='flex items-center gap-1 rounded-lg bg-lostark-400/20 px-3 py-1 text-xs font-medium text-lostark-300 transition hover:bg-lostark-400/30'
                          >
                            <Edit2 size={14} />
                            수정
                          </button>
                          <span className='text-sm text-gray-400'>
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs text-gray-400'>조회수: {post.views}</span>
                        <span className='text-xs text-gray-400'>비추천: {post.dislikes}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <nav aria-label='페이지 탐색' className='mt-8 flex justify-center gap-2'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label='이전 페이지로 이동'
                className='rounded-lg bg-black2 px-4 py-2 text-white/80 transition-all duration-300 hover:enabled:bg-black2/70 disabled:opacity-50'
              >
                이전
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}

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
        </section>

        {/* 삭제 확인 모달 */}
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteSelected}
          title='블랙리스트 삭제'
          message={`선택한 ${selectedItems.length}개의 블랙리스트를 삭제하시겠습니까?`}
          confirmText='삭제'
          cancelText='취소'
          danger
        />

        <BlacklistModal fromMyPage={true} />
        <BlacklistEditModal />
      </div>
    </motion.div>
  );
}
