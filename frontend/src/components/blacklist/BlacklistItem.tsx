import { motion, Variants } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { BlacklistUser } from '@/types/blacklist';

const LIST_ITEM_VARIANTS: Variants = {
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
} as const;

interface BlacklistItemProps {
  blacklistItem: BlacklistUser;
  currentUser?: string;
  onItemClick: (item: BlacklistUser) => void;
  onAddClick: (item: BlacklistUser, e: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (item: BlacklistUser, e: React.MouseEvent<HTMLButtonElement>) => void;
  isDeleting: boolean;
  isMyPost: boolean;
}

const BlacklistItem = ({
  blacklistItem,
  currentUser,
  onItemClick,
  onAddClick,
  onDeleteClick,
  isDeleting,
  isMyPost,
}: BlacklistItemProps) => {
  const handleItemClick = () => {
    onItemClick(blacklistItem);
  };

  return (
    <motion.li
      layout
      key={blacklistItem.id}
      className='flex items-center justify-between rounded-lg bg-black2/80 p-4 shadow-md'
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <button className='flex-1 text-left' onClick={handleItemClick}>
        <div className='mb-1 text-lg font-semibold text-lostark-300'>{blacklistItem.title || '이름 없음'}</div>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-white/70'>작성일: {blacklistItem.created_at?.split('T')[0]}</span>
          <span className='text-sm text-white/70'>조회수: {blacklistItem.views}</span>
          <span className='text-sm text-white/70'>비추천: {blacklistItem.dislikes}</span>
          <span className='text-sm text-white/70'>담은수: {blacklistItem.cart_count}</span>
        </div>
      </button>
      <div className='flex gap-2'>
        {/* 담기 버튼 */}
        <button
          onClick={(e) => onAddClick(blacklistItem, e)}
          className='rounded-full bg-[#4CAF50] p-2 text-white transition-all duration-200 hover:bg-[#358438]'
          aria-label='블랙리스트 담기'
        >
          <Plus size={16} />
        </button>

        {/* 삭제 버튼 */}
        {isMyPost && (
          <button
            onClick={(e) => onDeleteClick(blacklistItem, e)}
            disabled={isDeleting}
            className={`rounded-full bg-red-500 p-2 text-white transition-all duration-200 hover:bg-red-600 ${
              isDeleting ? 'animate-pulse cursor-not-allowed opacity-70' : ''
            }`}
            aria-label='블랙리스트 삭제'
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </motion.li>
  );
};

export default BlacklistItem;
