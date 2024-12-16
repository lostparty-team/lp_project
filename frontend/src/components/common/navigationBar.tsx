import { NAV_LINK } from '@/constants/nav';
import Link from 'next/link';

const NavLinks = () => (
  <nav>
    <ul className='flex space-x-8'>
      {NAV_LINK.map(({ href, name }) => (
        <li key={href}>
          <Link href={href} className='relative text-lg transition-colors hover:text-lostark-400'>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const MainHeader = () => (
  <div className='container mx-auto flex h-16 items-center justify-between px-4'>
    <Link href='/' className='group relative'>
      <span className='bg-gradient-to-r from-lostark-400 via-lostark-500 to-lostark-600 bg-clip-text text-3xl font-bold text-transparent'>
        LostArkParty
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
