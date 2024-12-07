'use client';
import { toast } from 'react-toastify';
import { ClockIcon, InfoIcon, SearchIcon, ShieldIcon } from '@/styles/icons';
import { ArrowRight } from 'lucide-react';

const QUICK_LINK = [
  {
    title: '파티원 정보',
    icon: <ClockIcon size={28} />,
  },
  {
    title: '실시간',
    icon: <InfoIcon size={28} />,
  },
  {
    title: '블랙리스트',
    icon: <ShieldIcon size={28} />,
  },
  {
    title: '여분 버튼',
    icon: <ArrowRight size={28} />,
  },
];

const MainPage = () => {
  const handleButtonClick = () => {
    toast.success('버튼 클릭');
  };

  return (
    <div className='bg-black1 min-h-screen text-gray-100'>
      <section className='container mx-auto px-4 py-16'>
        <h2 className='mb-8 text-3xl font-bold text-lostark-400'>파티원 검색하기</h2>
        <div className='relative mx-auto max-w-2xl'>
          <input
            type='text'
            placeholder='검색어를 입력하세요...'
            className='bg-black2 w-full rounded-lg border-2 border-transparent px-6 py-4 text-white transition-all duration-300 hover:border-lostark-400 focus:border-lostark-400 focus:outline-none'
          />
          <SearchIcon className='absolute right-4 top-1/2 -translate-y-1/2 text-lostark-300' />
        </div>
      </section>
      {/* 바로가기 박스 */}
      <section className='container mx-auto px-4 py-16'>
        <h2 className='mb-12 text-3xl font-bold text-lostark-400'>주요 기능 바로가기</h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {QUICK_LINK.map((item, idx) => (
            <div
              key={idx}
              onClick={handleButtonClick}
              className='to-black1 from-black2 group flex cursor-pointer flex-col items-center rounded-lg border border-lostark-300 bg-gradient-to-br p-8 transition-all duration-300 hover:scale-105'
            >
              <div className='mb-4 text-lostark-300 transition-colors duration-300 group-hover:text-lostark-300'>
                {item.icon}
              </div>
              <h3 className='text-xl font-semibold text-lostark-300 transition-colors duration-300 group-hover:text-lostark-200'>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
      {/* 공지사항, 공격대 박스 */}
      <section className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {['공지사항', '공격대'].map((title) => (
            <div key={title} className='from-black2 to-black1 rounded-lg bg-gradient-to-br p-8 shadow-lg'>
              <h3 className='mb-6 text-2xl font-bold text-lostark-400'>{title}</h3>
              <div className='space-y-4'>
                <div className='group flex items-center justify-between rounded p-4 text-lostark-100 transition-all duration-300'>
                  <span className='transition-colors group-hover:text-lostark-200'>제목제목제목</span>
                  <span className='text-white/50'>2024.12.08 (일)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className='border-black2 border-t py-12'>
        <div className='mx-auto px-4'>
          <div className='mb-8 flex justify-center space-x-12'>
            {['이용약관', '개인정보처리방침', '문의하기', '후원하기'].map((item) => (
              <a key={item} className='relative text-white/50 transition-all duration-300 hover:text-lostark-400'>
                {item}
                <span className='transition-all duration-300'></span>
              </a>
            ))}
          </div>
          <p className='text-center text-white/50'>Copyright © All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
