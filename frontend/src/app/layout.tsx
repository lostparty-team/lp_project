import NavigationBar from '@/components/common/navigationBar';
import ToastProvider from '@/components/common/toastProvider';
import '@/styles/globals.css';
import { MSWProvider } from './msw-provider';
export const metadata = {
  title: 'LostArkP',
  description: '로스트아크 파티',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <MSWProvider>
          <ToastProvider />
          <NavigationBar />
          {children}
        </MSWProvider>
      </body>
    </html>
  );
}
