'use client';
import { useState } from 'react';
import { PiHeartFill } from 'react-icons/pi';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div
      onClick={handleToggle}
      onChange={handleToggle}
      className='relative flex cursor-pointer items-center justify-center rounded-md border border-black2 bg-black2 p-2.5 shadow-sm transition-all hover:bg-black2/70'
    >
      <label className='flex cursor-pointer items-center' htmlFor=''>
        <button id='like-toggle' />
        <PiHeartFill
          color='red'
          fill='#ef4444'
          size={28}
          className={`icon h-5 w-5 ${liked ? 'animate-jump-in fill-red-500' : 'animate-fade fill-slate-400 dark:fill-slate-300'}`}
        />
        <span className='ml-2 text-sm font-medium text-white/70'>추천</span>
      </label>
    </div>
  );
};

export default LikeButton;
