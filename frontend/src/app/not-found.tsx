'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className='flex h-[calc(100dvh-65px)] flex-col items-center justify-center gap-4 bg-black1'>
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='text-primary text-8xl font-bold text-red-500/70'
      >
        404
      </motion.h1>
      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='text-2xl text-white/50'
      >
        페이지를 찾을 수 없습니다
      </motion.p>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Link
          href='/'
          className='bg-primary hover:bg-primary/80 mt-4 rounded-lg px-6 py-2 text-sm font-semibold text-white/70 transition-colors hover:text-lostark-400 hover:transition-all'
        >
          홈으로 돌아가기
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
