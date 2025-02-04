import localFont from 'next/font/local';
import NavigationBar from '@/components/common/navigationBar';
import ToastProvider from '@/components/common/toastProvider';
import '@/styles/globals.css';
import { MSWProvider } from './msw-provider';
import QueryProvider from '@/providers/QueryProvider';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { AxiosInterceptor } from '@/api/interceptor';
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
        {/* <MSWProvider> */}
        <QueryProvider>
          {/* <AxiosInterceptor> */}
          <ToastProvider />
          <NavigationBar />
          <LoadingSpinner />
          {children}
          {/* </AxiosInterceptor> */}
        </QueryProvider>
        {/* </MSWProvider> */}
      </body>
    </html>
  );
}
