'use client';
import { useLoadingStore } from '../../stores/loadingStore';

const LoadingSpinner = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  if (!isLoading) return null;

  return (
    <div className='absolute left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2'>
      <div className='flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-lostark-500 text-4xl text-lostark-500'>
        <div className='flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-lostark-300 text-2xl text-lostark-300'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
