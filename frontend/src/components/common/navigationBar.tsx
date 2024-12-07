import { NAV_LINK } from '@/constants/nav';
import Link from 'next/link';

const NavigationBar = () => {
  return (
    <header className='border-black2 bg-black1 relative w-full border-b text-lostark-300'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/' className='group relative text-2xl font-bold'>
          <span className='bg-gradient-to-r from-lostark-400 via-lostark-500 to-lostark-600 bg-clip-text text-3xl text-transparent'>
            LostArkParty
          </span>
        </Link>
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
      </div>
      <div
        className='relative h-72 bg-cover bg-center'
        style={{
          backgroundImage: "url('/bg_loa.jpg')", // 헤더 이미지 URL (임시로 해둠)
        }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-30'></div>
      </div>
    </header>
  );
};

export default NavigationBar;
