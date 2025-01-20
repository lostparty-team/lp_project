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
}

const BlacklistItem = ({
  blacklistItem,
  currentUser,
  onItemClick,
  onAddClick,
  onDeleteClick,
  isDeleting,
}: BlacklistItemProps) => {
  const isAuthor = currentUser && blacklistItem.author === currentUser;

  return (
    <motion.li
      variants={LIST_ITEM_VARIANTS}
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
      <div className='flex gap-2'>
        {isAuthor && (
          <button
            onClick={(e) => onDeleteClick(blacklistItem, e)}
            className={`rounded-full ${
              isDeleting ? 'cursor-not-allowed bg-gray-500' : 'bg-red-500 hover:bg-red-600'
            } p-2`}
            disabled={isDeleting}
          >
            <Trash2 className='text-white' size={20} />
          </button>
        )}
        <button
          onClick={(e) => onAddClick(blacklistItem, e)}
          className='rounded-full bg-[#4CAF50] p-2 hover:bg-[#358438]'
        >
          <Plus className='text-white' size={20} />
        </button>
      </div>
    </motion.li>
  );
};

export default BlacklistItem;
