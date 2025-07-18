'use client';

import './globals.css';
import { RecoilRoot } from 'recoil';
import Navbar from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import ThemeProvider from '@/components/themeprovider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-[100%]">
      <body className="transition-colors duration-300 bg-white dark:bg-gray-950 text-black dark:text-white">
        <RecoilRoot>
          <ThemeProvider />
          <SidebarProvider>
            <Navbar />
            {children}
          </SidebarProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
