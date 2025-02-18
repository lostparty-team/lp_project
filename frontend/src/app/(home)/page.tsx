'use client';
import { ArrowRight, Users, ClipboardCheck, Eye, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useBlacklistStore } from '@/stores/blacklistStore';
import SearchAutocomplete from '@/components/common/SearchAutocomplete';
import { useBlacklist } from '@/hooks/useBlacklist';
import { pageVariants } from '@/constants/animations';
import Image from 'next/image';
import { useStats } from '@/hooks/useStats';
import { useEffect } from 'react';
import { BlacklistUser } from '@/types/blacklist';
import Footer from '@/components/common/Footer';

const MainPage = () => {
  const router = useRouter();
  const { setSearchTerm } = useBlacklistStore();
  const { blacklist } = useBlacklist('popular');
  const { data: statsData, isLoading } = useStats();

  useEffect(() => {
    getStatsData();
  }, []);

  const getStatsData = () => [
    {
      label: '오늘 방문자 수',
      value: statsData?.오늘방문자수.toLocaleString() || '0',
      unit: '명',
      icon: <Eye className='h-6 w-6' />,
    },
    {
      label: '블랙리스트 사용자 수',
      value: statsData?.블랙리스트등록된유저수.toLocaleString() || '0',
      unit: '명',
      icon: <Users className='h-6 w-6' />,
    },
    {
      label: '블랙리스트 게시글 수',
      value: statsData?.블랙리스트명단작성수.toLocaleString() || '0',
      unit: '개',
      icon: <Layers className='h-6 w-6' />,
    },
    {
      label: '오늘 등록된 게시글 수',
      value: statsData?.오늘블랙리스트명단작성수.toLocaleString() || '0',
      unit: '개',
      icon: <ClipboardCheck className='h-6 w-6' />,
    },
  ];

  const overlayGradients = 'from-black1 via-transparent to-black1';

  return (
    <div className='min-h-screen overflow-x-hidden text-gray-100'>
      <motion.div variants={pageVariants} initial='initial' animate='animate' exit='exit'>
        <section className='relative flex h-[80vh] items-center justify-center overflow-hidden'>
          {/* 배경 */}
          <video autoPlay loop muted playsInline className='absolute inset-0 h-full w-full object-cover'>
            <source src='/videos/background.mp4' type='video/mp4' />
          </video>

          {/* 오버레이 */}
          {[...Array(2)].map((_, idx) => (
            <div key={`horizontal-${idx}`} className={`absolute inset-0 bg-gradient-to-r ${overlayGradients}`} />
          ))}
          {[...Array(2)].map((_, idx) => (
            <div key={`vertical-${idx}`} className={`absolute inset-0 bg-gradient-to-t ${overlayGradients}`} />
          ))}

          {/* Hero */}
          <div className='container relative mx-auto px-4 text-center'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mx-auto max-w-3xl'>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-6 text-5xl font-bold text-white md:text-6xl'
              >
                <figure className='flex items-center justify-center'>
                  <Image src='/loa_logo.svg' width={100} height={100} alt='' />
                </figure>
                <span className='bg-gradient-to-r from-white via-lostark-200 to-lostark-600 bg-clip-text text-transparent'>
                  로스트파티
                </span>
              </motion.h1>
              <p className='mb-8 text-xl text-white/80'>믿을 수 있는 파티원을 손쉽게 조회하세요.</p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='relative mx-auto max-w-2xl'
              >
                <SearchAutocomplete
                  suggestions={blacklist}
                  onSearch={(term) => {
                    setSearchTerm(term);
                    router.push('/blacklist');
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 통계 */}
        <section className='container relative z-20 mx-auto -mt-20 px-4'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {getStatsData().map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className='rounded-2xl border border-lostark-400/20 bg-black2/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-lostark-400/50'
              >
                <div className='flex items-center space-x-4'>
                  <div className='rounded-xl bg-lostark-400/10 p-3 text-lostark-400'>{stat.icon}</div>
                  <div>
                    <h3 className='text-3xl font-bold text-lostark-400'>
                      {isLoading ? '로딩중...' : `${stat.value} ${stat.unit}`}
                    </h3>
                    <p className='text-gray-400'>{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 등록된 블랙리스트 */}
        <section className='container mx-auto px-4 py-24'>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className='mb-12'>
            <h2 className='mb-2 text-4xl font-bold text-lostark-400'>최근 등록된 블랙리스트</h2>
            <p className='text-gray-400'>최근에 등록된 블랙리스트 정보입니다</p>
          </motion.div>
          <div className='space-y-4'>
            {blacklist?.slice(0, 3).map((blacklistItem: BlacklistUser) => (
              <motion.div
                key={`blacklist-${blacklistItem.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className='flex cursor-pointer items-center justify-between rounded-lg bg-black2 p-4 transition-all duration-300 hover:bg-black1'
                onClick={() => router.push(`/blacklist/${blacklistItem.id}`)}
              >
                <div className='w-full'>
                  <p className='mb-2 text-lg font-semibold text-lostark-300'>{blacklistItem.title || '이름 없음'}</p>
                  <p className='text-sm text-gray-400'>
                    {blacklistItem.id} | {blacklistItem.author} | 신고 {blacklistItem.id}회
                  </p>
                  <p className='mt-2 line-clamp-1 text-sm text-gray-400'>{blacklistItem.id}</p>
                </div>
                <div className='ml-4 flex items-center gap-2'>
                  <span className='rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-400'>{blacklistItem.id}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='rounded-full bg-lostark-400 p-2 text-white hover:bg-lostark-500'
                    onClick={() => router.push(`/blacklist/${blacklistItem.id}`)}
                  >
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='mt-8 text-center'
          >
            <button
              onClick={() => router.push('/blacklist')}
              className='rounded-lg bg-lostark-400 px-6 py-3 text-white transition-all duration-300 hover:bg-lostark-500'
            >
              전체 블랙리스트 보기
            </button>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
};

export default MainPage;
