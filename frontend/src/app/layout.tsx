import localFont from 'next/font/local';
import NavigationBar from '@/components/common/navigationBar';
import ToastProvider from '@/components/common/toastProvider';
import '@/styles/globals.css';
import QueryProvider from '@/providers/QueryProvider';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import AdBanner from '@/components/common/AdBanner';
import Footer from '@/components/common/Footer';
export const metadata = {
  title: '로스트파티',
  description: '로스트파티',
  icons: {
    icon: '/loa_logo.svg',
  },
};
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className='bg-black1'>
      <body className={pretendard.className}>
        <QueryProvider>
          <ToastProvider />
          <aside>
            <AdBanner position='left' />
            <AdBanner position='right' />
          </aside>
          <div className='mx-auto max-w-6xl'>
            <NavigationBar />
            <LoadingSpinner />
            {children}
          </div>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
