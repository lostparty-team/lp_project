import { FOOTER_LINKS } from '@/constants/footer';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t border-lostark-400/10 bg-black1 py-16'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 flex flex-wrap justify-center gap-8'>
          {FOOTER_LINKS.map(({ name, href }) => (
            <Link href={href} key={name} target='blank'>
              <button className='relative text-white/70 transition-all duration-300 hover:text-lostark-400'>
                {name}
              </button>
            </Link>
          ))}
        </div>
        <p className='text-center text-white/50'>© {new Date().getFullYear()} 로스트파티. All rights reserved.</p>
      </div>
    </footer>
  );
}
