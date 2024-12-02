import NavigationBar from '@/components/common/navigationBar';
import ToastProvider from '@/components/common/toastProvider';
import '@/styles/globals.css';
export const metadata = {
  title: 'LostArkP',
  description: '로스트아크 파티',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
