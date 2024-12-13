'use client';
import { postSignup } from '@/api/auth';
import { axiosInstance } from '@/api/axios';
import axios from 'axios';
import { RegisterInfo } from '@/types/domain';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRegisterStore } from '@/stores/useRegisterStore';
import { CustomButton, CustomInput } from '@/components/common';
import BackgroundVideo from '@/components/common/BackgroundVideo';

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    trigger,
    watch,
  } = useForm<RegisterInfo>({
    mode: 'onChange',
  });
  const { idChecked, idCheckStatus, isChecking, isSubmitting, setIdChecked, setIdCheckStatus, setIsChecking } =
    useRegisterStore();
  const idValue = watch('id');
  const passwordValue = watch('password');

  useEffect(() => {
    setIdChecked(false);
    // id 중복 확인 통과 시, valid
    if (!errors.id && idValue) {
      setIdCheckStatus('valid');
    } else {
      setIdCheckStatus('initial');
    }
  }, [idValue, errors.id]);

  // ID 중복 확인
  const handleCheckId = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = await trigger('id');
    if (!isValid) return;
    setIsChecking(true);
    try {
      const res = await axiosInstance.post('/api/check-id', { id: idValue });
      if (res.status === 200) {
        setIdChecked(true);
        setIdCheckStatus('checked');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setIdChecked(false);
        setIdCheckStatus('duplicate');
      }
    } finally {
      setIsChecking(false);
    }
  };

  const onSubmit: SubmitHandler<RegisterInfo> = async (data) => {
    if (!idChecked) {
      toast.error('아이디 중복 확인을 완료해주세요.');
      return;
    }
    try {
      const res = await postSignup(data);
      if (res.status === 200) {
        useRegisterStore.getState().reset();
        toast.success('회원가입이 완료되었습니다.');
        router.push('/login');
      }
    } catch (err) {
      toast.error('회원가입 중 오류가 발생했습니다.');
    }
  };

  const getIdSuccessMessage = () => {
    if (!dirtyFields.id || errors.id) return null;
    if (idCheckStatus === 'checked') return '사용 가능한 아이디입니다!';
    if (idCheckStatus === 'valid') return '조건을 만족하는 아이디입니다.';
    return null;
  };

  return (
    <main className='relative flex h-[calc(100dvh-65px)] w-full items-center justify-center overflow-hidden bg-black1'>
      <BackgroundVideo />
      <div className='pointer-events-none absolute inset-0 bg-black2 opacity-20'></div>
      <div className='bg-gradient-radial pointer-events-none absolute inset-0 from-transparent to-black1'></div>

      <div className='animate-fadeIn fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4'>
        <div className='relative overflow-hidden rounded-lg border-2 border-lostark-400 bg-black2 p-8 shadow-2xl'>
          <div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-lostark-400 via-lostark-200 to-lostark-400'></div>
          <div className='absolute left-0 top-2 h-[1px] w-full bg-gradient-to-r from-transparent via-lostark-400/50 to-transparent'></div>

          <div className='mb-8 text-center'>
            <figure className='mx-auto mb-4 w-80 animate-pulse'>
              <Image src='/lostark_logo.png' width={320} height={320} alt='login' />
            </figure>
            <h1 className='text-2xl font-semibold tracking-wider text-lostark-400'>회원가입</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <CustomInput
              label='아이디'
              name='id'
              type='text'
              placeholder='아이디를 입력하세요'
              register={register}
              rules={{
                required: '아이디를 입력해주세요.',
                minLength: { value: 2, message: '아이디는 최소 두 글자 이상이어야 합니다.' },
              }}
              error={errors.id?.message || (idCheckStatus === 'duplicate' ? '중복된 아이디가 존재합니다.' : undefined)}
              disabled={idChecked}
              isDirty={!!dirtyFields.id}
              successMessage={getIdSuccessMessage()}
              rightSide={
                <CustomButton
                  type='button'
                  disabled={!idValue || !!errors.id || idChecked || isChecking}
                  onClick={handleCheckId}
                  variant='secondary'
                  size='sm'
                  className={`${!errors.id && idValue && !idChecked ? 'text-lostark-500' : 'text-white/50'} w-32 rounded-bl-none rounded-tl-none`}
                >
                  {isChecking ? '확인 중...' : '중복 확인'}
                </CustomButton>
              }
            />

            <CustomInput
              label='비밀번호'
              name='password'
              type='password'
              placeholder='비밀번호를 입력하세요'
              register={register}
              rules={{
                required: '비밀번호를 입력해주세요.',
                minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다.' },
              }}
              error={errors.password?.message}
              isDirty={!!dirtyFields.password}
              successMessage={dirtyFields.password && !errors.password ? '올바른 비밀번호 형식입니다.' : null}
            />

            <CustomInput
              label='비밀번호 확인'
              name='confirmPassword'
              type='password'
              placeholder='비밀번호를 재입력하세요'
              register={register}
              rules={{
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다.',
              }}
              error={errors.confirmPassword?.message}
              isDirty={!!dirtyFields.confirmPassword}
              successMessage={dirtyFields.confirmPassword && !errors.confirmPassword ? '비밀번호가 일치합니다.' : null}
            />

            <CustomInput
              label='로스트아크 API'
              name='api'
              placeholder='로스트아크 API를 입력하세요'
              register={register}
              rules={{
                required: '발급받은 로스트아크 API를 기입해주세요.',
              }}
              error={errors.api?.message}
              isDirty={!!dirtyFields.api}
              successMessage={dirtyFields.api && !errors.api ? '' : null}
            />

            <CustomButton type='submit' disabled={isSubmitting} className='w-full'>
              회원가입
            </CustomButton>
          </form>

          <div className='mx-auto mt-6 text-center'>
            <Link
              href='/login'
              className='text-sm text-lostark-400/70 transition-colors duration-200 hover:text-lostark-400'
            >
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
