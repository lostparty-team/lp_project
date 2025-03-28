'use client';
import BlacklistPage from '@/components/blacklist/BlacklistPage';
import { Suspense } from 'react';

const page = () => {
  return (
    <div className='overflow-x-hidden'>
      <Suspense>
        <BlacklistPage />
      </Suspense>
    </div>
  );
};

export default page;
