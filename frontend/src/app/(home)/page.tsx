'use client';
import { ClockIcon } from '@/styles/icons';
import { ArrowRight, Users, Award, ClipboardCheck, Eye, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useBlacklistStore } from '@/stores/blacklistStore';
import SearchAutocomplete from '@/components/common/SearchAutocomplete';
import { useBlacklist } from '@/hooks/useBlacklist';
import { pageVariants } from '@/constants/animations';
import Image from 'next/image';

const STATS_DATA = [
  { label: '가입자 수', value: '15,234', unit: '명', icon: <Users className='h-6 w-6' /> },
  { label: '오늘 방문자 수', value: '391', unit: '명', icon: <Eye className='h-6 w-6' /> },
  { label: '등록된 블랙리스트', value: '1,432', unit: '건', icon: <Layers className='h-6 w-6' /> },
  { label: '오늘 추가된 블랙리스트', value: '234', unit: '건', icon: <ClipboardCheck className='h-6 w-6' /> },
];

const POPULAR_PARTIES = [
  { title: '발탄 하드 파티', level: '1620+', time: '오후 8시' },
  { title: '쿠크세이튼 노말', level: '1580+', time: '오후 9시' },
  { title: '일리아칸 하드', level: '1600+', time: '오후 10시' },
];

const MainPage = () => {
  const router = useRouter();
  const { setSearchTerm } = useBlacklistStore();
  const { blacklist } = useBlacklist('popular');

  const overlayGradients = 'from-black1 via-transparent to-black1';

  return (
    <div className='min-h-screen overflow-x-hidden bg-gradient-to-b from-black1 to-black2 text-gray-100'>
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
          <div className='container relative z-10 mx-auto px-4 text-center'>
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
            {STATS_DATA.map((stat, idx) => (
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
                      {stat.value} {stat.unit}
                    </h3>
                    <p className='text-gray-400'>{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 파티 */}
        <section className='container mx-auto px-4 py-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mb-12'
          >
            <h2 className='mb-2 text-4xl font-bold text-lostark-400'>인기 파티</h2>
            <p className='text-gray-400'>현재 모집중인 인기 있는 파티들입니다</p>
          </motion.div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {POPULAR_PARTIES.map((party, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className='group rounded-2xl border border-lostark-300/20 bg-gradient-to-br from-black2/80 to-black1/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-lostark-300'
              >
                <h3 className='mb-4 text-2xl font-semibold text-lostark-200'>{party.title}</h3>
                <div className='space-y-3 text-sm text-gray-400'>
                  <div className='flex items-center space-x-2'>
                    <Award className='h-4 w-4 text-lostark-400' />
                    <span>아이템 레벨: {party.level}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <ClockIcon className='h-4 w-4 text-lostark-400' />
                    <span>{party.time}</span>
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
            {blacklist?.slice(0, 3).map((blacklistItem, index) => (
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

        {/* Footer */}
        <footer className='border-t border-lostark-400/10 bg-black1 py-16'>
          <div className='container mx-auto px-4'>
            <div className='mb-12 flex flex-wrap justify-center gap-8'>
              {['이용약관', '개인정보처리방침', '문의하기', '후원하기'].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  className='relative text-white/70 transition-all duration-300 hover:text-lostark-400'
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <p className='text-center text-white/50'>© 2024 로스트아크 파티파인더. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default MainPage;
