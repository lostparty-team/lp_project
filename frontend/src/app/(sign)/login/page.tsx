'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1a1a1a]">
      <div className="pointer-events-none absolute inset-0 bg-[#2a2a2a] opacity-20"></div>
      <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-transparent to-[#1a1a1a]"></div>

      <div className="animate-fadeIn relative w-full max-w-md px-4 py-8">
        <div className="relative overflow-hidden rounded-lg border-2 border-lostark-400 bg-[#2a2a2a] p-8 shadow-2xl">
          <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-lostark-400 via-lostark-300 to-lostark-400"></div>
          <div className="absolute left-0 top-2 h-[1px] w-full bg-gradient-to-r from-transparent via-lostark-400/50 to-transparent"></div>

          <div className="mb-8 text-center">
            <figure className="mx-auto mb-4 w-80 animate-pulse">
              <Image src="/lostark_logo.png" width={320} height={320} alt="login" />
            </figure>
            <h1 className="text-2xl font-semibold tracking-wider text-lostark-400">로그인</h1>
          </div>

          <form className="space-y-6">
            <div>
              <label className="mb-2 block text-lostark-400">아이디</label>
              <input
                type="email"
                placeholder="아이디를 입력하세요"
                className="w-full rounded-md border border-lostark-400/30 bg-[#1a1a1a] px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-lostark-400">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full rounded-md border border-lostark-400/30 bg-[#1a1a1a] px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400"
              />
            </div>

            <button
              type="submit"
              className="w-full transform rounded-md border border-lostark-500 px-4 py-3 text-lostark-400 outline-none transition-all hover:border-lostark-400"
            >
              로그인
            </button>
          </form>

          <div className="gap- flex justify-between py-4 text-center">
            <Link
              href="/registration"
              className="text-sm text-lostark-400/70 transition-colors duration-200 hover:text-lostark-400"
            >
              회원가입
            </Link>
            <Link
              href="/registration"
              className="text-sm text-lostark-400/70 transition-colors duration-200 hover:text-lostark-400"
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
