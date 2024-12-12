'use client';
import { useLoadingStore } from '../../stores/loadingStore';

const LoadingSpinner = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  if (!isLoading) return null;

  return (
    <div className='absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
      <div className='flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-blue-400 text-4xl text-blue-400'>
        <div className='flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-400 text-2xl text-red-400'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
