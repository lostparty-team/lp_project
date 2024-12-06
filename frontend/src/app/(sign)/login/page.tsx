'use client';
import { postLogin } from '@/api/auth';
import { LoginInfo } from '@/types/domain';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();

  const onSubmit: SubmitHandler<LoginInfo> = async (data) => {
    setIsLoggingIn(true);
    try {
      const res = await postLogin(data);
      if (res.status === 200) {
        router.push('/');
      } else {
        toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
        setIsLoggingIn(false);
      }
    } catch (err) {
      toast.error('로그인 중 오류가 발생했습니다.');
      setIsLoggingIn(false);
    }
  };

  return (
    <main className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1a1a1a]'>
      <div className='absolute inset-0 bg-[#2a2a2a] opacity-20'></div>
      <div className='bg-gradient-radial absolute inset-0 from-transparent to-[#1a1a1a]'></div>

      <div className='animate-fadeIn relative w-full max-w-md px-4 py-8'>
        <div className='relative overflow-hidden rounded-lg border-2 border-lostark-400 bg-[#2a2a2a] p-8 shadow-2xl'>
          <div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-lostark-400 via-lostark-300 to-lostark-400'></div>
          <div className='absolute left-0 top-2 h-[1px] w-full bg-gradient-to-r from-transparent via-lostark-400/50 to-transparent'></div>

          <div className='mb-8 text-center'>
            <figure className='mx-auto mb-4 w-80 animate-pulse'>
              <Image src='/lostark_logo.png' width={320} height={320} alt='login' />
            </figure>
            <h1 className='text-2xl font-semibold tracking-wider text-lostark-400'>로그인</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='min-h-[102px]'>
              <label className='mb-2 block text-lostark-400'>아이디</label>
              <input
                {...register('id', {
                  required: '아이디를 입력해주세요.',
                })}
                type='text'
                placeholder='아이디를 입력하세요'
                className='w-full rounded-md border border-lostark-400/30 bg-[#1a1a1a] px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400'
              />
              {errors.id && <span className='text-sm text-red-400'>{errors.id.message}</span>}
            </div>

            <div className='min-h-[102px]'>
              <label className='mb-2 block text-lostark-400'>비밀번호</label>
              <input
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
                type='password'
                placeholder='비밀번호를 입력하세요'
                className='w-full rounded-md border border-lostark-400/30 bg-[#1a1a1a] px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400'
              />
              {errors.password && <span className='text-sm text-red-400'>{errors.password.message}</span>}
            </div>

            <button
              type='submit'
              className='w-full transform rounded-md border border-lostark-500 px-4 py-3 text-lostark-400 outline-none transition-all hover:border-lostark-400'
              disabled={isLoggingIn}
            >
              {isLoggingIn ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className='flex justify-between py-4 text-center'>
            <Link
              href='/registration'
              className='text-sm text-lostark-400/70 transition-colors duration-200 hover:text-lostark-400'
            >
              회원가입
            </Link>
            <Link
              href='/registration'
              className='text-sm text-lostark-400/70 transition-colors duration-200 hover:text-lostark-400'
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
