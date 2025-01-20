import { motion } from 'framer-motion';
import { BlacklistUser } from '@/types/blacklist';
import { Minus } from 'lucide-react';

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
        transition: { duration: 0.2 },
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
        <p className='text-sm text-gray-400'>{blacklistItem.postId}</p>
      </button>
      <button onClick={(e) => onRemoveClick(blacklistItem, e)} className='rounded-full bg-red-500 p-2 hover:bg-red-600'>
        <Minus className='text-white' size={14} />
      </button>
    </motion.li>
  );
};

export default MyBlacklistItem;
