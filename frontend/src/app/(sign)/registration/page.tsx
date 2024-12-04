'use client';
import { postSignup } from '@/api/auth';
import axiosInstance from '@/api/axios';
import { RegisterInfo } from '@/types/domain';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, dirtyFields },
    trigger,
    watch,
  } = useForm<RegisterInfo>({
    mode: 'onChange',
  });

  const [idChecked, setIdChecked] = useState(false);
  const idValue = watch('id');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
  const apiValue = watch('api');

  // ID 중복 확인
  const handleCheckId = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = await trigger('id');
    if (!isValid) return;
    try {
      const res = await axiosInstance.post('/api/check-id', { id: idValue });
      if (res.status === 200) {
        setIdChecked(true);
      } else {
        setIdChecked(false);
      }
    } catch (err) {
      console.log('중복 확인 오류:', err);
    }
  };

  const onSubmit: SubmitHandler<RegisterInfo> = (data) => console.log(data);

  useEffect(() => {
    if (idValue) {
      trigger('id');
    }
  }, [idValue, trigger]);

  useEffect(() => {
    if (passwordValue) {
      trigger('password');
    }
  }, [passwordValue, trigger]);

  useEffect(() => {
    if (confirmPasswordValue) {
      trigger('confirmPassword');
    }
  }, [confirmPasswordValue, passwordValue, trigger]);

  useEffect(() => {
    if (apiValue) {
      trigger('api');
    }
  }, [apiValue, trigger]);

  return (
    <main className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1a1a1a]'>
      <div className='pointer-events-none absolute inset-0 bg-[#2a2a2a] opacity-20'></div>
      <div className='bg-gradient-radial pointer-events-none absolute inset-0 from-transparent to-[#1a1a1a]'></div>

      <div className='animate-fadeIn relative w-full max-w-md px-4 py-8'>
        <div className='relative overflow-hidden rounded-lg border-2 border-lostark-400 bg-[#2a2a2a] p-8 shadow-2xl'>
          <div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-lostark-400 via-lostark-200 to-lostark-400'></div>
          <div className='absolute left-0 top-2 h-[1px] w-full bg-gradient-to-r from-transparent via-lostark-400/50 to-transparent'></div>

          <div className='mb-8 text-center'>
            <figure className='mx-auto mb-4 w-80 animate-pulse'>
              <Image src='/lostark_logo.png' width={320} height={320} alt='login' />
            </figure>
            <h1 className='text-2xl font-semibold tracking-wider text-lostark-400'>회원가입</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='min-h-[102px]'>
              <label className='mb-2 block text-lostark-400'>아이디</label>
              <div className='group flex'>
                <input
                  {...register('id', {
                    required: '아이디를 입력해주세요.',
                    minLength: { value: 2, message: '아이디는 최소 두 글자 이상이어야 합니다.' },
                  })}
                  type='text'
                  disabled={idChecked}
                  id='id'
                  placeholder='아이디를 입력하세요'
                  className={`w-full rounded-md rounded-br-none rounded-tr-none border border-lostark-400/30 bg-[#1a1a1a] px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400 ${idChecked && 'text-white/30'}`}
                />
                <button
                  type='button'
                  disabled={!idValue || !!errors.id || idChecked}
                  onClick={handleCheckId}
                  className={`${idValue && !errors.id && !idChecked ? 'text-lostark-300 duration-300' : 'pointer-events-none cursor-not-allowed'} min-w-20 rounded-md rounded-bl-none rounded-tl-none border border-lostark-400/30 bg-[#1a1a1a] text-sm text-white/50 outline-none transition-all duration-200 focus:border-lostark-400 focus:ring-lostark-400 group-hover:border-lostark-400/50`}
                >
                  중복 확인
                </button>
              </div>
              {dirtyFields.id &&
                (errors.id ? (
                  <span role='alert' className='text-sm text-red-400'>
                    {errors.id.message}
                  </span>
                ) : idChecked ? (
                  <span role='alert' className='text-sm text-emerald-500'>
                    사용 가능한 아이디입니다!
                  </span>
                ) : null)}
            </div>

            {/* 비밀번호 필드 */}
            <div className='min-h-[102px]'>
              <label className='mb-2 block text-lostark-400'>비밀번호</label>
              <input
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다.' },
                })}
                type='password'
                placeholder='비밀번호를 입력하세요'
                className='w-full rounded-md border border-lostark-400/30 bg-[#1a1a1a] px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400'
              />
              {dirtyFields.password &&
                (errors.password ? (
                  <span className='text-sm text-red-400'>{errors.password.message}</span>
                ) : (
                  <span className='text-sm text-emerald-500'>올바른 비밀번호 형식입니다.</span>
                ))}
            </div>

            {/* 비밀번호 확인 필드 */}
            <div className='min-h-[102px]'>
              <label className='mb-2 block text-lostark-400'>비밀번호 확인</label>
              <input
                {...register('confirmPassword', {
                  required: '비밀번호 확인을 입력해주세요.',
                  validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다.',
                })}
                type='password'
                placeholder='비밀번호를 재입력하세요'
                className='w-full rounded-md border border-lostark-400/30 bg-[#1a1a1a] px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400'
              />
              {dirtyFields.confirmPassword &&
                (errors.confirmPassword ? (
                  <span className='text-sm text-red-400'>{errors.confirmPassword.message}</span>
                ) : (
                  <span className='text-sm text-emerald-500'>비밀번호가 일치합니다.</span>
                ))}
            </div>

            {/* API 필드 */}
            <div className='min-h-[102px]'>
              <label className='mb-2 block text-lostark-400'>로스트아크 API</label>
              <input
                {...register('api', {
                  required: '발급받은 로스트아크 API를 기입해주세요.',
                })}
                type='text'
                placeholder='로스트아크 API를 입력하세요'
                className='w-full rounded-md border border-lostark-400/30 bg-[#1a1a1a] px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400'
              />
              {dirtyFields.api &&
                (errors.api ? <span className='text-sm text-red-400'>{errors.api.message}</span> : null)}
            </div>

            {/* 제출 */}
            <button
              type='submit'
              disabled={isSubmitting}
              className={`font-medieval w-full transform rounded-md border border-lostark-500 px-4 py-3 text-lostark-400 outline-none transition-all hover:border-lostark-400 ${isSubmitting ? 'text-lostark500' : null}`}
            >
              회원가입
            </button>
          </form>

          {/* 로그인 링크 */}
          <div className='mx-auto mt-6 text-center'>
            <Link
              href='/login'
              className='duration=200 hover:text-lostark=400 text-sm text-lostark-400/70 transition-colors'
            >
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
