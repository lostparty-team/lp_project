import localFont from 'next/font/local';
import NavigationBar from '@/components/common/navigationBar';
import ToastProvider from '@/components/common/toastProvider';
import '@/styles/globals.css';
import { MSWProvider } from './msw-provider';
import QueryProvider from '@/providers/QueryProvider';
import LoadingSpinner from '@/components/common/LoadingSpinner';
export const metadata = {
  title: 'LostArkP',
  description: '로스트아크 파티',
};
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>
        <MSWProvider>
          <QueryProvider>
            <ToastProvider />
            <NavigationBar />
            <LoadingSpinner />
            {children}
          </QueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
