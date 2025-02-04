'use client';
import { logout } from '@/api/auth';
import { COMMON_NAV_LINKS, AUTH_NAV_LINKS } from '@/constants/nav';
import { useAuthStore } from '@/stores/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import ApiInputModal from './ApiInputModal';

const NavLinks = () => {
  const { isLogin, setIsLogin } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const authLink = isLogin ? AUTH_NAV_LINKS.authenticated : AUTH_NAV_LINKS.unauthenticated;

  const handleLogout = async (e: React.MouseEvent) => {
    if (isLogin) {
      e.preventDefault();
      setIsLogin(false);
      logout();
    }
  };

  return (
    <nav>
      <ul className='flex space-x-8'>
        {COMMON_NAV_LINKS.map(({ href, name }) => (
          <li key={href}>
            <Link href={href} className='relative text-lg transition-colors hover:text-lostark-400'>
              {name}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={() => setIsModalOpen(true)}
            className='relative text-lg transition-colors hover:text-lostark-400'
          >
            API 입력
          </button>
        </li>
        {/* <li key={authLink.href}>
          <Link
            href={authLink.href}
            className='relative text-lg transition-colors hover:text-lostark-400'
            onClick={handleLogout}
          >
            {authLink.name}
          </Link>
        </li> */}
      </ul>
      <ApiInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

const MainHeader = () => (
  <div className='container mx-auto flex h-16 items-center justify-between px-4'>
    <Link href='/' className='group relative'>
      <span className='bg-gradient-to-r from-lostark-400 via-lostark-500 to-lostark-600 bg-clip-text text-3xl font-bold text-transparent'>
        {/* LostArkParty */}
        로스트파티
      </span>
    </Link>
    <NavLinks />
  </div>
);

function NavigationBar() {
  return (
    <header className='relative w-full border-b border-black2 bg-black1 text-lostark-300'>
      <MainHeader />
    </header>
  );
}

export default NavigationBar;
