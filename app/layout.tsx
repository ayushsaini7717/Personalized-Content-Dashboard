'use client';

import './globals.css';
import { RecoilRoot } from 'recoil';
import Navbar from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import ThemeProvider from '@/components/themeprovider';
import useHasMounted from '@/hooks/usehasmount';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasMounted = useHasMounted();

  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen w-full transition-colors duration-300 bg-white dark:bg-gray-950 text-black dark:text-white overflow-x-hidden">
        <RecoilRoot>
          <SessionProvider>
            <SidebarProvider>
              {hasMounted && <ThemeProvider />}
              {hasMounted && <Navbar />}
              <main className="min-h-[calc(100vh-4rem)] px-4">
                {hasMounted ? children : null}
              </main>
            </SidebarProvider>
          </SessionProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
